import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/model/userModel";
import { connect } from "@/Db/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);

    const user = await User.findById(userId).select("-password");

    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
