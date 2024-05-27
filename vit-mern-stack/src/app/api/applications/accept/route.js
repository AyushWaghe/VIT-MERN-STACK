import { connectDB } from "../../../../dbConfig/db";
import Application from "../../../../models/applicationSchema";
import { OngoingProject } from "../../../../models/projectSchema";

await connectDB();

export async function POST(request) {
    try {
        if (request.method !== 'POST') {
            return new Response(JSON.stringify({ message: 'Method not allowed' }), { status: 405 });
        }

        const { applierID, projectID, applicationID, request: requestType, name, role } = await request.json();

        if (!applierID || !projectID || !applicationID || !requestType || !name || !role) {
            return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
        }

        if (requestType !== 'accept' && requestType !== 'reject') {
            return new Response(JSON.stringify({ message: 'Invalid request type' }), { status: 400 });
        }

        if (requestType === 'accept') {
            const updateResult = await OngoingProject.findOneAndUpdate(
                { projectID: projectID }, // Ensure to use the correct field for querying
                { $addToSet: { teammates: { userID: applierID, name: name, role: role } } }, // Adding userID, name, and role
                { new: true } // To return the updated document
            );
            if (!updateResult) {
                return new Response(JSON.stringify({ message: 'Project not found or applier already a teammate' }), { status: 404 });
            }
        }

        // Delete the application by applicationID
        const deleteResult = await Application.findOneAndDelete({ applicationID: applicationID });

        const message = requestType === 'accept' ? 'Application Accepted' : 'Application Rejected';
        return new Response(JSON.stringify({ message }), { status: 200 });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
    }
}
