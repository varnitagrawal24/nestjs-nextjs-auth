import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "@/services/auth.service";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await login({
            email: credentials?.email ?? "",
            password: credentials?.password ?? "",
          });

          if (!res.success) return null;

          const user = res.data;
          if (user && user.accessToken) {
            return {
              id: user.id,
              username: user.username,
              email: user.email,
              accessToken: user.accessToken,
            };
          }

          return null;
        } catch (error) {
          console.error("Login Error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id,
        username: token.username,
        email: token.email,
        accessToken: token.accessToken,
      };
      return session;
    },
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
