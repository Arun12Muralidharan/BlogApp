export default async function fetchResults({ pageParam }) {
  const postsTest = await fetch(
    // `${process.env.NEXTAUTH_URL}/api/posts/?page=${pageParam}`
    `api/posts/?page=${pageParam}`
  );
  return await postsTest.json();
}
