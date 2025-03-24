import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

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
          const res = await axios.post(
            `${process.env.NEST_API_URL}/auth/login`,
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );

          const user = res.data;
          if (user && user.accessToken) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              token: user.accessToken,
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
    async jwt({ token }) {
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
