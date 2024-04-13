// getProject.js
import { connectDB } from '../../../../dbConfig/db.js';
import { NextResponse } from "next/server";
import { OngoingProject, CompletedProject } from '../../../../models/projectSchema.js'; // Import models correctly
import UserProfile from '../../../../models/userProfileSchema.js';

await connectDB();

export async function GET(req, res) {
    try {
        const searchParams = new URLSearchParams(req.url.split('?')[1]); // Extract searchParams from req.url
        const userID = searchParams.get('userID'); // Extract userID from searchParams
        const status = searchParams.get('status'); // Extract status from searchParams

        console.log(userID, status);
        let projectIDs = [];

        const currentUser = await UserProfile.findOne({ userID: userID });

        if (!currentUser) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        let projectsData;

        if (status == 0) {
            projectIDs = currentUser.ongoingProjects;
            projectsData = await OngoingProject.find({ projectID:  { $in: projectIDs }  });
        } else {
            projectIDs = currentUser.completedProjects;
            projectsData = await CompletedProject.find({ projectID: { $in: projectIDs } });
        }
        
        return NextResponse.json({ success: true, projectsData }, { status: 200 });

    } catch (err) {
        console.error('Error:', err);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
