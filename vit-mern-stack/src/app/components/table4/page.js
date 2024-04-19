import { useRouter } from 'next/navigation';
import React from 'react';
import "./table4.css";

const Table4 = ({ tableTitle, header1, header2, header3, data, id1, id2, id3 }) => {
    const router = useRouter();

    const handleExploreClick = (projectId) => {
        if (tableTitle === "Applications") {
            const applicationIDs = [];
            const roles = [];
            const index = data.findIndex(it => it.projectID === projectId);

            for (let i = 0; i < data[index].number; i++) {
                applicationIDs.push(data[index].applications[i].applierID);
                roles.push(data[index].applications[i].role);
            }

            router.push(`/exploreApplication?projectId=${projectId}&applicationIDs=${applicationIDs}&roles=${roles}`);
        }
    }

    return (
        <main>
            <div className="table-container">
                <table className="project-table">
                    <caption><h1>{tableTitle}</h1></caption>
                    <thead>
                        <tr>
                            <th>{header1}</th>
                            <th>{header2}</th>
                            <th>{header3}</th>
                            {tableTitle !== "My Applications" && <th></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 ? data.map((d, index) => (
                            <tr key={index}>
                                <td>{d[id1]}</td>
                                <td>{d[id2]}</td>
                                {tableTitle === "My Applications" ? (
                                    <td>Pending</td> // Displaying "Pending" for "My Applications"
                                ) : (
                                    <td><button onClick={() => handleExploreClick(d.projectID)}>Explore</button></td>
                                )}
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={tableTitle === "My Applications" ? "4" : "5"}>No data to display</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    );
}

export default Table4;
