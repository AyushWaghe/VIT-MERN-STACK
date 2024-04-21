import { connectDB } from '../../../../dbConfig/db.js';
import User from "../../../models/userSchema.js";
import { NextResponse } from "next/server";

connectDB();

export async function POST(request){
    try{
        const reqBody = await request.json()
        const { userName} = reqBody;

        const user=await User.findOne({username:userName});
        const userID=user._id;
        console.log(userID);
        return NextResponse.json({ success:true,userID }, { status:200  })
    }catch (error) {
        
        return NextResponse.json({ success:false}, { status:200  })
    }
}