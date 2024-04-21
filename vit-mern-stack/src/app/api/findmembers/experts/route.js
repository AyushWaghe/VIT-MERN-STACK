// pages/api/users.js
import { NextResponse } from "next/server";
import { connectDB } from '../../../../dbConfig/db.js';
import UserProfile from '../../../../models/userProfileSchema.js';
connectDB();

export async function POST(request) {
    console.log("hit hit ");
    try {
        const reqBody = await request.json()
      const { userName, skills, school, department} = reqBody;
      console.log("userName: " + department);
      // Construct the query based on incoming parameters
      const query = {};

      // If userName is provided, perform a combination of text search and regex matching
      if (userName) {
        const regexPattern = new RegExp(`${userName.split('').join('.*')}`, 'i'); 
        query.userName = regexPattern;
      } else {

        if (school!='') query.school = school;
        if (department!='') query.department = department;
        if (skills[0]!='') query.skills = { $in: skills}; 
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
