'use client'

import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast";

export default function ForgotPasswordPage(){
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("")
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    useEffect(()=>{
        const verifyToken = async () => {
            try {
                await axios.post("/api/users/verifyemail", {token})
                setVerified(true);
            } catch (error) {
                setError(true)
                console.log(error)
            }
        };
        if (token) verifyToken();
            
    },[token])

   const resetPassword = async () => {
    try {
       await axios.post("/api/users/resetpassword", {
        token,
        password,
      });
      toast.success("Password updated successfully");
    } catch (err: any) {
      setError(true);
      toast.error("Something went wrong")
    }
  };

  if (error) return <h2>{"Error hai bhai"}</h2>
  if (!verified) return <h2>Verifying token...</h2> 

  return (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
      
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Reset Your Password
      </h1>

      <input
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />

      <button
        onClick={resetPassword}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
      >
        Reset Password
      </button>

    </div>
  </div>
  )
}