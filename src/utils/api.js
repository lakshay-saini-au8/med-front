import axios from "axios";
import { BASE_URL } from "../redux/actionTypes";

// get all the medicine

export const getAllProducts = async (query = {}) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    let URL = `${BASE_URL}/products`;
    const { priceRange, category } = query;
    if (priceRange && category) {
      URL = `${BASE_URL}/products/?category=${category}&range=${priceRange}`;
    } else if (priceRange) {
      URL = `${BASE_URL}/products/?range=${priceRange}`;
    } else if (category) {
      URL = `${BASE_URL}/products/?category=${category}`;
    }
    const { data } = await axios.get(`${URL}`, config);
    return { data };
  } catch (error) {
    return {
      message:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};

// get all the medicine

export const getProductById = async (productId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    let URL = `${BASE_URL}/products/${productId}`;
    const { data } = await axios.get(`${URL}`, config);
    return { product: data };
  } catch (error) {
    return {
      message:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};

export const placeOrder = async (token, orderData) => {
  console.log(token);
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(`${BASE_URL}/orders/`, orderData, config);
    localStorage.removeItem("cartItems");
  } catch (error) {
    return {
      message:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};

export const myOrders = async (token) => {
  console.log(token);
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`${BASE_URL}/orders/myorders/`, config);
    return { data };
  } catch (error) {
    return {
      message:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};
export const allOrders = async (token) => {
  console.log(token);
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`${BASE_URL}/orders/`, config);
    return { data };
  } catch (error) {
    return {
      message:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};
export const updateOrderStatus = async (token, orderId) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let URL = `${BASE_URL}/orders/${orderId}/deliver`;
    const { data } = await axios.put(`${URL}`, null, config);
    return { status: "success", data };
  } catch (error) {
    return {
      message:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};

// get all the medicine

export const getAllUser = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    let URL = `${BASE_URL}/users/`;
    const { data } = await axios.get(`${URL}`, config);
    return { data };
  } catch (error) {
    return {
      message:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};

// get all the medicine

export const updateUser = async (token, userId, userData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    let URL = `${BASE_URL}/users/${userId}`;
    const { data } = await axios.put(
      `${URL}`,
      { isAdmin: userData.isAdmin },
      config
    );
    return { success: "success", data };
  } catch (error) {
    return {
      message:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};

export const deleteUserById = async (token, userId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    let URL = `${BASE_URL}/users/${userId}`;
    const { data } = await axios.delete(`${URL}`, config);
    return { success: "success", data };
  } catch (error) {
    return {
      message:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};

export const deleteProductById = async (token, productId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    let URL = `${BASE_URL}/products/${productId}`;
    const { data } = await axios.delete(`${URL}`, config);
    return { success: "success", data };
  } catch (error) {
    return {
      message:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};

export const updateProduct = async (token, productId, updateData) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let URL = `${BASE_URL}/products/${productId}`;
    const { data } = await axios.put(`${URL}`, updateData, config);
    return { status: "success", data };
  } catch (error) {
    return {
      message:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};

export const addProduct = async (token, updateData) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let URL = `${BASE_URL}/products/`;
    const { data } = await axios.post(`${URL}`, updateData, config);
    return { status: "success", data };
  } catch (error) {
    return {
      message:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};
