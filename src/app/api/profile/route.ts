// src/app/api/profile/route.ts

import { prisma } from "@/app/api/auth/[...nextauth]/prisma";
import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function GET(req: NextRequest) {
  try {
    // 1) Authenticate
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    // 2) Fetch profile by userId
    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
    });

    if (!profile) {
      return NextResponse.json(
        { message: "Profile not found" },
        { status: 404 }
      );
    }

    // 3) Return profile
    return NextResponse.json({ profile });
  } catch (err) {
    console.error("Error fetching profile:", err);
    return NextResponse.json(
      { message: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const userId   = formData.get("userId")   as string;
    const avatar   = formData.get("avatar")   as File  | null;
    const location = formData.get("location") as string;
    const bio      = formData.get("bio")      as string;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required." },
        { status: 400 }
      );
    }

    let avatarUrl: string | null = null;
    if (avatar) {
      const key = `avatars/${userId}-${Date.now()}-${avatar.name}`;
      const { url } = await put(key, avatar.stream(), { access: "public" });
      console.log("⮕ Uploaded avatar to:", url);
      avatarUrl = url;
    }

    const newProfile = await prisma.profile.create({
      data: { userId, avatarUrl, location, bio },
    });

    return NextResponse.json({ profile: newProfile });
  } catch (error) {
    console.error("Error creating profile:", error);
    return NextResponse.json(
      { message: "An error occurred while creating the profile." },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    const userId   = formData.get("userId")   as string;
    const avatar   = formData.get("avatar")   as File  | null;
    const location = formData.get("location") as string;
    const bio      = formData.get("bio")      as string;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required." },
        { status: 400 }
      );
    }

    const dataToUpdate: {
      location: string;
      bio: string;
      avatarUrl?: string | null;
    } = { location, bio };

    if (avatar) {
      const key = `avatars/${userId}-${Date.now()}-${avatar.name}`;
      const { url } = await put(key, avatar.stream(), { access: "public" });
      console.log("⮕ Re‐uploaded avatar to:", url);
      dataToUpdate.avatarUrl = url;
    }

    const updatedProfile = await prisma.profile.update({
      where: { userId },
      data: dataToUpdate,
    });

    return NextResponse.json({ profile: updatedProfile });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { message: "An error occurred while updating the profile." },
      { status: 500 }
    );
  }
}
