import axios from "axios";
import { BASE_URL } from "../redux/actionTypes";

export const getCurrentProfile = async (role, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.get(
      `${BASE_URL}/${role}/profile/current`,
      config
    );
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

export const updateCurrentProfile = async (role, token, updatedData) => {
  console.log(role, "On api");
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(updatedData);
    const { data } = await axios.put(
      `${BASE_URL}/${role}/profile/update`,
      updatedData,
      config
    );
    console.log(data);
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

// update  password
// get all  booking
export const updatePassword = async (token, passwordData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.put(
      `${BASE_URL}/user/password/update`,
      passwordData,
      config
    );
    return { status: data.status };
  } catch (error) {
    return {
      message:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};

// get the profile of patient and doctor according to the role

export const getSingleProfile = async (role, id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const { data } = await axios.get(
      `${BASE_URL}/${role}/profile/single/${id}`,
      config
    );
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
export const updateOrderStatus = async (token, orderId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.put(
    `${BASE_URL}/orders/${orderId}/deliver`,
    null,
    config
  );
};
