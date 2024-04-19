import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import Table4 from "../../components/table4/page.js";
import "./myApplication.css";

export default function MyApplications() {
    const [projectNames, setProjectNames] = useState([]);
    const [applications, setApplications] = useState([]);
    const [combinedData, setCombinedData] = useState([]);

    const applierID = "65fa7c74728a432218764830";

    // Function to fetch project names based on project IDs
    const fetchProjectNames = async (projectIDs) => {
        // Perform API request to fetch project names based on project IDs
        try {
            const response = await fetch('/api/getProjectNameType', {
                method: 'POST',
                body: JSON.stringify({ projectIDs }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch project names');
            }

            const projectNamesData = await response.json();
            setProjectNames(projectNamesData);
        } catch (error) {
            console.error('Error fetching project names:', error.message);
        }
    };

    // Function to fetch applications based on some criteria
    const fetchApplications = async () => {
        // Perform API request to fetch applications
        console.log('Fetching applications');
        try {
            const response = await fetch('/api/applications/my', {
                method: 'POST',
                body: JSON.stringify({ applierID: applierID }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch applications');
            }

            const applicationsData = await response.json();
            setApplications(applicationsData.data);

            // Extract project IDs from applicationsData
            const projectIDs = applicationsData.data.map(({ projectID }) => projectID);

            // Fetch project names for the extracted projectIDs
            await fetchProjectNames(projectIDs);
        } catch (error) {
            console.error('Error fetching applications:', error.message);
        }
    };

    useEffect(() => {
        // Fetch initial data when component mounts
        fetchApplications();
    }, []);

    useEffect(() => {
        if (applications.length > 0 && projectNames.data && projectNames.data.length > 0) {
            for (let i = 0; i < applications.length; i++) {
                applications[i].number= applications[i].applications.length;
                applications[i].projectName = projectNames.data[i].projectName;
               
            }
        }
    }, [applications, projectNames]);


    console.log(applications);

    return (
        <div className="myApplicationsMasterContainer">
            <div className="HeaderContainer">
                <Header />
            </div>

            <div className="myApplicationsContentContainer">
                <div className="navBar">
                    Bar
                </div>

                <div className="TableContainer">
                    <div className="TableHeader">
                        My Applications
                    </div>

                    <div className="ApplicationsTable">
                        <Table4
                        tableTitle={"My Applications"}
                        header1={"Project ID"}
                        header2={"Project Name"}
                        header3={"Status"}
                        data={applications}
                        id1={"projectID"}
                        id2={"projectName"}
                        //id3={"number"}
                    />
                    </div>
                </div>

            </div>

        </div>
    )
}
