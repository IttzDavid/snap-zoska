// src/types/post.ts

import { Like } from "./like";

export interface Post {
  id: string;
  userId: string;
  caption?: string | null;
  createdAt: Date;
  updatedAt: Date;
  likes: Like[];
  comments: Comment[];
  user: {
    name: string | null;
    image: string | null;
  };
  images: { imageUrl: string }[];
}

export interface Comment {
  id: string;
  userId: string;
  postId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  edited: boolean;
  parentId: string | null;
  user: {
    name: string | null;
    image: string | null;
  };
}
