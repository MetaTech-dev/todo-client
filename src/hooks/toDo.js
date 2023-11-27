import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { createToDo, getToDoList, removeToDo, updateToDo } from "../api/toDo";
import { enqueueSnackbar } from "notistack";

export const useGetToDoList = () => {
  return useQuery({
    queryKey: ["toDoList"],
    queryFn: getToDoList,
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
    mutationFn: createToDo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["toDoList"] });
    },
    onError: (error) => {
      enqueueSnackbar(error.message || "An error occurred creating toDo", {
        variant: "error",
      });
    },
  });
};

export const useRemoveToDo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeToDo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["toDoList"] });
      enqueueSnackbar("ToDo removed successfully", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(error.message || "An error occurred removing toDo", {
        variant: "error",
      });
    },
  });
};

export const useUpdateToDo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateToDo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["toDoList"] });
    },
    onError: (error) => {
      enqueueSnackbar(error.message || "An error occurred updating toDo", {
        variant: "error",
      });
    },
  });
};
