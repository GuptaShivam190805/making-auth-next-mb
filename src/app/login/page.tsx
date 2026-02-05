'use client';
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error:any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    const forgotpassword = async() => {
     try {
        setLoading(true);
        const response = await axios.post("/api/users/forgotpassword", user);
        toast.success("Verify User");
        router.push("/resetpassword");
     } catch (error:any) {
         console.log("Login failed", error.message);
        toast.error(error.message);
     } finally{
        setLoading(false);
     }
  }
  

    useEffect(()=>{
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-center text-2xl text-amber-200">{loading ? "Processing" : "Login"}</h1>
            <hr />
            <label htmlFor="email">email</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" type="email" placeholder="email" value={user.email} id="email" onChange={(e) => setUser({...user, email:e.target.value})} />
            <label htmlFor="password">password</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" type="password" placeholder="password" value={user.password} id="password" onChange={(e) => setUser({...user, password:e.target.value})} />
            <button onClick={onLogin}  className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
              Login here
            </button>
            <hr />
            <button onClick={forgotpassword} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
                    forgout Password
            </button>

            <Link href="/signup">Visit Signup page</Link>
        </div>
    )
}