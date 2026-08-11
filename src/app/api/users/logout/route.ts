import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    console.log("in logout route")
    try {
        const cookieStore = await cookies();
        cookieStore.delete("token");
        return NextResponse.json({
            message: "You are logged out",
            success: true
        }, {
            status: 200
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "Error while logging out",
            success: false
        }, {
            status: 500
        });
    }
}
