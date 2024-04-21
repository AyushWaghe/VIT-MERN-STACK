import { connectDB } from '../../../../dbConfig/db.js';
import User from '../../../../models/userSchema.js';
import { NextResponse } from "next/server";

connectDB();

export async function POST(request) {
    try {
        const reqBody = await request.json()
        const { username, password } = reqBody;
        console.log("rerere",reqBody);

        // Check if user exists
        const user = await User.findOne({ username: username })
        if (!user) {
            return NextResponse.json({ success:false,message: "User does not exist" }, { status:200  })
        }
        console.log("User exists");

        // Check if password is correct
        const userPassword = user.password;
        if (password!=userPassword) {
            return NextResponse.json({ success:false,message: "User password does not match" }, { status: 200 })
        }
        console.log(user);

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            userID: user._id,
          });
        return response;

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
