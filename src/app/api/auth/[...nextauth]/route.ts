import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
