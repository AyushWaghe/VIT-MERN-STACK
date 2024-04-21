"use client"
import React, { useEffect, useState } from "react";
import Table5 from "../../components/table5/page";
import './CompletedProjects.css';
import { useSelector } from "react-redux";

const CompletedProject = () => {
    const [projectsData, setProjectsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = useSelector((state) => state.user);
    const userid = user.user.userName;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userID = userid; // Replace 'yourUserID' with the actual user ID
                const status = 1; // Change the status value as needed (0 or 1)

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
            tableTitle={"Complted Projects"}
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

export default CompletedProject;
