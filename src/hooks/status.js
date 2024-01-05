import { useAuth0 } from "@auth0/auth0-react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  requestCreateStatus,
  requestGetStatusList,
  requestRemoveStatus,
  requestUpdateStatus,
  requestUpdateStatusList,
} from "../api/status";
import { enqueueSnackbar } from "notistack";
import { v4 as uuid } from "uuid";

export const useGetStatusList = () => {
  const { getAccessTokenSilently } = useAuth0();

  return useQuery({
    queryKey: ["statusList"],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently({ cacheMode: "off" });
      return requestGetStatusList({ accessToken });
    },
    onError: (error) => {
      enqueueSnackbar(error.message || "An error occurred fetching statuses", {
        variant: "error",
      });
    },
  });
};

export const useCreateStatus = () => {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();

  return useMutation({
    mutationFn: async (status) => {
      const accessToken = await getAccessTokenSilently({ cacheMode: "off" });
      return requestCreateStatus({ accessToken, status });
    },
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
  const { getAccessTokenSilently } = useAuth0();

  return useMutation({
    mutationFn: async (id) => {
      const accessToken = await getAccessTokenSilently({ cacheMode: "off" });
      return requestRemoveStatus({ accessToken, id });
    },
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
  const { getAccessTokenSilently } = useAuth0();

  return useMutation({
    mutationFn: async (status) => {
      const accessToken = await getAccessTokenSilently({ cacheMode: "off" });
      return requestUpdateStatus({ accessToken, status });
    },
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
  const { getAccessTokenSilently } = useAuth0();

  return useMutation({
    mutationFn: async (statusList) => {
      const accessToken = await getAccessTokenSilently({ cacheMode: "off" });
      return requestUpdateStatusList({ accessToken, statusList });
    },
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
