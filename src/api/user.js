export const requestGetUserList = async ({ token }) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to fetch user list");
  }
  return response.json();
};

export const requestGetOneUser = async ({ data, token }) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/user/${data.id}`,
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
};

export const requestUpdateUser = async ({ data, token }) => {
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
};

export const requestUpdateUserRole = async ({ data, token }) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/user/${data.userId}/role`,
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
};
