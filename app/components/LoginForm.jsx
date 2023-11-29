"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Spinner } from "@material-tailwind/react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const user = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!user.ok) {
      setLoading(false);
      setError("Invalid credentials");
      return;
    }

    setLoading(false);
    setEmail("");
    setPassword("");
    router.push("/");
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-96 border border-blue-700 py-2 px-6 rounded-xl bg-zinc-100/40"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
          <button className="bg-blue-700 text-white font-bold rounded-xl mx-auto cursor-pointer px-6 py-2">
            {loading ? <Spinner /> : "Login"}
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

export default LoginForm;
