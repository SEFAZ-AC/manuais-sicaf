import { authGetUser } from "@/services/userService";
import { isPasswordValid } from "@/utils/handlePasswordHash";
import { loginSchema } from "@/utils/validators";
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60 * 1, // 1 dia
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/",
    error: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credenciais SICAF",
      credentials: {
        username: {},
        password: {},
      },
      //@ts-ignore
      async authorize(credentials: any, req) {
        const verify = loginSchema.safeParse(credentials);
        if (!verify.success) {
          return null;
        }
        const user = await authGetUser(credentials.username);
        if (!user) {
          return null;
        }
        const validPassword = await isPasswordValid(
          credentials.password,
          user.password
        );
        if (!validPassword) {
          return null;
        }
        return {
          id: user.id,
          username: user.username,
          name: user.name,
          avatar: user.avatar,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as User;
      return session;
    },
  },
};
