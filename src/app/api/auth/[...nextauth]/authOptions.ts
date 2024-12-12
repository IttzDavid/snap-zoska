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
  debug: true, // Enable/disable detailed logging
  pages: {
    signIn: "/auth/prihlasenie",
    signOut: "/auth/odhlasenie",
  },
  callbacks: {
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Redirect to home page after sign-in
      return baseUrl || url; // baseUrl is automatically set from NEXTAUTH_URL in .env
    },
    async signIn({ account, profile }) {
      if (!account || !profile) return false;

      // Check if the user already exists based on email
      const existingUser = await prisma.user.findUnique({
        where: { email: profile.email },
      });

      if (existingUser) {
        // Check if the account for the provider already exists for this user
        const linkedAccount = await prisma.account.findFirst({
          where: {
            userId: existingUser.id,
            provider: account.provider,
          },
        });

        if (!linkedAccount) {
          // If the account does not exist, link it
          await prisma.account.create({
            data: {
              userId: existingUser.id,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              type: account.type,
              refresh_token: account.refresh_token,
              access_token: account.access_token,
              expires_at: account.expires_at,
            },
          });
        }
      }

      return true; // Proceed with sign-in
    },
  },
};
