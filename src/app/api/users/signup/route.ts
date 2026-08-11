
import connectToDB from "@/config/database"
import userModel from "@/models/user.models";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "@/helpers/env";
import { UserPayload } from "@/types/auth";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import sendEmail from "@/helpers/mailer";


if (!JWT_SECRET) {
    throw new Error("JWT_SECRET missing");
}


export async function POST(req: NextRequest) {

    await connectToDB();

    const cookieStore = await cookies();

    try {
        const { username, email, password } = await req.json();

        if (!username || !email || !password) {
            return NextResponse.json({
                message: "Missing details",
                success: false
            });
        }

        let user = await userModel.findOne({
            $or: [
                { username }, { email }
            ]
        });

        if (user) {
            return NextResponse.json({
                message: "User already exists with this username or email id",
                success: false
            }, {
                status: 409
            });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);


        user = await userModel.create({
            username,
            email,
            password: hashedPassword
        });

        const payload: UserPayload = {
            userId: user._id.toString()
        }

        const token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: '7d'
        });

        cookieStore.set({
            name: 'token',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/"
        });

        // send verification email
        sendEmail({ email, mailType: "VERIFY", userId: user._id.toString() });

        return NextResponse.json({
            message: "User registered successfully",
            success: true
        },
            {
                status: 201
            });

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Something went wrong while registering a user",
            success: false
        }, {
            status: 500
        });
    }


}
