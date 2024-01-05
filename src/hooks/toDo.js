import { useAuth0 } from "@auth0/auth0-react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  requestCreateToDo,
  requestGetToDoList,
  requestRemoveToDo,
  requestUpdateToDo,
  requestUpdateToDoList,
} from "../api/toDo";
import { enqueueSnackbar } from "notistack";
import { v4 as uuid } from "uuid";

export const useGetToDoList = () => {
  const { getAccessTokenSilently } = useAuth0();

  return useQuery({
    queryKey: ["toDoList"],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently({ cacheMode: "off" });
      return requestGetToDoList({ accessToken });
    },
    onError: (error) => {
      enqueueSnackbar(error.message || "An error occurred fetching toDos", {
        variant: "error",
      });
    },
  });
};

export const useCreateToDo = () => {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();

  return useMutation({
    mutationFn: async (toDo) => {
      const accessToken = await getAccessTokenSilently({ cacheMode: "off" });
      return requestCreateToDo({ accessToken, toDo });
    },
    onMutate: async (toDo) => {
      await queryClient.cancelQueries({ queryKey: ["toDoList"] });
      const previousToDoList = queryClient.getQueryData(["toDoList"]);
      queryClient.setQueryData(["toDoList"], (old) => [
        ...old,
        { ...toDo, id: uuid() },
      ]);
      return { previousToDoList };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["toDoList"] });
    },
    onError: (error, toDo, context) => {
      queryClient.setQueryData(["toDoList"], context.previousToDoList);
      enqueueSnackbar(error.message || "An error occurred creating toDo", {
        variant: "error",
      });
    },
  });
};

export const useRemoveToDo = () => {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();

  return useMutation({
    mutationFn: async (id) => {
      const accessToken = await getAccessTokenSilently({ cacheMode: "off" });
      return requestRemoveToDo({ accessToken, id });
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["toDoList"] });
      const previousToDoList = queryClient.getQueryData(["toDoList"]);
      queryClient.setQueryData(
        ["toDoList"],
        previousToDoList.filter((toDo) => toDo.id !== id)
      );
      return { previousToDoList };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["toDoList"] });
      enqueueSnackbar("ToDo removed successfully", { variant: "success" });
    },
    onError: (error, removedToDo, context) => {
      queryClient.setQueryData(["toDoList"], context.previousToDoList);
      enqueueSnackbar(error.message || "An error occurred removing toDo", {
        variant: "error",
      });
    },
  });
};

export const useUpdateToDo = () => {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();

  return useMutation({
    mutationFn: async (toDo) => {
      const accessToken = await getAccessTokenSilently({ cacheMode: "off" });
      return requestUpdateToDo({ accessToken, toDo });
    },
    onMutate: async (updatedToDo) => {
      await queryClient.cancelQueries({
        queryKey: ["toDoList", updatedToDo.id],
      });
      const previousToDo = queryClient.getQueryData([
        "toDoList",
        updatedToDo.id,
      ]);
      queryClient.setQueryData(["toDoList", updatedToDo.id], updatedToDo);
      return { previousToDo };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["toDoList"] });
    },
    onError: (error, updatedToDo, context) => {
      queryClient.setQueryData(
        ["toDoList", updatedToDo.id],
        context.previousToDo
      );
      enqueueSnackbar(error.message || "An error occurred updating toDo", {
        variant: "error",
      });
    },
  });
};

export const useUpdateToDoList = () => {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();

  return useMutation({
    mutationFn: async (toDoList) => {
      const accessToken = await getAccessTokenSilently({ cacheMode: "off" });
      return requestUpdateToDoList({ accessToken, toDoList });
    },
    onMutate: async (updatedToDoList) => {
      await queryClient.cancelQueries({ queryKey: ["toDoList"] });
      const previousToDoList = queryClient.getQueryData(["toDoList"]);
      queryClient.setQueryData(["toDoList"], updatedToDoList);
      return { previousToDoList };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["toDoList"] });
    },
    onError: (error, updatedToDoList, context) => {
      queryClient.setQueryData(["toDoList"], context.previousToDoList);
      enqueueSnackbar(error.message || "An error occurred updating toDo list", {
        variant: "error",
      });
    },
  });
};
