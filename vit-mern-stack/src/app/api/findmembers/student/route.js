// pages/api/users.js
import { connectDB } from '../../../../dbConfig/db.js';
import UserProfile from '../../../../models/userProfileSchema.js';
import { NextResponse } from "next/server";
connectDB();

export async function POST(request) {
    console.log("hit hit ");
    try {
        const reqBody = await request.json()
      const { userName, skills, degree, branch} = reqBody;
      console.log("userName: " + branch);

      const query = {};


      if (userName) {
        const regexPattern = new RegExp(`${userName.split('').join('.*')}`, 'i'); 
        query.userName = regexPattern;
      } else {

        if (degree!='') query.degree = degree;
        if (branch!='') query.branch = branch;
        if (skills[0]!='') query.skills = { $in: skills}; // Split skills string into an array
      }

      console.log(query);


      let users = [];
      if (Object.keys(query).length !== 0) {
        users = await UserProfile.find(query);
      } else {

        users = await UserProfile.find();
      }

      console.log(users);

      return NextResponse.json({ success:true,users }, { status:200  })
    } catch (error) {
        
        return NextResponse.json({ success:false}, { status:200  })
    }
}
