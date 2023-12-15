import prisma from "@/prisma/client";
import SinglePost from "./components/SinglePost";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home(request) {
  const posts = await prisma.post.findMany(
    {},
    { next: { revalidate: 0 } },
    { cache: "no-store" }
  );

  // const postsTest = await fetch(
  //   `${process.env.NEXTAUTH_URL}/api/posts`,
  //   {
  //     cache: "no-store",
  //   },
  //   { next: { revalidate: 0 } }
  // );
  // const { posts } = await postsTest.json();

  const orderedPosts = posts.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

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
