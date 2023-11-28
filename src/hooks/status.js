import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  requestCreateStatus,
  requestGetStatusList,
  requestRemoveStatus,
  requestUpdateStatus,
} from "../api/status";
import { enqueueSnackbar } from "notistack";

export const useGetStatusList = () => {
  return useQuery({
    queryKey: ["statusList"],
    queryFn: requestGetStatusList,
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
    mutationFn: requestCreateStatus,
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
    mutationFn: requestRemoveStatus,
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

export const useUpdateStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: requestUpdateStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["statusList"] });
    },
    onError: (error) => {
      enqueueSnackbar(error.message || "An error occurred updating status", {
        variant: "error",
      });
    },
  });
};
