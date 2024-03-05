import { requestGetRoleList } from "../api/role";
import { enqueueSnackbar } from "notistack";
import { useAuthQuery } from "./auth";

// deprecated
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
