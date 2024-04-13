"use client"
import React, { useEffect, useState } from "react";
import Table5 from "../../components/table5/page";
import './onGoingProjects.css';

const OnGoingProjects = () => {
    const [projectsData, setProjectsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userID = "65fa7c74728a43221876482f"; // Replace 'yourUserID' with the actual user ID
                const status = 0; // Change the status value as needed (0 or 1)

                const response = await fetch(`/api/myprojects/completed?userID=${userID}&status=${status}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProjectsData(data.projectsData);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    console.log(projectsData);

    return (
        <div>
            <h1>Completed Projects</h1>
            <Table5 
            key={projectsData.projectID}
            tableTitle={"On Going Projects"}
            header1={"Project Title"}
            header2={"project ID"}
            header3={"Category"}
            header4={"Department"}
            data={projectsData}
            id1={"projectName"}
            id2={"projectID"}
            id3={"categoryName"}
            id4={"domainName"}
            />
        </div>
    );
};

export default OnGoingProjects;
