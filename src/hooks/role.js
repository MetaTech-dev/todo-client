import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { requestGetRoleList } from "../api/role";
import { enqueueSnackbar } from "notistack";

export const useGetRoleList = () => {
  const { getAccessTokenSilently } = useAuth0();

  return useQuery({
    queryKey: ["roleList"],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently();
      return requestGetRoleList({ accessToken });
    },
    onError: (error) => {
      enqueueSnackbar(error.message || "An error occurred fetching roles", {
        variant: "error",
      });
    },
  });
};
