import NextAuth, { DefaultSession, DefaultUser, JWT } from "next-auth";

// ✅ Extend User Type
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: DefaultSession["user"] & {
      id?: string;
    };
  }

  interface User extends DefaultUser {
    token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
