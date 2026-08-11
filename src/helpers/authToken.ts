import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "./env";
import { CustomJwtPayload } from "@/types/auth";

export async function getData(request:NextRequest) {
    const token = request.cookies.get("token")?.value || "";
    if (!token) {
        throw new Error("UNAUTHORIZED");
    }

    

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;

        return decoded.userId;

    } catch (error : any) {
        console.error(error);
        throw new Error(error.response?.data.message);
        
    }
}