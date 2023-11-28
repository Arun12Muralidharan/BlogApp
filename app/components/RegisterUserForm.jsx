"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Spinner } from "@material-tailwind/react";

const RegisterUserForm = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading("Loading");
    let name = nameRef.current.value;
    let email = emailRef.current.value;
    let password = passwordRef.current.value;

    if (!name || !email || !password) {
      setError("All fields are required");
      setLoading("");
      return null;
    }

    const registerUser = await fetch("api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    setLoading("");

    if (registerUser.status === 500) {
      setError("Fields doesn't met required criteria");
      return null;
    }
    if (registerUser.status === 501) {
      setError("User already exist");
      return null;
    }

    nameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";

    if (registerUser.status === 201) {
      setSuccess("User Created");
      router.push("/login");
    }
  };

  return (
    <div className="grid place-items-center mt-28">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-blue-700">
        <h1 className="text-xl font-bold my-4">Register</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            className="w-96 border border-blue-700 py-2 px-6 rounded-xl bg-zinc-100/40"
            type="text"
            placeholder="Name"
            ref={nameRef}
            required
            minLength={3}
          />
          <input
            className="w-96 border border-blue-700 py-2 px-6 rounded-xl bg-zinc-100/40"
            type="email"
            placeholder="Email"
            ref={emailRef}
            required
          />
          <input
            className="w-96 border border-blue-700 py-2 px-6 rounded-xl bg-zinc-100/40"
            type="password"
            placeholder="Password"
            ref={passwordRef}
            required
            minLength={6}
          />
          <button className="bg-blue-700 text-white font-bold rounded-xl mx-auto px-6 py-2">
            {loading ? <Spinner /> : "Register"}
          </button>
        </form>

        {error && (
          <div className="bg-red-500 text-white w-fit text-sm mt-5 py-1 px-3 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-blue-700 text-white w-fit text-sm mt-5 py-1 px-3 rounded-lg">
            {success}
          </div>
        )}

        <div className="text-sm mt-3 text-right">
          Already have an account? &nbsp;
          <Link href={"/login"} className="underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterUserForm;
