import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { createStatus, getStatusList, removeStatus } from "../api/status";
import { enqueueSnackbar } from "notistack";

export const useGetStatusList = () => {
  return useQuery({
    queryKey: ["statusList"],
    queryFn: getStatusList,
    onError: (error) => {
      enqueueSnackbar(error.message || "An error occurred fetching statuses", {
        variant: "error",
      });
    },
  });
};

export const useCreateStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["statusList"] });
    },
    onError: (error) => {
      enqueueSnackbar(error.message || "An error occurred creating status", {
        variant: "error",
      });
    },
  });
};

export const useRemoveStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["statusList"] });
      enqueueSnackbar("Status removed successfully", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(error.message || "An error occurred removing status", {
        variant: "error",
      });
    },
  });
};
