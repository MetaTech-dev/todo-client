export const requestGetStatusList = async ({ token }) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/status`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to fetch status list");
    }
    return response.json();
  } catch (error) {
    console.error("requestGetStatusList error", error);
  }
};

export const requestGetOneStatus = async ({ data, token }) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/status/${data.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to fetch status");
    }
    return response.json();
  } catch (error) {
    console.error("requestGetOneStatus error", error);
  }
};

export const requestCreateStatus = async ({ data, token }) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to create status");
    }
    return response.json();
  } catch (error) {
    console.error("requestCreateStatus error", error);
  }
};

export const requestRemoveStatus = async ({ data, token }) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/status/${data.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to delete status");
    } else if (response.ok) {
      return true;
    }
  } catch (error) {
    console.error("requestRemoveStatus error", error);
  }
};

export const requestUpdateStatus = async ({ data, token }) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/status/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to update status");
    }
    return response.json();
  } catch (error) {
    console.error("requestUpdateStatus error", error);
  }
};

export const requestUpdateStatusList = async ({ data, token }) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to update status list");
    }
    return response.json();
  } catch (error) {
    console.error("requestUpdateStatusList error", error);
  }
};
