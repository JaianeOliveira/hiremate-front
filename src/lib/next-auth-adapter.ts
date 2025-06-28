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
    async createUser(user: AdapterUser): Promise<AdapterUser> {
      users.push(user);

      return user;
    },
    async getUser(id: string): Promise<AdapterUser | null> {
      const user = users.find((u) => u.id === id);

      return user || null;
    },
    async getUserByAccount({ providerAccountId }): Promise<AdapterUser | null> {
      const account = accounts.find(
        (a) => a.providerAccountId === providerAccountId
      );

      const user = users.find((u) => u.id === account?.userId);

      return user || null;
    },
    async getUserByEmail(email: string): Promise<AdapterUser | null> {
      const user = users.find((u) => u.email === email);

      return user || null;
    },

    async deleteUser(userId: string) {
      const userIndex = users.findIndex((u) => u.id === userId);
      users.splice(userIndex, 1);
    },
    async updateUser(user): Promise<AdapterUser> {
      const userIndex = users.findIndex((u) => u.id === user.id);
      const oldUser = users[userIndex];
      const newUser = {
        ...oldUser,
        ...user,
      };

      users[userIndex] = newUser;

      return newUser || undefined;
    },

    async linkAccount(account: AdapterAccount) {
      accounts.push(account);
    },

    async createSession(session: AdapterSession): Promise<AdapterSession> {
      sessions.push(session);

      return session;
    },

    async getSessionAndUser(
      sessionToken: string
    ): Promise<{ user: AdapterUser; session: AdapterSession } | null> {
      const session = sessions.find((s) => s.sessionToken === sessionToken);
      const user = users.find((u) => u.id === session?.userId);

      if (!session || !user) return null;

      return {
        session,
        user,
      };
    },

    async updateSession(
      session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">
    ): Promise<undefined | null | AdapterSession> {
      const oldSessionIndex = sessions.findIndex(
        (s) => s.sessionToken === session.sessionToken
      );
      const oldSession = sessions[oldSessionIndex];
      const newSession = {
        ...oldSession,
        ...session,
      };
      sessions[oldSessionIndex] = newSession;

      return newSession;
    },

    async deleteSession(sessionToken: string) {
      const sessionIndex = sessions.findIndex(
        (s) => s.sessionToken === sessionToken
      );

      sessions.splice(sessionIndex, 1);
    },
  };
}
