import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  requestCreateToDo,
  requestGetToDoList,
  requestRemoveToDo,
  requestUpdateToDo,
} from "../api/toDo";
import { enqueueSnackbar } from "notistack";

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
    mutationFn: requestRemoveToDo,
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
    mutationFn: requestUpdateToDo,
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
