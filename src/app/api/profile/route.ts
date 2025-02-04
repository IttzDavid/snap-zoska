// src/app/api/profile/route.ts
import { NextResponse } from "next/server";
import { getUserProfile } from "@/services/profile-services"; // Import the getUserProfile function

export async function GET() {
  try {
    const userProfile = await getUserProfile(); // Call the profile service function
    if (!userProfile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userProfile); // Return the user profile data
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json({ error: "Failed to fetch user profile" }, { status: 500 });
  }
}
