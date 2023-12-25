"use client";
import SinglePost from "./components/SinglePost";
import Link from "next/link";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import fetchResults from "./lib/fetchResults";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function Home(request) {
  let content;

  const { ref, inView } = useInView();

  // const { data, isLoading, isSuccess, isError, error } = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: () => fetchResults(),
  // });

  const {
    data,
    isError,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchResults,
    initialPageParam: 1,
    getNextPageParam: (lastpage, allpages) => {
      return lastpage.posts.length ? allpages.length + 1 : undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  if (isError) {
    content = <p>Error in loading...</p>;
    return;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
    return;
  }

  content = data.pages.map(({ posts }) =>
    posts.map((post, index) => {
      if (posts.length - 1 === index) {
        return (
          <Link key={post.id} href={`/${post.id}`}>
            <SinglePost key={post.id} post={post} innerRef={ref} />
          </Link>
        );
      }
      return (
        <Link key={post.id} href={`/${post.id}`}>
          <SinglePost key={post.id} post={post} />
        </Link>
      );
    })
  );

  return (
    <main className="flex flex-col mx-auto mt-3 mb-5 gap-3 max-w-xl box-border w-4/5 lg:max-w-2xl">
      <h1 className="text-blue-700 font-bold text-xl mb-2">Blogs</h1>
      {content}
      {isFetchingNextPage && <h3>Loading...</h3>}
    </main>
  );
}
