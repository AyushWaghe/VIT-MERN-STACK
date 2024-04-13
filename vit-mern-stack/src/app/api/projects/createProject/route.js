// pages/api/createProject.js
import { connectDB } from '../../../../dbConfig/db.js';
import Project from '../../../../models/projectSchema.js';
import Projectcats from '../../../../models/projectCategorySchema.js';
import Projectdoms from '../../../../models/projectDomainSchema.js';
import { NextResponse } from "next/server";

connectDB();

async function generateRandomID() {
    const timestamp = new Date().getTime().toString();
    const randomComponent = Math.floor(Math.random() * 90000) + 10000;
    const uniqueRandomNumber = parseInt(timestamp.slice(-5) + randomComponent.toString().slice(-2));
    return uniqueRandomNumber;
}

export { generateRandomID };

export async function POST(request, response) {
    console.log("hiy git tit ");
    const reqBody = await request.json();
    const {projectName, category, projectDomain,teammates } = reqBody;
    try {
        // Generate random ID
        const randomID = await generateRandomID();
        console.log(randomID);
        const projectID=randomID;
        const completedStatus=0;

        const projectData={
          projectID:projectID,
          projectName:projectName,
          category:category,
          projectDomain:projectDomain,
          completedStatus:completedStatus,
          teammates:teammates
        }

        // Insert project data into 'projects' collection
        await Project.create(projectData); // Use create method instead of insertOne

        // Update 'project category' collection
        await Projectcats.updateOne(
            { categoryName: category },
            { $push: { projectIDs: projectID } }
        );

        // Update 'project domain' collection
        await Projectdoms.updateOne(
            { domainName: projectDomain},
            { $push: { projectIDs: projectID } }
        );

        return NextResponse.json({ message: 'Project created successfully' }); // Return NextResponse here
    } catch (error) {
        console.error('MongoDB Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }); // Return NextResponse here as well
    }
}
