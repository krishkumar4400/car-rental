import userModel from "@/models/user.models";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "@/helpers/env";
import { cookies } from "next/headers";
import connectToDB from "@/config/database";
import { UserPayload } from "@/types/auth";

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET missing");
}

export async function POST(req: NextRequest) {
    try {
        await connectToDB();
        const cookieStore = await cookies();
        const { email, password } = await req.json();
        if (!email || !password) {
            return NextResponse.json({
                message: "Missing details",
                success: false
            }, { status: 400 });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return NextResponse.json({
                message: "Incorrect email or password",
                success: false
            }, { status: 401 });
        }

        const isPasswordMatch = await bcryptjs.compare(password, user.password);

        if (!isPasswordMatch) {
            return NextResponse.json({
                message: "Incorrect email or password",
                success: false
            }, { status: 401 });
        }

        const payload: UserPayload = {
            userId: user._id.toString()
        };

        const token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: '7d'
        });

        cookieStore.set({
            name: "token",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/"
        });

        return NextResponse.json({
            message: "User logged in successfully",
            success: true
        }, {
            status: 200
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Something went wrong while login",
            success: false
        }, {
            status: 500
        });
    }
}