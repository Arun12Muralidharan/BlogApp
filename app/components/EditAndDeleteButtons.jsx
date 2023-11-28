"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const EditAndDeleteButtons = ({ post }) => {
  const { data: session } = useSession();
  const router = useRouter();

  let authorizedUser = false;
  if (post.postUserEmail === session?.user?.email) {
    authorizedUser = true;
  }

  const deletePostHandler = async (e) => {
    e.preventDefault();
    if (!authorizedUser) {
      return null;
    }
    // console.log("delete function called");

    const deletedPost = await fetch(`/api/posts/${post.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: {},
    });

    // console.log(deletedPost);

    if (deletedPost.status === 404) {
      return <span>Post not deleted</span>;
    }

    if (deletedPost.status === 201) {
      router.push("/");
    }
    return;
  };

  return (
    <>
      {authorizedUser && (
        <div className="flex flex-row gap-2 mr-2">
          <Link
            href={`/${post.id}/edit`}
            className="border boder-green-400 bg-blue-700 text-white rounded-md mt-4 py-2 px-4"
          >
            Edit
          </Link>
          <button
            className="border boder-green-400 bg-red-600 text-white rounded-md mt-4 py-2 px-4"
            onClick={deletePostHandler}
          >
            Delete
          </button>
        </div>
      )}
    </>
  );
};

export default EditAndDeleteButtons;
