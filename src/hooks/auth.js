import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth, useOrganization } from "@clerk/clerk-react";

export function useAuthQuery({ queryFn, data, ...restOptions }) {
  const { getToken } = useAuth();
  const { organization } = useOrganization();

  return useQuery({
    ...restOptions,
    queryFn: async () =>
      queryFn({ data, token: await getToken(), orgId: organization?.id }),
  });
}

export function useAuthMutation({ mutationFn, ...restOptions }) {
  const { getToken } = useAuth();
  const { organization } = useOrganization();

  return useMutation({
    ...restOptions,
    mutationFn: async (data) =>
      mutationFn({
        data,
        token: await getToken(),
        orgId: organization?.id,
      }),
  });
}
