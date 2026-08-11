"use client"

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {

    const [user, setUser] = useState<any>(null);

    const getUserData = async () => {
        try {

            const { data } =
                await axios.get("/api/users/me");

            setUser(data.data.user);

            toast.success("User data fetched");

        } catch (error: any) {

            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };
    useEffect(() => {
        console.log(user);
    }, [user])

    return (
        <div>
            <h1>Profile Page</h1>
            <div>
                <p>
                    <Link href={'/logout'}>
                        Go To Logout</Link>
                </p>
            </div>

            <div>
                <button onClick={getUserData}>Get User Data</button>
                {
                    user && (
                        <button>
                            <Link href={`profile/${user._id}`}>Get Details</Link>
                        </button>
                    )
                }
            </div>
        </div>
    )
}