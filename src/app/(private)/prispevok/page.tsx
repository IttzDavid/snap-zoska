export const dynamic = "force-dynamic";

import PostsView from "@/sections/PostsView";

export const metadata = { title: "Príspevky | SnapZoška" };

export default async function FeedPage() {
  
  return <PostsView />;

}
