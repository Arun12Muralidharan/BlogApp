import React from "react";
import Link from "next/link";
import prisma from "@/prisma/client";
import AddComment from "../components/AddComment";
import EditAndDeleteButtons from "../components/EditAndDeleteButtons";

const IndividualPost = async ({ params }) => {
  //   console.log(params.id);

  const post = await prisma.post.findUnique(
    {
      where: { id: params.id },
    },
    { next: { revalidate: 0 } },
    { cache: "no-store" }
  );

  if (!post) {
    return (
      <main className="grid place-items-center h-[80vh]">
        <div className="italic">
          The blog doesn&apos;t exist. <br />
          Click here for&nbsp;
          <Link href={"/"} className="underline hover:text-blue-800">
            Home
          </Link>
          &nbsp;page.
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="flex flex-col mt-4 mx-auto px-4 max-w-2xl">
        <h1 className="font-bold text-2xl text-blue-700 mb-2">{post.title}</h1>
        <div className="flex flex-row gap-3 text-sm text-zinc-400 mb-4">
          <h4>{post.postUser}</h4>
          <p>{post.createdAt.toLocaleDateString()}</p>
        </div>
        <section>{post.description}</section>

        <div className="flex flex-row justify-between">
          <Link
            className="border boder-green-400 bg-blue-700 text-white rounded-md mt-4 py-2 px-4"
            href={"/"}
          >
            Back
          </Link>
          <EditAndDeleteButtons post={post} />
        </div>
      </main>
      <aside className="mt-1 mx-auto p-5 max-w-2xl">
        <h3 className="font-bold">Comments</h3>
        <AddComment />
      </aside>
    </>
  );
};

export default IndividualPost;
