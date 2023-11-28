import React from "react";
import Link from "next/link";
import prisma from "@/prisma/client";
import EditPost from "@/app/components/EditPost";

const EditBlog = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
  });

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

  return <EditPost post={post} />;
};

export default EditBlog;
