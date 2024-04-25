"use client"
import React, { useState } from "react";
import Header from "../components/layout/Header";
import './page.css';

export default function HostProject() {
    const [projectTitle, setProjectTitle] = useState("");
    const [description, setDescription] = useState("");
    const [projectCategory, setProjectCategory] = useState("");
    const [projectDomain, setProjectDomain] = useState("");
    const [teamDetails, setTeamDetails] = useState([{ label: "", skills: "" }]);

    const handleAddRow = () => {
        setTeamDetails([...teamDetails, { label: "", skills: "" }]);
    };

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newDetails = [...teamDetails];
        newDetails[index][name] = value;
        setTeamDetails(newDetails);
    };

    const handleRemoveRow = (index) => {
        const newDetails = [...teamDetails];
        newDetails.splice(index, 1);
        setTeamDetails(newDetails);
    };

    const handleHostProject = async () => {
        try {
            // Construct the request body
            const requestBody = {
                projectName: projectTitle,
                description: description,
                category: projectCategory,
                projectDomain: projectDomain,
                teamDetails: teamDetails
            };

            // Send the data to the given API endpoint
            const response = await fetch('/api/projects/createProject', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            // Check if the request was successful
            if (!response.ok) {
                throw new Error("Failed to host project");
            }

            // Handle the response
            const responseData = await response.json();
            console.log("Project hosted successfully:", responseData);
            // You can perform further actions based on the response if needed
        } catch (error) {
            console.error("Error hosting project:", error);
            // Handle error appropriately, e.g., show an error message to the user
        }
    };
    return (
        <div className="hostProjectMasterContainer">

            <div className="HeaderContainer">
                <Header />
            </div>

            <div className="HostProjectContentContainer">
                <div className="navBar">
                    Bar
                </div>
                <div className="hostProjectContainer">
                    <div className="hostProjectTitleBoxDiv" style={{ "fontSize": "35px" }}>
                        Host project
                    </div>

                    <div className="hostProjectDetailsBoxDiv">
                        <div className="masterLabel">
                            General details
                        </div>

                        <div className="inputBoxDiv">
                            <div className="label">
                                Title of the project
                                <input
                                    type="text"
                                    style={{ "borderRadius": "5px", "width": "50%", "height": "20px", "border": "solid 1px" }}
                                    value={projectTitle}
                                    onChange={(e) => setProjectTitle(e.target.value)}
                                />
                            </div>

                            <div className="label">
                                Description
                                <input
                                    type="text"
                                    style={{ "borderRadius": "5px", "width": "100%", "height": "200px", "border": "solid 1px" }}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="masterLabel">
                            Project specifications
                        </div>

                        <div className="inputBoxDiv">
                            <div className="projectCatProjectDom">
                                <div className="label2">
                                    Project category
                                    <input
                                        type="text"
                                        style={{ "borderRadius": "5px", "width": "200px", "height": "20px", "border": "solid 1px", "marginTop": "5px" }}
                                        value={projectCategory}
                                        onChange={(e) => setProjectCategory(e.target.value)}
                                    />
                                </div>

                                <div className="label2">
                                    Project domain
                                    <input
                                        type="text"
                                        style={{ "borderRadius": "5px", "width": "250px", "height": "20px", "border": "solid 1px", "marginTop": "5px" }}
                                        value={projectDomain}
                                        onChange={(e) => setProjectDomain(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="masterLabel">
                            Team requirements
                        </div>

                        <div className="inputBoxDiv">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Label</th>
                                        <th>Skills</th>
                                        <th>Action</th> {/* Add Action column */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {teamDetails.map((detail, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="label"
                                                    value={detail.label}
                                                    onChange={(event) => handleInputChange(index, event)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="skills"
                                                    value={detail.skills}
                                                    onChange={(event) => handleInputChange(index, event)}
                                                />
                                            </td>
                                            <td>
                                                <button style={{ "background": "red" }} onClick={() => handleRemoveRow(index)}>Delete</button> {/* Add delete button */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div style={{ "display": "flex", "justifyContent": "center" }}>
                                <button style={{ "width": "20%" }} onClick={handleAddRow}>Add</button>
                            </div>

                        </div>
                        <div style={{ "display": "flex", "justifyContent": "center" }}>
                            <button style={{ "width": "10%", "height": "120%" }} onClick={handleHostProject}>Host project</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
