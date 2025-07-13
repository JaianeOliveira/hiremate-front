import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useSetSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const setParam = useCallback(
    (key: string, value: string) => {
      if (!value) {
        removeParam(key);
        return;
      }

      const qs = createQueryString(key, value);
      router.push(`${pathname}?${qs}`);
    },
    [createQueryString, pathname, router]
  );

  const removeParam = useCallback(
    (key: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(key);
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router]
  );

  return {
    setParam,
    removeParam,
  };
};
