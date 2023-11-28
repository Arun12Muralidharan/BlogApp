import prisma from "@/prisma/client";
import SinglePost from "./components/SinglePost";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home(request) {
  const posts = await prisma.post.findMany({}, { cache: "no-store" });

  const orderedPosts = posts.sort((a, b) => b.createdAt - a.createdAt);

  const content = orderedPosts.map((post) => (
    <Link key={post.id} href={`/${post.id}`}>
      <SinglePost key={post.id} post={post} />
    </Link>
  ));

  return (
    <main className="flex flex-col mx-auto my-3 gap-3 mt-3 max-w-2xl">
      <h1 className="text-blue-700 font-bold text-xl mb-2">Blogs</h1>
      {content}
    </main>
  );
}
