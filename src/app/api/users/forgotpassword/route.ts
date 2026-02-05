import { connect } from "@/Db/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";


connect();


export async function POST(request: NextRequest){
    try {
       const {email} = await request.json();

       const user = await User.findOne({email});

       if (!user) {
        return NextResponse.json({error: "User not found"}, {status: 400})
       }

    await sendEmail({
    email,
    emailType: "RESET",
    userId: user._id   // correct key
    })

     return NextResponse.json({
      message: "Email sent successfully",
    });

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}