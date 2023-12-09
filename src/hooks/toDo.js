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
  return useQuery({
    queryKey: ["toDoList"],
    queryFn: requestGetToDoList,
    onError: (error) => {
      enqueueSnackbar(error.message || "An error occurred fetching toDos", {
        variant: "error",
      });
    },
  });
};

export const useCreateToDo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: requestCreateToDo,
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
  return useMutation({
    mutationFn: requestRemoveToDo,
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
  return useMutation({
    mutationFn: requestUpdateToDo,
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
  return useMutation({
    mutationFn: requestUpdateToDoList,
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
