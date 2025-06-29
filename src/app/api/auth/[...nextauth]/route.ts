import MyAdapter from "@/lib/next-auth-adapter";
import { pages } from "@/utils/pages";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  adapter: MyAdapter(),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: pages.login,
    error: pages.login_error,
    signOut: pages.home,
  },
  debug: true,
  logger: {
    error(code, metadata) {
      console.error("🔴 NextAuth error:", code, metadata);
    },
    warn(code) {
      console.warn("🟠 NextAuth warn:", code);
    },
    debug(code, metadata) {
      console.debug("🔵 NextAuth debug:", code, metadata);
    },
  },
  events: {
    async createUser(message) {
      console.log("📅 event createUser:", message);
    },
    async linkAccount(message) {
      console.log("📅 event linkAccount:", message);
    },
    async signIn(message) {
      console.log("📅 event signIn:", message);
    },
    async session(message) {
      console.log("📅 event session:", message);
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
