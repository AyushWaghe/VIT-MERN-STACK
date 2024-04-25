import { NextResponse } from "next/server";
import { connectDB } from '../../../../dbConfig/db.js';
import { OngoingProject } from '../../../../models/projectSchema.js';

await connectDB();

async function generateRandomID() {
    const timestamp = new Date().getTime().toString();
    const randomComponent = Math.floor(Math.random() * 90000) + 10000;
    const uniqueRandomNumber = parseInt(timestamp.slice(-5) + randomComponent.toString().slice(-2));
    return uniqueRandomNumber;
}

export { generateRandomID };

export async function POST(request, response) {
    console.log("Request received to create project.");
    const reqBody = await request.json();
    const { projectName, description, category, projectDomain, requirements, userID } = reqBody; // Changed requirments to requirements and added userID
    try {
        // Check if the project name already exists for the given user ID
        const existingProject = await OngoingProject.findOne({ projectName: projectName, creatorID: userID });
        if (existingProject) {
            return NextResponse.json({ message: 'Project name already exists for this user' });
        }

        // Generate random ID
        const randomID = await generateRandomID();
        console.log(`Generated Random ID: ${randomID}`);
        const projectID = randomID;
        const completedStatus = 0;
        const teammates = null;
        const projectData = {
            projectID: projectID,
            projectName: projectName,
            description: description,
            category: category,
            projectDomain: projectDomain,
            requirements: requirements,
            completedStatus: completedStatus,
            teammates: teammates,
            creatorID: userID // Added creatorID to the project data
        }

        // Insert project data into 'projects' collection
        console.log(projectData);
        await OngoingProject.create(projectData);

        return NextResponse.json({ message: 'Project created successfully' });
    } catch (error) {
        console.error('MongoDB Error:', error);
        return NextResponse.json({ message: 'Internal Server Error', error: error.message });
    }
}
