// src/app/api/posts/route.ts
import { createPost } from "@/services/posts-services";

// In your src/app/api/posts/route.ts file
export async function POST(req: Request) {
    const data = await req.json();
    console.log('Request Body:', data); // Log the body to confirm it's what you expect
    
    try {
      const post = await createPost(data.imageUrl, data.caption, data.userId);
      return new Response(JSON.stringify(post), { status: 201 });
    } catch (error: unknown) {
      console.error('Error in POST /api/posts:', error); // Log the error details
      if (error instanceof Error) {
        return new Response(
          JSON.stringify({ message: "Failed to create post", error: error.message }),
          { status: 500 }
        );
      }
      return new Response(
        JSON.stringify({ message: "An unknown error occurred" }),
        { status: 500 }
      );
    }
  }
  
  