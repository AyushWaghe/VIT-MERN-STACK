import { connectDB } from '../../../dbConfig/db.js';
import { NextResponse } from "next/server";
import Application from "../../../models/applicationSchema.js"; // Import the Application model
import { OngoingProject } from '../../../models/projectSchema.js';
await connectDB(); // Connect to the database

export async function POST(request) {
    console.log("Route hit");

    try {
        const reqBody = await request.json();
        const { applyFor, coverLetter, applierID, projectId} = reqBody; // Fix request object reference

        const project=await OngoingProject.findOne({projectID:projectId});
        console.log("Project", project);
        const creatorID=project.creatorID;
        console.log("Creator", creatorID);
        // Create a new application instance using the Application model
        const newApplication = new Application({
            projectID: projectId,
            applierID: applierID,
            creatorID: creatorID,
            role: applyFor, 
            coverLetter: coverLetter,
        });

       
        const savedApplication = await newApplication.save();

        console.log("Application saved:", savedApplication);
        return NextResponse.json({ success: true, message: "Application saved successfully" });
    } catch (error) {
        console.error(error); // Log error for debugging
        return NextResponse.error(new Error('Internal Server Error')); // Return error response
    }
}
