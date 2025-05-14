export interface UserWithProfile {
    id: string;
    name: string | null;
    image: string | null;
    profile: {
      avatarUrl: string | null;
    } | null;
  }

  // types.d.ts

export interface User {
    id: string;
    name: string | null;
    image: string | null;
    avatarUrl?: string | null; // Flattened custom avatar
  }
  