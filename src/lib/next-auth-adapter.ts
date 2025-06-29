import { createSessionService } from "@/services/auth/create-session";
import { createUserService } from "@/services/auth/create-user";
import { deleteSessionService } from "@/services/auth/delete-session";
import { deleteUserService } from "@/services/auth/delete-user";
import { getSessionAndUserService } from "@/services/auth/get-session-and-user";
import { getUserService } from "@/services/auth/get-user";
import { getUserByAccountService } from "@/services/auth/get-user-by-account";
import { linkingAccountService } from "@/services/auth/linking-account";
import { updateSessionService } from "@/services/auth/update-session";
import { updateUserService } from "@/services/auth/update-user";
import {
  Adapter,
  AdapterAccount,
  AdapterSession,
  AdapterUser,
  VerificationToken,
} from "next-auth/adapters";

const users: AdapterUser[] = [];
const sessions: AdapterSession[] = [];
const accounts: AdapterAccount[] = [];
const verificationTokens: VerificationToken[] = [];

export default function MyAdapter(): Adapter {
  return {
    async createUser(user: AdapterUser) {
      const { data } = await createUserService(user);
      return data;
    },
    async getUser(id: string): Promise<AdapterUser | null> {
      try {
        const { data } = await getUserService({ id });
        return data;
      } catch (err: any) {
        if (err.response?.status === 404) return null;
        throw err;
      }
    },

    async getUserByAccount({
      provider,
      providerAccountId,
    }): Promise<AdapterUser | null> {
      try {
        const { data } = await getUserByAccountService({
          provider,
          providerAccountId,
        });
        return data;
      } catch (err: any) {
        if (err.response?.status === 404) return null;
        throw err;
      }
    },

    async getUserByEmail(email: string): Promise<AdapterUser | null> {
      try {
        const { data } = await getUserService({ email });
        return data;
      } catch (err: any) {
        if (err.response?.status === 404) return null;
        throw err;
      }
    },

    async deleteUser(userId: string) {
      await deleteUserService(userId);
    },

    async updateUser(user: Partial<AdapterUser> & Pick<AdapterUser, "id">) {
      try {
        const { data } = await updateUserService({
          id: user.id,
          data: user,
        });

        return data;
      } catch (err: any) {
        if (err.response?.status === 404) return null;
        throw err;
      }
    },

    async linkAccount(account: AdapterAccount) {
      try {
        const { data } = await linkingAccountService({ data: account });
        return data;
      } catch (err: any) {
        if (err.response?.status === 404) return null;
        throw err;
      }
    },

    async createSession(session: AdapterSession) {
      try {
        const { data } = await createSessionService({
          data: session,
        });
        return { ...data, expires: new Date(data.expires) };
      } catch (err: any) {
        if (err.response?.status === 404) return null;
        throw err;
      }
    },

    async getSessionAndUser(
      sessionToken: string
    ): Promise<{ user: AdapterUser; session: AdapterSession } | null> {
      try {
        const { data } = await getSessionAndUserService({ sessionToken });
        return {
          ...data,
          session: { ...data.session, expires: new Date(data.session.expires) },
        };
      } catch (err: any) {
        if (err.response?.status === 404) {
          return null;
        }
        throw err;
      }
    },

    async updateSession(
      session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">
    ): Promise<undefined | null | AdapterSession> {
      try {
        const { data } = await updateSessionService({
          sessionToken: session.sessionToken,
          data: session,
        });
        return { ...data, expires: new Date(data.expires) };
      } catch (err: any) {
        if (err.response?.status === 404) return null;
        throw err;
      }
    },

    async deleteSession(sessionToken: string) {
      try {
        await deleteSessionService({ sessionToken });
      } catch (err: any) {
        if (err.response?.status === 404) return null;
        throw err;
      }
    },
  };
}
