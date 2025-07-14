"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/axios";
import { serviceQueryKeys } from "@/utils/service-query-keys";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useQuery } from "@tanstack/react-query";

const MINUTE = 1000 * 60 * 60;

export const UserInfoStateful = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: [serviceQueryKeys.getUserInfo],
    queryFn: () => api.get("/users/me"),
    gcTime: MINUTE,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
        <Skeleton className="h-8 w-8" />
        <div>
          <Skeleton className="h-2 w-32" />
          <Skeleton className="h-2 w-64" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
      <Avatar>
        <AvatarImage src={user?.data?.avatar || ""} alt={user?.data?.name} />
        <AvatarFallback>{user?.data?.name[0]}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-semibold">{user?.data?.name}</p>
        <p className="text-xs text-muted-foreground truncate">
          {user?.data?.email}
        </p>
      </div>
    </div>
  );
};
