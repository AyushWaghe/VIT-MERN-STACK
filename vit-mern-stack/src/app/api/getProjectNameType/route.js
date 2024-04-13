import { connectDB } from "../../../dbConfig/db.js";
import { NextResponse } from "next/server";
// import Application from "../../../../models/applicationSchema.js";
import { OngoingProject } from "../../../models/projectSchema";

await connectDB();

export async function POST(request) {
    console.log("Getting name and type");

    try {
        const reqBody = await request.json();
        const { projectIDs } = reqBody;
        console.log(projectIDs);

        // Find all applications with the given creatorID
        const projects = await OngoingProject.find({ projectID: { $in: projectIDs } });

        const data=[];

        console.log(projects);
        // console.log(projects[1].categoryName);
        projects.forEach((project) => {
            data.push({
                projectName:project.projectName,
                // categoryName:project.categoryName,
            })
        });

        return NextResponse.json({ success: true, data: data }, { status: 200 });
    } catch (error) {
        console.error("Error fetching applications:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch applications" }, { status: 500 });
    }
}
