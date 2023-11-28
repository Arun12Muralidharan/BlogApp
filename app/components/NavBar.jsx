"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const NavBar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleNavigateHome = () => {
    router.push("/");
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    signOut();
    router.push("/");
  };

  return (
    <>
      <div className="flex flex-row bg-blue-500 py-5 px-5 justify-around text-white font-bold">
        <div className="cursor-pointer" onClick={handleNavigateHome}>
          BlogApp
        </div>
        <nav>
          <div className="flex flex-row justify-between gap-7">
            {session ? (
              <>
                <Link className="cursor-pointer" href={"/newPost"}>
                  Create New Post
                </Link>
                <div className="cursor-pointer" onClick={handleSignOut}>
                  Logout
                </div>
              </>
            ) : (
              <Link className="cursor-pointer" href={"/login"}>
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
