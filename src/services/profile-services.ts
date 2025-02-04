import { prisma } from "@/app/api/auth/[...nextauth]/prisma";
import { User } from "@prisma/client";
import { getSession } from "next-auth/react";

// Function to fetch the profile of the current logged-in user
export const getUserProfile = async (): Promise<User | null> => {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      throw new Error("No user found");
    }

    // Fetch user based on email and select all fields
    const userProfile = await prisma.user.findUnique({
      where: { email: session.user.email }, // Fetch based on email
    });

    return userProfile;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw new Error("Failed to fetch user profile: " + (error as Error).message);
  }
};
