import { GeldLogo } from "@/assets/logo";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

export default function Newaccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState({});

  // onchanges
  const changeName = (event) => {
    setName(event.target.value);
  };

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const changeRepassword = (event) => {
    setRepassword(event.target.value);
  };

  // main signup function

  const handleSignup = async () => {
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      repassword === "" ||
      name === null ||
      email === null ||
      password === null ||
      repassword === null
    ) {
      setError("Please fill all required fields");
      return;
    } else {
      if (password !== repassword) {
        setError("Passwords are mismatched");
        return;
      } else if (password.length < 8) {
        setError("Password is too short");
        return;
      } else {
        // reset error
        setError("");
        try {
          await axios
            .post("http://localhost:4000/user/create", {
              name,
              email,
              password,
            })
            .then((data) => {
              setMessage(data.message);
            });
          setName("");
          setEmail("");
          setPassword("");
          setRepassword("");
        } catch (error) {
          console.error("Error:", error);
          alert("Error");
        }
      }
    }
  };

  return (
    <main className="w-screen h-screen flex">
      <div className="w-1/2 h-full flex justify-center items-center">
        <div className="flex flex-col justify-center items-center w-[384px] gap-y-3">
          <GeldLogo />
          <div className="flex flex-col justify-center items-center mt-3">
            <h1 className="text-2xl font-black">Create Geld Account</h1>
            <h2>Sign Up below to create your Wallet account</h2>
          </div>
          <div className="flex flex-col w-full gap-y-3">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={changeName}
              className="w-full pl-2 input input-bordered border-[1px] border-gray-300 rounded-md h-[48px] bg-gray-200"
            />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={changeEmail}
              className="w-full pl-2 input input-bordered border-[1px] border-gray-300 rounded-md h-[48px] bg-gray-200"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={changePassword}
              className="w-full pl-2 input input-bordered border-[1px] border-gray-300 rounded-md h-[48px] bg-gray-200"
            />
            <input
              type="password"
              placeholder="Re Password"
              value={repassword}
              onChange={changeRepassword}
              className="w-full pl-2 input input-bordered border-[1px] border-gray-300 rounded-md h-[48px] bg-gray-200"
            />
          </div>
          <button
            onClick={handleSignup}
            className="btn bg-blue-500 w-full rounded-full text-slate-50"
          >
            Sign Up
          </button>
          <h1 className="text-red-700">
            {error}
            {message}
          </h1>
          <div className="flex justify-center items-center">
            <h1 className="m-0">Already have an account?</h1>
            <Link href="/" className="btn btn-link">
              Login
            </Link>
          </div>
        </div>
      </div>
      {/* second half of the screen */}
      <div className="w-1/2 h-full bg-blue-600 flex flex-col justify-end items-center"></div>
    </main>
  );
}
