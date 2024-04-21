// getProject.js
import { connectDB } from '../../../dbConfig/db.js';
import { NextResponse } from "next/server";
import { OngoingProject, CompletedProject } from '../../../models/projectSchema.js'; // Import models correctly

await connectDB();

export async function GET(req, res) {
    try {
        const searchParams = new URLSearchParams(req.url.split('?')[1]); 
        const projectID = searchParams.get('projectID'); 
        const status = searchParams.get('status'); 

        let projectsData;

        console.log("Getting projects...");
        if (status == 0) {
            projectsData = await OngoingProject.findOne({ projectID: projectID});
        } else {
            projectsData = await CompletedProject.findOne({ projectID: projectID});
        }
        
        console.log("Sending data",projectsData);
        return NextResponse.json({ success: true, projectsData }, { status: 200 });

    } catch (err) {
        console.error('Error:', err);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
