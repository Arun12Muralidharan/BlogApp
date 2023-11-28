"use client";

import React, { useEffect, useState } from "react";
import { useRouter, redirect } from "next/navigation";
import { Spinner } from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const EditPost = ({ post }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.description);

  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const { data: session } = useSession();
  // console.log(session);
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      redirect("/login");
    }
  }, [session]);

  let authorizedUser = true;
  if (post.postUserEmail !== session?.user?.email) {
    authorizedUser = false;
    redirect(`/${post.id}`);
  }

  const editPostHandler = async (e) => {
    e.preventDefault();
    setLoading("loading...");
    setError("");
    setSuccess("");

    if (!title || !content) {
      setError("All fields are required");
      setLoading("");
      return null;
    }

    const updatedPost = await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
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

    // console.log(updatedPost);
    setLoading("");

    if (updatedPost.status === 501) {
      setError("Fields doesn't met required criteria");
      return null;
    }

    setTitle("");
    setContent("");

    if (updatedPost.status === 201) {
      setSuccess("Post Updated");
      router.push(`/${post.id}`);
    }
  };

  return (
    <main className="max-w-2xl mx-auto">
      <form
        className="flex flex-col mx-7 my-5 gap-3"
        onSubmit={editPostHandler}
      >
        <h1 className="text-blue-700 font-bold py-2 text-xl">Edit the blog</h1>
        <input
          type="text"
          placeholder="Blog Title"
          className="border border-blue-600 px-2 py-1 rounded-md"
          required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          cols="30"
          rows="10"
          placeholder="Blog content..."
          className="border border-blue-600 px-2 py-1 rounded-md"
          required
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
        {authorizedUser && (
          <div className="flex flex-row justify-between">
            <Link
              className="bg-blue-700 text-white text-bold p-2 rounded-md mx-auto"
              href={`/${post.id}`}
            >
              Back
            </Link>
            <button className="bg-blue-700 text-white text-bold p-2 rounded-md mx-auto">
              {loading ? <Spinner /> : "Update"}
            </button>
          </div>
        )}
      </form>
      <div className="flex flex-col mx-7 text-white gap-2">
        {success && (
          <span className="bg-blue-700 px-2 py-1 rounded-md w-fit">
            Post Updated
          </span>
        )}
        {error && (
          <span className="bg-red-500 px-2 py-1 rounded-md w-fit">
            Error in updating post
          </span>
        )}
      </div>
    </main>
  );
};

export default EditPost;
