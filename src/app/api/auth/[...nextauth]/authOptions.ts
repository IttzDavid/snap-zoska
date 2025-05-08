// src/app/api/auth/[...nextauth]/authOptions.ts

import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github"; // Import GitHub provider
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }), // Add GitHub provider here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/prihlasenie",
    signOut: "/auth/odhlasenie",
  },
  callbacks: {
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Redirect to home page after sign-in
      return baseUrl || url;
    },
    async session({ session, user }) {
      // Add user ID to session
      if (user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
};