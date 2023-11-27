"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const LoginPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      redirect("/");
      return null;
    }
  }, [session]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading("Loading");
    setError("");

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const user = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!user.ok) {
      setLoading("");
      setError("Invalid credentials");
      return;
    }

    setLoading("");
    router.replace("/");
  };

  return (
    <div className="grid place-items-center mt-28">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-blue-700">
        <h1 className="text-xl font-bold my-4">Login</h1>
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
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
            minLength={6}
            required
          />
          <button className="bg-blue-700 text-white font-bold rounded-xl cursor-pointer px-6 py-2">
            {loading ? "Loading" : "Login"}
          </button>
        </form>

        {error && (
          <div className="bg-red-500 text-white w-fit text-sm mt-5 py-1 px-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="text-sm mt-3 text-right">
          New to Blog App? &nbsp;
          <Link href={"/register"} className="underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
