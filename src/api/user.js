export const requestGetUserList = async ({ token, orgId }) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/user${orgId ? `?orgId=${orgId}` : ""}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to fetch user list");
    }
    return response.json();
  } catch (error) {
    console.error("requestGetUserList error", error);
  }
};

export const requestGetOneUser = async ({ data, token, orgId }) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/user/${data.id}${
        orgId ? `?orgId=${orgId}` : ""
      }`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to fetch user");
    }
    return response.json();
  } catch (error) {
    console.error("requestGetOneUser error", error);
  }
};

export const requestUpdateUser = async ({ data, token }) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/user/${data.userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data.body),
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to update user");
    }
    return response.json();
  } catch (error) {
    console.error("requestUpdateUser error", error);
  }
};

export const requestUpdateUserRole = async ({ data, token, orgId }) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/user/${data.userId}/role${
        orgId ? `?orgId=${orgId}` : ""
      }`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: data.role }),
      }
    );
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to update user role");
    }
    return response.json();
  } catch (error) {
    console.error("requestUpdateUserRole error", error);
  }
};
