import { createUserService } from "@/services/auth/create-user";
import { deleteUserService } from "@/services/auth/delete-user";
import { getUserService } from "@/services/auth/get-user";
import { getUserByAccountService } from "@/services/auth/get-user-by-account";
import { linkingAccountService } from "@/services/auth/linking-account";
import { updateUserService } from "@/services/auth/update-user";
import { Adapter, AdapterAccount, AdapterUser } from "next-auth/adapters";

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
  };
}
