// src/app/api/posts/route.ts

import { prisma } from "@/app/api/auth/[...nextauth]/prisma";
import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const caption = formData.get("caption") as string;
    const userId = formData.get("userId") as string;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required." },
        { status: 400 }
      );
    }

    // Vytvorenie príspevku s prázdnym `tags`, bez likes/comments atď.
    const newPost = await prisma.post.create({
      data: {
        userId,
        caption: caption || "",
        tags: [], // predvolené prázdne pole
      },
    });

    // Získanie obrázkov z formData (tu môžeme predpokladať, že obrázky sa spracujú neskôr)
    const files = formData.getAll("images") as File[];
    const imageRecords = [];

    // Pre každý obrázok
    for (let i = 0; i < files.length; i++) {
      const image = files[i];

      // Nahráme obrázok do Vercel Blob a získame URL
      const fileBuffer = image.stream(); // Získame stream obrázka
      const { url } = await put(image.name, fileBuffer, { access: "public" });

      // Vytvoríme záznam v `PostImage` s URL obrázku
      const postImage = await prisma.postImage.create({
        data: {
          postId: newPost.id,
          imageUrl: url, // Ukladáme verejnú URL obrázku z Vercel Blob
          order: i, // Poradie obrázka
        },
      });
      imageRecords.push(postImage);
    }

    console.log("New Post Created: ", newPost);
    console.log("Images associated with the post: ", imageRecords);

    return NextResponse.json({ post: newPost, images: imageRecords });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { message: "An error occurred while creating the post." },
      { status: 500 }
    );
  }
}