"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { NextRequest } from "next/server";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

const Page = (req: NextRequest) => {

  const [token, setToken] = useState<string>("");
  const [verified, setVerified] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const router = useRouter();

  const verifyUser = async () => {
    try {
      const { data } = await axios.post('/api/users/verify-email', {
        token
      });

      if (data.success) {
        toast.success(data.message);
        setVerified(true);
        router.push('/profile');
      } else {
        toast.error(data.message);
      }

    } catch (error: any) {
      console.error(error);
      setError(true);
      toast.error(error.response?.data.message);
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token?.length > 0) {
      // verifyUser();
    }
  }, [token]);

  return (
    <div>
      <h1>Verify your Email</h1>
      <div className="w-full flex justify-center  items-center my-10 mx-10 p-10">
        <button onClick={verifyUser} className=" bg-blue-600 border border-gray-200 px-6 py-2 ">click here</button>
      </div>
    </div>
  )
}

export default Page
