import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import "./table4.css";

const Table4 = ({ tableTitle, header1, header2, header3, data, id1, id2, id3}) => {
    const router = useRouter();
    const handleExploreClick = (projectId) => {
        // if (tableTitle === "On Going Projects") {
        //     // Navigating to explore page with project ID as query parameter
        //     router.push(`/myProjects/explore?projectId=${projectId}&status=0`);
        // }
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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 ? (
                            data.map((d, index) => (
                                <tr key={index}>
                                    <td>{d[id1]}</td>
                                    <td>{d[id2]}</td>
                                    <td>{d[id3]}</td>
                                    {/* Use the Link component inside the button */}
                                    <td><button onClick={() => handleExploreClick(d.projectID)}>Explore</button></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No Table5 projects to display</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    );
}

export default Table4;
