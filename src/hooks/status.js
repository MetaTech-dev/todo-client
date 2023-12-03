import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  requestCreateStatus,
  requestGetStatusList,
  requestRemoveStatus,
  requestUpdateStatus,
} from "../api/status";
import { enqueueSnackbar } from "notistack";
import { v4 as uuid } from "uuid";

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
    onMutate: async (newStatus) => {
      await queryClient.cancelQueries({ queryKey: ["statusList"] });
      const previousStatusList = queryClient.getQueryData(["statusList"]);
      queryClient.setQueryData(["statusList"], (old) => [
        ...old,
        { ...newStatus, id: uuid() },
      ]);
      return { previousStatusList };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["statusList"] });
    },
    onError: (error, newStatus, context) => {
      queryClient.setQueryData(["statusList"], context.previousStatusList);
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
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["statusList"] });
      const previousStatusList = queryClient.getQueryData(["statusList"]);
      queryClient.setQueryData(
        ["statusList"],
        previousStatusList.filter((status) => status.id !== id)
      );
      return { previousStatusList };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["statusList"] });
      enqueueSnackbar("Status removed successfully", { variant: "success" });
    },
    onError: (error, removedStatus, context) => {
      queryClient.setQueryData(["statusList"], context.previousStatusList);
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
    onMutate: async (updatedStatus) => {
      await queryClient.cancelQueries({
        queryKey: ["statusList", updatedStatus.id],
      });
      const previousStatus = queryClient.getQueryData([
        "statusList",
        updatedStatus.id,
      ]);
      queryClient.setQueryData(["statusList", updatedStatus.id], updatedStatus);
      return { previousStatus, updatedStatus };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["statusList"],
      });
    },
    onError: (error, updatedStatus, context) => {
      queryClient.setQueryData(
        ["statusList", updatedStatus.id],
        context.previousStatus
      );
      enqueueSnackbar(error.message || "An error occurred updating status", {
        variant: "error",
      });
    },
  });
};
