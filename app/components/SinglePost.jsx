import React from "react";

const SinglePost = ({ post, innerRef }) => {
  return (
    <section
      className="cursor-pointer shadow-lg border border-blue-700 rounded-md p-5 mt-1 w-full"
      ref={innerRef}
    >
      <h2 className="text-xl font-bold text-blue-700 w-full">{post.title}</h2>
      <div className="flex flex-row gap-4 text-sm text-gray-400">
        <h4>{post.postUser}</h4>
        <p>{new Date(post.createdAt).toLocaleDateString()}</p>
      </div>
      <p className="mt-2 overflow-x-hidden">
        {post.description.substring(0, 50)}...
      </p>
    </section>
  );
};

export default SinglePost;
