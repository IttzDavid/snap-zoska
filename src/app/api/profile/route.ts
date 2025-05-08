// arc/app/api/profile/route.ts

import { prisma } from "@/app/api/auth/[...nextauth]/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const userId = formData.get("userId") as string;
    const image = formData.get("imageUrl") as string;
    const location = formData.get("location") as string;
    const bio = formData.get("bio") as string;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required." },
        { status: 400 }
      );
    }

    const newProfile = await prisma.profile.create({
      data: {
        userId,
        avatarUrl: image,
        location,
        bio,
      },
    });

    console.log("New Profile Created: ", newProfile);
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
    const body = await req.json(); // Parse JSON body
    const userId = body.userId;
    const location = body.location;
    const bio = body.bio;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required." },
        { status: 400 }
      );
    }

    const updatedProfile = await prisma.profile.update({
      where: { userId },
      data: {
        location,
        bio,
      },
    });

    console.log("Profile Updated: ", updatedProfile);
    return NextResponse.json({ profile: updatedProfile });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { message: "An error occurred while updating the profile." },
      { status: 500 }
    );
  }
}