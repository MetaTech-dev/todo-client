import { useQueryClient } from "@tanstack/react-query";
import {
  requestCreateStatus,
  requestGetOneStatus,
  requestGetStatusList,
  requestRemoveStatus,
  requestUpdateStatus,
  requestUpdateStatusList,
} from "../api/status";
import { enqueueSnackbar } from "notistack";
import { v4 as uuid } from "uuid";
import { useAuthMutation, useAuthQuery } from "./auth";

export const useGetStatusList = () =>
  useAuthQuery({
    queryKey: ["statusList"],
    queryFn: requestGetStatusList,
    onError: (error) => {
      enqueueSnackbar(error.message || "An error occurred fetching statuses", {
        variant: "error",
      });
    },
  });

export const useGetOneStatus = (data) =>
  useAuthQuery({
    data,
    queryKey: ["status", data.id],
    queryFn: async (params) => requestGetOneStatus(params),
    onError: (error) => {
      enqueueSnackbar(error.message || "An error occurred fetching status", {
        variant: "error",
      });
    },
    enabled: Boolean(data.id),
  });

export const useCreateStatus = () => {
  const queryClient = useQueryClient();

  return useAuthMutation({
    mutationFn: async (params) => requestCreateStatus(params),
    onMutate: async (newStatus) => {
      await queryClient.cancelQueries({ queryKey: ["statusList"] });
      const previousStatusList = queryClient.getQueryData(["statusList"]);
      queryClient.setQueryData(["statusList"], (old) => [
        ...old,
        { ...newStatus, id: uuid(), position: previousStatusList.length + 1 },
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

  return useAuthMutation({
    mutationFn: async (params) => requestRemoveStatus(params),
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

  return useAuthMutation({
    mutationFn: async (params) => requestUpdateStatus(params),
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

export const useUpdateStatusList = () => {
  const queryClient = useQueryClient();

  return useAuthMutation({
    mutationFn: async (params) => requestUpdateStatusList(params),
    onMutate: async (updatedStatusList) => {
      await queryClient.cancelQueries({
        queryKey: ["statusList"],
      });
      const previousStatusList = queryClient.getQueryData(["statusList"]);
      queryClient.setQueryData(["statusList"], updatedStatusList);
      return { previousStatusList, updatedStatusList };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["statusList"],
      });
    },
    onError: (error, updatedStatusList, context) => {
      queryClient.setQueryData(["statusList"], context.previousStatusList);
      enqueueSnackbar(
        error.message || "An error occurred updating status list",
        {
          variant: "error",
        }
      );
    },
  });
};
