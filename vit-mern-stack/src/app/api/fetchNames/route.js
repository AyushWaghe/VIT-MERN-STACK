// pages/api/users.js
import { connectDB } from "../../../dbConfig/db.js";
import UserProfile from "../../../models/userProfileSchema.js";
import { NextResponse } from "next/server";
await connectDB();

export async function POST(request) {
    try {
        console.log("FetchingNames");
        const { applicationIDs } = await request.json(); // Assuming applicationIDs is an array of strings
        
        if (!Array.isArray(applicationIDs)) {
            return NextResponse.error(new Error('Invalid application IDs format.'));
        }

        const userNames = await Promise.all(applicationIDs.map(async (applicationID) => {
            const userProfile = await UserProfile.findOne({ userID: applicationID });
            return userProfile ? userProfile.name : null;
        }));

        console.log(userNames);

        return NextResponse.json({ userNames:userNames });
    } catch (error) {
        console.error('Error fetching user names:', error);
        return NextResponse.error(new Error('Failed to fetch user names.'));
    }
}
