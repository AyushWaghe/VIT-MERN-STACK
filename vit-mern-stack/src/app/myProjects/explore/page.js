// pages/explore.js
"use client"
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation'
import Header from "../../components/layout/Header.js";
import ShowProject from "../../components/showProject/page.js";
import Table4 from "../../components/table4/page.js";
import Table2 from "../../components/table2/page.js";
import './explore.css';

const Explore = () => {
    const router = useRouter();

    const [projectsData, setProjectsData] = useState([]);
    const [applyFor, setApplyFor] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const applierID="65fa7c74728a43221876482f";
    const searchParams = useSearchParams();
    const projectId = searchParams.get('projectId');
    const status = searchParams.get('status');
    const teammates = searchParams.get('teammates');

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/getProjectDetail?projectID=${projectId}&status=${status}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setProjectsData(data.projectsData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleApplyButtonClick = async () => {
        console.log("button clicked");
        try {
            const response = await fetch('/api/saveApplication', {
                method: 'POST',
                body: JSON.stringify({ applyFor, coverLetter, applierID, projectId}),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
    
            const data = await response.json();
    
            if (data.success) {
                console.log('Application saved successfully:', data.message);
                // Show a success message to the user
            } else {
                console.error('Failed to save application:', data.message);
                // Show an error message to the user
            }
        } catch (error) {
            console.error('Error saving application:', error.message);
            // Show an error message to the user
        }
    }
    
    useEffect(() => {
        fetchData();
    }, []);

    console.log("TeammateID",projectsData.teammates);

    return (
        <div className="ExploreMasterContainer">
            <div className="HeaderContainer">
                <Header />
            </div>

            <div className="ExploreContentContainer">
                <div className="navBar">
                    Bar
                </div>

                <div className="ShowInfoContainer">
                    <div className="PageHeader">Project Details</div>
                    <ShowProject
                        projectTitle={projectsData.projectName}
                        projectID={projectsData.projectID}
                        Category={projectsData.categoryName}
                        Domain={projectsData.domainName}
                        Description={"THIS is the description"}
                    />

                    {teammates === "1" ? (
                        <div className="TeamDetails">
                            <Table4
                                tableTitle={"Team Details"}
                                header1={"Reg number"}
                                header2={"Name"}
                                header3={"Role"}
                                data={projectsData.teammates}
                                id1={"teammateID"}
                                id2={"name"}
                                id3={"role"}
                            />
                        </div>
                    ) : (
                        <div className="RequirementDetails">
                            <Table2
                                data={projectsData.requirements}
                                header1={"Role"}
                                header2={"Description"}
                                id1={"labeltag"}
                                id2={"labeldescription"}
                            />

                            <div className="ApplyDiv">
                                <div className="ApplyDivHeader">Apply for project</div>

                                <div className="InputDiv">
                                    <div style={{ "fontSize": "3vh", "display": "flex", "flexDirection": "row", "columnGap": "1%", "marginTop": "1%" }}>
                                        Apply for
                                        <input
                                            type="text"
                                            style={{ "borderRadius": "5px", "width": "20%", "height": "20px", "border": "solid 1px" }}
                                            value={applyFor}
                                            onChange={(e) => setApplyFor(e.target.value)}
                                        />
                                    </div>

                                    <div style={{ "display": "flex", "flexDirection": "column", "rowGap": "3%" }}>
                                        Cover letter
                                        <input
                                            type="text"
                                            style={{ "borderRadius": "5px", "width": "90%", "height": "20vh", "border": "solid 1px" }}
                                            value={coverLetter}
                                            onChange={(e) => setCoverLetter(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button style={{ "margin": "1%", "width": "20vh" }} onClick={handleApplyButtonClick}>Apply</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Explore;
