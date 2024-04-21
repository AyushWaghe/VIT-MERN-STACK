import { connectDB } from "../../../dbConfig/db.js";
import UserProfile from  "../../../models/userProfileSchema.js";
import { NextResponse } from "next/server";

connectDB();

export async function POST(request){
    try{
        const reqBody = await request.json()
        const { userID } = reqBody;

        const user=await UserProfile.findOne({userID:userID});
        return NextResponse.json({ success:true,user }, { status:200  })
    }catch (error) {
        
        return NextResponse.json({ success:false}, { status:200  })
    }
}