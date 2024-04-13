import { connectDB } from "../../../../dbConfig/db";
import { NextResponse } from "next/server";
import Application from "../../../../models/applicationSchema.js";

await connectDB();

export async function POST(request) {
    console.log("Application route hit");

    try {
        const reqBody = await request.json();
        const { creatorID } = reqBody;
        console.log(creatorID);

        // Find all applications with the given creatorID
        const applications = await Application.find({ creatorID });

        // Group applications by projectID
        const groupedApplications = {};
        applications.forEach((app) => {
            if (!groupedApplications[app.projectID]) {  //This lines checks if the projectID is there in the gourped array or not 
                groupedApplications[app.projectID] = [];
            }
            groupedApplications[app.projectID].push({
                applierID: app.applierID,
                role: app.role,
                coverLetter: app.coverLetter,
            });
        });

        console.log(groupedApplications);

        // Format the data as to be sent to the front end
        const formattedData = [];
        for (const projectID in groupedApplications) {
            formattedData.push({
                projectID,
                applications: groupedApplications[projectID],
            });
        }

        return NextResponse.json({ success: true, data: formattedData }, { status: 200 });
    } catch (error) {
        console.error("Error fetching applications:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch applications" }, { status: 500 });
    }
}
