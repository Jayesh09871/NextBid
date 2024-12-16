import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: {},
    leaderboard: [],
  },
  reducers: {
    registerRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    registerFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },
    loginRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },
    fetchUserRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    fetchUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },

    logoutSuccess(state, action) {
      state.isAuthenticated = false;
      state.user = {};
    },
    logoutFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
    },
    fetchLeaderboardRequest(state, action) {
      state.loading = true;
      state.leaderboard = [];
    },
    fetchLeaderboardSuccess(state, action) {
      state.loading = false;
      state.leaderboard = action.payload;
    },
    fetchLeaderboardFailed(state, action) {
      state.loading = false;
      state.leaderboard = [];
    },
    clearAllErrors(state, action) {
      state.user = state.user;
      state.isAuthenticated = state.isAuthenticated;
      state.leaderboard = state.leaderboard;
      state.loading = false;
    },
  },
});
const authHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};


export const register = (data) => async (dispatch) => {
  dispatch(userSlice.actions.registerRequest());
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user/register`,
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    // Save the token in localStorage
    const { token } = response.data;
    localStorage.setItem("token", token);

    dispatch(userSlice.actions.registerSuccess(response.data));
    toast.success(response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.registerFailed());
    toast.error(error.response?.data?.message || "Registration failed");
    dispatch(userSlice.actions.clearAllErrors());
  }
};


export const login = (data) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user/login`,
      data,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    // Save the token in localStorage
    const { token } = response.data;
    localStorage.setItem("token", token);

    dispatch(userSlice.actions.loginSuccess(response.data));
    toast.success(response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.loginFailed());
    toast.error(error.response?.data?.message || "Login failed");
    dispatch(userSlice.actions.clearAllErrors());
  }
};


export const logout = () => async (dispatch) => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found. User might already be logged out.");
      throw new Error("No token found. User might already be logged out.");
    }
    console.log("Token found in localStorage:", token);

    // Send the logout request
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/user/logout`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Logout response received from backend:", response);

    // Clear the token from localStorage
    localStorage.removeItem("token");
    console.log("Token removed from localStorage");

    dispatch(userSlice.actions.logoutSuccess());
    toast.success(response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    console.error("Logout Error:", error.response || error.message);
    console.log("Error details:", error.response?.data || error);

    dispatch(userSlice.actions.logoutFailed());
    toast.error(
      error.response?.data?.message || "Logout failed. Please try again."
    );
    dispatch(userSlice.actions.clearAllErrors());
  }
};



export const fetchUser = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchUserRequest());
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/user/me`,
      {
        headers: {
          ...authHeader(),
        },
      }
    );
    dispatch(userSlice.actions.fetchUserSuccess(response.data.user));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.fetchUserFailed());
    dispatch(userSlice.actions.clearAllErrors());
    console.error(error);
  }
};


export const fetchLeaderboard = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchLeaderboardRequest());
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/user/leaderboard`,
      {
        headers: {
          ...authHeader(),
        },
      }
    );
    dispatch(
      userSlice.actions.fetchLeaderboardSuccess(response.data.leaderboard)
    );
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.fetchLeaderboardFailed());
    dispatch(userSlice.actions.clearAllErrors());
    console.error(error);
  }
};


export default userSlice.reducer;
