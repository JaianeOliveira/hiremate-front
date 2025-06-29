import MyAdapter from "@/lib/next-auth-adapter";
import { pages } from "@/utils/pages";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      accessToken?: string;
    };
  }
}

export const authOptions: AuthOptions = {
  adapter: MyAdapter(),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: pages.login,
    error: pages.login_error,
    signOut: pages.home,
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken as string;
      return session;
    },
  },
  debug: false,
  // logger: {
  //   error(code, metadata) {
  //     console.error("🔴 NextAuth error:", code, metadata);
  //   },
  //   warn(code) {
  //     console.warn("🟠 NextAuth warn:", code);
  //   },
  //   debug(code, metadata) {
  //     console.debug("🔵 NextAuth debug:", code, metadata);
  //   },
  // },
  // events: {
  //   async createUser(message) {
  //     console.log("📅 event createUser:", message);
  //   },
  //   async linkAccount(message) {
  //     console.log("📅 event linkAccount:", message);
  //   },
  //   async signIn(message) {
  //     console.log("📅 event signIn:", message);
  //   },
  //   async session(message) {
  //     console.log("📅 event session:", message);
  //   },
  // },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
