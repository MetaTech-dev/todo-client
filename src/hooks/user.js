import { useAuth0 } from "@auth0/auth0-react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import {
  requestGetUserList,
  requestGetOneUser,
  requestUpdateUser,
  requestUpdateUserRoles,
} from "../api/user";

export const useGetUserList = () => {
  const { getAccessTokenSilently } = useAuth0();

  return useQuery({
    queryKey: ["userList"],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently();
      return requestGetUserList({ accessToken });
    },
    onError: (error) => {
      enqueueSnackbar(error.message || "An error occurred fetching users", {
        variant: "error",
      });
    },
  });
};

export const useGetOneUser = (id) => {
  const { getAccessTokenSilently } = useAuth0();

  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently();
      return requestGetOneUser({ id, accessToken });
    },
    onError: (error) => {
      enqueueSnackbar(error.message || "An error occurred fetching user", {
        variant: "error",
      });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();

  return useMutation({
    mutationFn: async ({ userId, body }) => {
      const accessToken = await getAccessTokenSilently();
      return requestUpdateUser({
        userId,
        accessToken,
        body,
      });
    },
    onMutate: async (updatedUser) => {
      await queryClient.cancelQueries({
        queryKey: ["user", updatedUser.user_id],
      });
      const previousUser = queryClient.getQueryData([
        "user",
        updatedUser.user_id,
      ]);
      queryClient.setQueryData(["user", updatedUser.user_id], updatedUser);
      return { previousUser, updatedUser };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userList"] });
    },
    onError: (error, updatedUser, context) => {
      queryClient.setQueryData(
        ["userList", updatedUser.user_id],
        context.previousUser
      );
      enqueueSnackbar(error.message || "An error occurred updating user", {
        variant: "error",
      });
    },
  });
};

export const useUpdateUserRoles = () => {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();

  return useMutation({
    mutationFn: async ({ userId, roles }) => {
      //   console.log("roles", roles);
      const accessToken = await getAccessTokenSilently();
      return requestUpdateUserRoles({ accessToken, roles, userId });
    },
    onMutate: async (updatedUser) => {
      await queryClient.cancelQueries({
        queryKey: ["user", updatedUser.user_id],
      });
      const previousUser = queryClient.getQueryData([
        "user",
        updatedUser.user_id,
      ]);
      queryClient.setQueryData(["user", updatedUser.user_id], updatedUser);
      return { previousUser, updatedUser };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userList"] });
    },
    onError: (error, updatedUser, context) => {
      queryClient.setQueryData(
        ["userList", updatedUser.user_id],
        context.previousUser
      );
      enqueueSnackbar(
        error.message || "An error occurred updating user roles",
        {
          variant: "error",
        }
      );
    },
  });
};
