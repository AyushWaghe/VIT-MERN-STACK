// pages/api/projects.js
import { connectDB } from '../../../../dbConfig/db.js';
import { NextResponse } from "next/server";
import { OngoingProject }  from '../../../../models/projectSchema.js';

await connectDB(); // Connect to the database

export async function POST(request) {
    console.log("Route hit");
    // console.log(req.body);
    try {
        // const {projectID} =req.body.projectID;
        const reqBody=await request.json();
        const { projectID,projectName, categoryName, domainName } = reqBody; // Fix request object reference
        console.log(categoryName);
        // Construct the query based on incoming parameters
        const query = {};

        // If projectName is provided, perform a combination of text search and regex matching
        if(projectID){
          query.projectID=projectID;
        }
        else if (projectName) {
            const regexPattern = new RegExp(`${projectName.split('').join('.*')}`, 'i'); // Fix regex creation
            query.projectName = regexPattern;
        } else {
            // Otherwise, use other fields for filtering
            if (categoryName[0]!='') query.categoryName = { $in: categoryName };
            if (domainName[0] !='') query.domainName = { $in: domainName};
        }

        // Query MongoDB to find matching projects
        let projects = [];
        console.log("query",query);
        if (Object.keys(query).length !== 0) {
            projects = await OngoingProject.find(query); // Use Project for querying
        } else {
            // If no search criteria provided, return all projects
            projects = await OngoingProject.find();
        }

        console.log(projects);

        return NextResponse.json(projects); // Fix response object reference
    } catch (error) {
        console.error(error); // Log error for debugging
        return NextResponse.error(new Error('Internal Server Error')); // Return error response
    }
}


// export async function POST(request){
//     const reqBody=await request.json();
//     const {projectID}=reqBody;
//     console.log(projectID);
//     return new Response("GET handler");
// }