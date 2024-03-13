import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import { GeldLogo } from "@/assets/logo";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  // const [email, setEmail] = useState[""];
  // const [pass, setPass] = useState[""];

  // function handleSubmit() {
  //   axios.post
  // }

  return (
    <main className="w-screen h-screen flex">
      <div className="w-1/2 h-full flex justify-center items-center">
        <div className="flex flex-col justify-center items-center w-[384px] gap-y-3">
          <GeldLogo />
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl font-black">Welcome Back</h1>
            <h2>Welcome back, please enter your details</h2>
          </div>
          <div className="flex flex-col w-full gap-y-3">
            <input
              type="text"
              placeholder="Email"
              className="w-full pl-2 input input-bordered border-[1px] border-gray-300 rounded-md h-[48px] bg-gray-200"
            />
            <input
              type="text"
              placeholder="Password"
              className="w-full pl-2 input input-bordered border-[1px] border-gray-300 rounded-md h-[48px] bg-gray-200"
            />
          </div>
          <button className="btn bg-blue-500 w-full rounded-full text-slate-50">
            Login
          </button>
          <div className="flex justify-center items-center">
            <h1 className="m-0">Don't have an account?</h1>
            <Link href="/signup" className="btn btn-link">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      {/* second half of the screen */}
      <div className="w-1/2 h-full bg-blue-600 flex flex-col justify-end items-center"></div>
    </main>
  );
}
