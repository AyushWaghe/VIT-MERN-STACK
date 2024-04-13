"use client"
import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import { useSearchParams } from 'next/navigation'
import "./exploreApplication.css";
import Table2 from "../components/table2/page";
import Table4 from "../components/table4/page";

export default function explorApplication() {

    const searchParams = useSearchParams();
    const projectId = searchParams.get('projectId');
    const applicationIDs = searchParams.get('applicationIDs');
    const roles = searchParams.get('roles');
    const rolesArray = roles.split(',');
    const applicationIDsArray = applicationIDs.split(',');
    const [projectsData, setProjectsData] = useState([]);
    const [applicantsNames, setApplicantsNames] = useState([]);
    const [tableData, setTableData] = useState([{}]);
    // const tableData={};

    const fetchNames = async () => {
        try {
            const response = await fetch('/api/fetchNames', {
                method: 'POST',
                body: JSON.stringify({ applicationIDs: applicationIDsArray }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            console.log(data);
            setApplicantsNames(data.userNames);
            // Handle the fetched data as needed
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const fetchProjectDetails = async () => {
        try {
            const response = await fetch(`/api/getProjectDetail?projectID=${projectId}&status=0`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setProjectsData(data.projectsData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchProjectDetails();
        fetchNames();
    }, []);

    console.log('Fetched names:', applicantsNames);

    
    const combinedArray = applicantsNames.map((name, index) => {
        return {
            Name: name,
            Roles: rolesArray[index]
        };
    });
    
    console.log(combinedArray);
    


    return (
        <div className="exploreApplicationMasterContainer">
            <div className="HeaderContainer">
                <Header />
            </div>

            <div className="exploreApplicationContentContainer">
                <div className="navBar">
                    Bar
                </div>

                <div className="ContentContainer">
                    <div className="DivHeader">
                        Project Details
                    </div>
                    <div className="ProjectFields">
                        <div className="Field">
                            <div>
                                Project Category-:
                            </div>

                            <div className="input">
                                {projectsData.domainName}
                            </div>
                        </div>
                        <div className="Field">
                            <div>
                                Project Category-:
                            </div>

                            <div className="input">
                                {projectsData.categoryName}
                            </div>
                        </div>
                    </div>
                    <div style={{ "textAlign": "center" }}>
                        <h2>Current Team</h2>
                        <Table2
                            header1={"Name"}
                            header2={"Role"}
                            id1={"name"}
                            id2={"role"}
                            data={projectsData.teammates}
                        />
                    </div>

                    <div style={{ "textAlign": "center" }}>
                        <h2>Applications</h2>
                        <Table4
                            header1={"Name"}
                            header2={"Role"}
                            header3={""}
                            id1={"Name"}
                            id2={"Roles"}
                            id3={""}
                            data={combinedArray}
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}