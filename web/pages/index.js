import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import { GeldLogo } from "@/assets/logo";
import { useState } from "react";

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
            <h1 className="text-2xl font-black">Welcome MF</h1>
            <h2>Welcome mf, now enter yo shit</h2>
          </div>
          <div className="flex flex-col w-full gap-y-3">
            <input
              type="text"
              placeholder="yo mail"
              className="w-full pl-2 input input-bordered border-[1px] border-gray-300 rounded-md h-[48px] bg-gray-200"
            />
            <input
              type="text"
              placeholder="dat encrypted shi"
              className="w-full pl-2 input input-bordered border-[1px] border-gray-300 rounded-md h-[48px] bg-gray-200"
            />
          </div>
          <button className="btn bg-blue-500 w-full rounded-full text-slate-50">
            Login
          </button>
          <div className="flex justify-center items-center">
            <h1 className="m-0">Don't have an account?</h1>
            <button className="btn btn-link">Sucks to suck</button>
          </div>
        </div>
      </div>
      {/* second half of the screen */}
      <div className="w-1/2 h-full bg-blue-600 flex flex-col justify-end items-center">
        <div className="w-11/12 h-full flex flex-col justify-end">
          <div className="chat chat-start">
            <div className="chat-bubble">
              It's over <br />I have no grounds.
            </div>
          </div>
          <div className="chat chat-end">
            <div className="chat-bubble">Tragic.</div>
          </div>
        </div>
        <input
          type="text"
          placeholder="You can't touch this"
          class="input input-bordered w-11/12 my-2"
          disabled
        />
      </div>
    </main>
  );
}
