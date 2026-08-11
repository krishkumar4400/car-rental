"use client"

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";


const page = () => {
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
  return (
    <div>
      <h1>
        profile:
      </h1>
      <div>
        <button onClick={getUserData}>Get User Data</button>
        {
          user && (
            <div>
              <h1>
                {
                  user.username
                }
              </h1>
              <h1>
                {
                  user.email
                }
              </h1>
              <h1>
                {
                  user.isVerified
                }
              </h1>
              <h1>
                {
                  user.isAdmin
                }
              </h1>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default page
