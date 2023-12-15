"use client";
import React, { useState } from "react";
import { Spinner } from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const { data: session } = useSession();
  // console.log(session);
  const router = useRouter();

  const createPostHandler = async (e) => {
    e.preventDefault();
    setLoading("loading...");
    setError("");
    setSuccess("");

    if (!title || !content) {
      setError("All fields are required");
      setLoading("");
      return null;
    }

    const newPost = await fetch("api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description: content,
        postUserEmail: session.user.email,
        postUser: session.user.name,
      }),
    });

    setLoading("");

    if (newPost.status === 501) {
      setError("Fields doesn't met required criteria");
      return null;
    }

    if (newPost.status === 201) {
      setSuccess("Post Created");
      setTitle("");
      setContent("");
      router.push("/");
      router.refresh();
    }
  };

  return (
    <main className="max-w-2xl mx-auto">
      <form
        className="flex flex-col mx-7 my-5 gap-3"
        onSubmit={createPostHandler}
      >
        <h1 className="text-blue-700 font-bold py-2 text-xl">
          Start the new blog
        </h1>
        <input
          type="text"
          placeholder="Blog Title"
          className="border border-blue-600 px-2 py-1 rounded-md"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          cols="30"
          rows="10"
          placeholder="Blog content..."
          className="border border-blue-600 px-2 py-1 rounded-md"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        {session && (
          <div className="flex flex-row justify-between">
            <Link
              className="bg-blue-700 text-white text-bold p-2 rounded-md mx-auto"
              href={"/"}
            >
              Back
            </Link>
            <button className="bg-blue-700 text-white text-bold p-2 rounded-md mx-auto">
              {loading ? <Spinner /> : "Create"}
            </button>
          </div>
        )}
      </form>
      <div className="flex flex-col mx-7 text-white gap-2">
        {success && (
          <span className="bg-blue-700 px-2 py-1 rounded-md w-fit">
            Post Created
          </span>
        )}
        {error && (
          <span className="bg-red-500 px-2 py-1 rounded-md w-fit">
            Error in creating post
          </span>
        )}
      </div>
    </main>
  );
};

export default NewPost;
