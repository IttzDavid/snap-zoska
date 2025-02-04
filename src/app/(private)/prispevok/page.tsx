import { getPosts } from "@/services/posts-services";
import PostsView from "@/sections/PostsView";

export const metadata = { title: "Príspevky | SnapZoška" };

export default async function FeedPage() {
  const posts = await getPosts(); // Fetch posts using the service function

  return <PostsView posts={posts} />;
}
