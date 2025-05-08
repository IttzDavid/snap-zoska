// src/app/(private)/profil/page.tsx

import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

export const metadata = { title: "Profil | ZoškaSnap" };

export default async function ProfileList() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect(`/profil/${session.user.id}`);
  } else {
    redirect("/auth/prihlasenie");
  }
}