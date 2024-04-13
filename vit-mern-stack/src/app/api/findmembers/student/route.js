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
      // Construct the query based on incoming parameters
      const query = {};

      // If userName is provided, perform a combination of text search and regex matching
      if (userName) {
        const regexPattern = new RegExp(`${userName.split('').join('.*')}`, 'i'); // Fix regex creation
        query.userName = regexPattern;
      } else {
        // Otherwise, use other fields for filtering
        // if (school) query.school = school;
        // if (department) query.department = department;
        if (degree!='') query.degree = degree;
        if (branch!='') query.branch = branch;
        if (skills[0]!='') query.skills = { $in: skills}; // Split skills string into an array
      }

      console.log(query);

      // Query MongoDB to find matching users
      let users = [];
      if (Object.keys(query).length !== 0) {
        users = await UserProfile.find(query);
      } else {
        // If no search criteria provided, return all users
        users = await UserProfile.find();
      }

      console.log(users);

      return NextResponse.json({ success:true,users }, { status:200  })
    } catch (error) {
        
        return NextResponse.json({ success:false}, { status:200  })
    }
}
