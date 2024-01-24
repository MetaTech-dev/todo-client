import { requestGetRoleList } from "../api/role";
import { enqueueSnackbar } from "notistack";
import { useAuthQuery } from "./auth";

// TODO: probably don't need this once using Clerk
export const useGetRoleList = () =>
  useAuthQuery({
    queryKey: ["roleList"],
    queryFn: requestGetRoleList,
    onError: (error) => {
      enqueueSnackbar(error.message || "An error occurred fetching roles", {
        variant: "error",
      });
    },
  });
