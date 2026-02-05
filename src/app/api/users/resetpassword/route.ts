import { connect } from "@/Db/dbConfig";
import User from "@/model/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function POST(request:NextRequest){
    try {
        const {token, password} = await request.json();
        console.log(token, password);

        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now()}});

        if (!user) {
            return NextResponse.json(
                {error: "Token invalid or expired"},
                {status: 400}
            );
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({message:"Password Change"});

    } catch (error:any) {
        return NextResponse.json({error: error.message}), {status:500}
    }
}