import { getData } from "@/helpers/authToken";
import userModel from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest) {
    try {
        const userId = await getData(request);
        const user = await userModel.findById(userId).select("-password -verifyToken -verifyTokenExpiry -forgotPasswordToken -forgotPasswordTokenExpiry");
        if (!user) {
            return NextResponse.json({
                message: "User doesn't exists",
                success: false
            }, {
                status: 401
            });
        }

        return NextResponse.json({
            data: {
                user
            },
            success: true
        }, {
            status: 200
        });
        
    } catch (error: any) {

        if (error.message === "UNAUTHORIZED") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please login first"
                },
                {
                    status: 401
                }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error"
            },
            {
                status: 500
            }
        );
    }
}