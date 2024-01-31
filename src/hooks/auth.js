import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";

export function useAuthQuery({ queryFn, data, ...restOptions }) {
  const { getToken } = useAuth();

  return useQuery({
    ...restOptions,
    queryFn: async () => queryFn({ data, token: await getToken() }),
  });
}

export function useAuthMutation({ mutationFn, ...restOptions }) {
  const { getToken } = useAuth();

  return useMutation({
    ...restOptions,
    mutationFn: async (data) => {
      mutationFn({
        data,
        token: await getToken(),
      });
    },
  });
}
