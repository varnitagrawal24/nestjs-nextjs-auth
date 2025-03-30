import NextAuth, { DefaultSession, DefaultUser, JWT } from "next-auth";

// ✅ Extend User Type
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: DefaultSession["user"] & {
      username?: string;
      accessToken?: string;
      id?: string;
      email?: string;
      accessToken?: string;
    };
  }

  interface User extends DefaultUser {
    username?: string;
    accessToken?: string;
    id?: string;
    email?: string;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    username?: string;
    email?: string;
    accessToken?: string;
  }
}
