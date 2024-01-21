import { useQuery, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import {
  requestGetUserList,
  requestGetOneUser,
  requestUpdateUser,
  requestUpdateUserRole,
} from "../api/user";
import { useAuthMutation, useAuthQuery } from "./auth";
import { useOrganization, useUser } from "@clerk/clerk-react";

export const useGetCurrentUser = () => {
  const { user: authUser } = useUser();

  const { data: organizationMemberships } = useQuery({
    queryKey: ["organizationMemberships", authUser?.id],
    queryFn: async () => authUser.getOrganizationMemberships(),
    onError: (error) => {
      enqueueSnackbar(
        error.message || "An error occurred fetching organization memberships",
        {
          variant: "error",
        }
      );
    },
    enabled: Boolean(authUser?.id),
  });

  return authUser
    ? {
        user: {
          ...authUser,
          permissions: organizationMemberships?.[0]?.permissions || [],
          role: organizationMemberships?.[0]?.role || "",
        },
      }
    : {};
};

export const useGetUserList = () => {
  const { organization } = useOrganization();

  return useAuthQuery({
    queryKey: ["userList"],
    queryFn: requestGetUserList,
    onError: (error) => {
      enqueueSnackbar(error.message || "An error occurred fetching users", {
        variant: "error",
      });
    },
    enabled: Boolean(organization?.id),
  });
};
export const useGetOneUser = (data) =>
  useAuthQuery({
    data,
    queryKey: ["user", data.id],
    queryFn: async (params) => requestGetOneUser(params),
    onError: (error) => {
      enqueueSnackbar(error.message || "An error occurred fetching user", {
        variant: "error",
      });
    },
    enabled: Boolean(data.id),
  });

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useAuthMutation({
    mutationFn: async ({ userId, body }) =>
      requestUpdateUser({
        userId,
        body,
      }),
    onMutate: async (updatedUser) => {
      await queryClient.cancelQueries({
        queryKey: ["user", updatedUser.userId],
      });
      const previousUser = queryClient.getQueryData([
        "user",
        updatedUser.userId,
      ]);
      queryClient.setQueryData(["user", updatedUser.userId], updatedUser);
      return { previousUser, updatedUser };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userList"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error, updatedUser, context) => {
      queryClient.setQueryData(
        ["userList", updatedUser.userId],
        context.previousUser
      );
      enqueueSnackbar(error.message || "An error occurred updating user", {
        variant: "error",
      });
    },
  });
};

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useAuthMutation({
    mutationFn: requestUpdateUserRole,
    onMutate: async (updatedUser) => {
      await queryClient.cancelQueries({
        queryKey: ["user", updatedUser.id],
      });
      const previousUser = queryClient.getQueryData(["user", updatedUser.id]);
      queryClient.setQueryData(["user", updatedUser.id], updatedUser);
      return { previousUser, updatedUser };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userList"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error, updatedUser, context) => {
      queryClient.setQueryData(
        ["userList", updatedUser.id],
        context.previousUser
      );
      enqueueSnackbar(error.message || "An error occurred updating user role", {
        variant: "error",
      });
    },
  });
};
