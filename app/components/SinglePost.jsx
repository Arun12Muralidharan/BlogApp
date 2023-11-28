import React from "react";

const SinglePost = ({ post }) => {
  return (
    <section className="cursor-pointer shadow-lg border border-blue-700 rounded-md px-2 py-1 mt-1">
      <h2 className="text-xl font-bold text-blue-700">{post.title}</h2>
      <div className="flex flex-row gap-4 text-sm text-gray-400">
        <h4>{post.postUser}</h4>
        <p>{post.createdAt.toLocaleDateString()}</p>
      </div>
      <p className="mt-2">{post.description.substring(0, 50)}...</p>
    </section>
  );
};

export default SinglePost;
