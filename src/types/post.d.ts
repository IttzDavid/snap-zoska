// src/types/post.ts

import { Like } from "./like";

export interface Post {
  id: string;
  userId: string;
  caption?: string | null;
  createdAt: Date;
  updatedAt: Date;
  likes: Like[];
  user: {
    name: string | null;
    image: string | null;
  };
  images: { imageUrl: string }[];
}