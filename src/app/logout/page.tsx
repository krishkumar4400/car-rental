"use client"

import axios from "axios"
import toast from "react-hot-toast";

const Page = () => {

    const onLogout = async () => {
        console.log("in logout")
        try {
            const { data } = await axios.get('/api/users/logout');
            console.log(data)
            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.response?.data.message);
        }
    }
    return (
        <div>
            <div className="">
                <button className="px-6 py-2 border border-blue-600 rounded-lg " onClick={() => onLogout()}>Logout</button>
            </div>
        </div>
    )
}

export default Page
