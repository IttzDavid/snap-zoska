//src/services/posts-services.ts

import { prisma } from "@/app/api/auth/[...nextauth]/prisma";
import { Post } from "@prisma/client"; // Import Post type for TypeScript

// Function to create a new post
export const createPost = async (imageUrl: string, caption: string, userId: string): Promise<Post> => {
    try {
      const payload = { imageUrl, caption, userId };
      console.log('Payload to create post:', payload); // Log the payload before Prisma call
      
      const newPost = await prisma.post.create({
        data: payload,
      });
      
      console.log('New post created:', newPost); // Log the created post
      return newPost; // Return the created post
    } catch (error) {
      console.error('Error creating post:', error); // Log the error details
      throw new Error("Failed to create post: " + (error as Error).message);
    }
  };
  
  

// Function to fetch all posts, including user details
export const getPosts = async (): Promise<Post[]> => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc", // Sort by most recent post
      },
      include: {
        user: true, // Include related user data
      },
    });
    return posts; // Return all posts
  } catch (error) {
    throw new Error("Failed to fetch posts: " + (error as Error).message);
  }
};

// Function to fetch a single post by ID
export const getPostById = async (postId: string): Promise<Post | null> => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true, // Include related user data
      },
    });
    return post; // Return the post or null if not found
  } catch (error) {
    throw new Error("Failed to fetch post: " + (error as Error).message);
  }
};

// Function to update a post by ID
export const updatePost = async (
  postId: string,
  imageUrl: string,
  caption: string
): Promise<Post> => {
  try {
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        imageUrl,
        caption,
      },
    });
    return updatedPost; // Return the updated post
  } catch (error) {
    throw new Error("Failed to update post: " + (error as Error).message);
  }
};

// Function to delete a post by ID
export const deletePost = async (postId: string): Promise<void> => {
  try {
    await prisma.post.delete({
      where: { id: postId },
    });
  } catch (error) {
    throw new Error("Failed to delete post: " + (error as Error).message);
  }
};
