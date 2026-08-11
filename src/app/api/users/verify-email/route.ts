import connectToDB from "@/config/database";
import userModel from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        await connectToDB();
        const { token } = await request.json();
        console.log(token);

        if (!token) {
            return NextResponse.json({
                message: "Token is missing",
                success: false
            }, {
                status: 404
            });
        }

        const user = await userModel.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });

        if (!user) {
            return NextResponse.json({
                message: "Invalid Token",
                success: false
            }, {
                status: 400
            });
        }

        console.log(user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Your Email has been verfied successfully",
            success: true
        }, {
            status: 200
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "Error while verifying email",
            success: false
        }, {
            status: 500
        });
    }
}