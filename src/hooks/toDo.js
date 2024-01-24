import { useQueryClient } from "@tanstack/react-query";
import {
  requestCreateToDo,
  requestGetOneToDo,
  requestGetToDoList,
  requestRemoveToDo,
  requestUpdateToDo,
  requestUpdateToDoList,
} from "../api/toDo";
import { enqueueSnackbar } from "notistack";
import { v4 as uuid } from "uuid";
import { useAuthMutation, useAuthQuery } from "./auth";

export const useGetToDoList = () =>
  useAuthQuery({
    queryKey: ["toDoList"],
    queryFn: requestGetToDoList,
    onError: (error) => {
      enqueueSnackbar(error.message || "An error occurred fetching toDos", {
        variant: "error",
      });
    },
  });

export const useGetOneToDo = (data) =>
  useAuthQuery({
    data,
    queryKey: ["toDo", data.id],
    queryFn: requestGetOneToDo,
    onError: (error) => {
      enqueueSnackbar(error.message || "An error occurred fetching toDo", {
        variant: "error",
      });
    },
    enabled: Boolean(data.id),
  });

export const useCreateToDo = () => {
  const queryClient = useQueryClient();

  return useAuthMutation({
    mutationFn: async (params) => requestCreateToDo(params),
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

  return useAuthMutation({
    mutationFn: async (params) => requestRemoveToDo(params),
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

  return useAuthMutation({
    mutationFn: async (params) => requestUpdateToDo(params),
    onMutate: async (updatedToDo) => {
      // Cancel ongoing refetches for the queries
      await queryClient.cancelQueries(["toDoList"]);
      await queryClient.cancelQueries(["toDo", updatedToDo.id]);

      // Snapshot the previous values
      const previousToDoList = queryClient.getQueryData(["toDoList"]);
      const previousToDo = queryClient.getQueryData(["toDo", updatedToDo.id]);

      // Optimistically update the individual toDo item
      queryClient.setQueryData(["toDo", updatedToDo.id], updatedToDo);

      // Optimistically update the toDoList
      if (previousToDoList) {
        queryClient.setQueryData(
          ["toDoList"],
          previousToDoList.map((toDo) =>
            toDo.id === updatedToDo.id ? { ...toDo, ...updatedToDo } : toDo
          )
        );
      }

      return { previousToDoList, previousToDo };
    },
    onSuccess: (toDo) => {
      queryClient.invalidateQueries({ queryKey: ["toDoList"] });
      queryClient.invalidateQueries({ queryKey: ["toDo", toDo.id] });
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

  return useAuthMutation({
    mutationFn: async (params) => requestUpdateToDoList(params),
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
