"use client"
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';
import toast from "react-hot-toast";

const page = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });

    const onSignup = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/users/signup', user);
            console.log("response = ", data);
            if (data.success) {
                toast.success(data.message);
                router.push('/profile');
            } else {
                toast.error(data.message);
            }

        } catch (error: any) {
            console.log(error);
            toast.error(error.response?.data.message);
        }
    }

    return (
        <div >
            <div className="w-full h-screen flex items-center justify-center flex-col bg-gray-100">

                <form onSubmit={onSignup} className="flex bg-white flex-col justify-center items-center gap-4 m-auto  px-8 py-8 shadow-2xl shadow-gray-400">
                    <h1 className="font-bold text-gray-600 text-center pb-6 text-2xl">Signup</h1>
                    <div className="border border-gray-400 rounded-lg px-6 py-2 text-gray-800">
                        <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} className="outline-0 border-0" type="text" name="username" placeholder="Enter your username" />
                    </div>
                    <div className="border border-gray-400 rounded-lg px-6 py-2 text-gray-800">
                        <input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className="outline-0 border-0" type="email" name="email" placeholder="Enter your Email id" />
                    </div>
                    <div className="border border-gray-400 rounded-lg px-6 py-2 text-gray-800">
                        <input value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })} className="outline-0 border-0" type="password" placeholder="Enter your password" />
                    </div>
                    <div className="w-full rounded-lg text-white">
                        <button className="border-0 bg-blue-500 w-full py-2 text-center rounded-lg font-semibold" type="submit">Signup</button>
                    </div>

                    <div className="text-sm text-gray-600">
                        <p>Already have an account ? <Link className="text-blue-600 underline " href={"/login"}>Login</Link></p>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default page
