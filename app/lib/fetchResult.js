export default async function fetchResult(param) {
  const postsTest = await fetch(`api/posts/${param}`);
  return await postsTest.json();
}
