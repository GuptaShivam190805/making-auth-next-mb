'use client';

import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [data, setData] = useState("nothing");
  const router = useRouter();

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me", {
      withCredentials: true,
    });

    setData(res.data.data._id);
  };

  const logout = async () => {
    await axios.get("/api/users/logout", {
      withCredentials: true,
    });

    router.push("/login"); // redirect after logout
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Profile</h1>

      <h2 className="p-2 bg-green-500">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>

      <button
        onClick={getUserDetails}
        className="bg-blue-500 text-white p-2 mt-4 rounded"
      >
        Get User Details
      </button>

      {/* ✅ Logout Button */}
      <button
        onClick={logout}
        className="bg-red-500 text-white p-2 mt-4 rounded"
      >
        Logout
      </button>
    </div>
  );
}
