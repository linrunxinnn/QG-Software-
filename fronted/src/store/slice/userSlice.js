import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  loginPassword,
  loginCode,
  register,
} from "../../api/service/userService.js";
import { useNavigate } from "react-router-dom";
import { use } from "react";
import {
  changeAvatar,
  changeUsername,
  changePhone,
} from "../../api/service/userService.js";

//密码登录
export const loginUserByPassword = createAsyncThunk(
  "/users/password",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginPassword(credentials);
      console.log("userSlice.js - 登录请求数据:", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "登录失败");
    }
  }
);

//验证码登录
export const loginUserByCode = createAsyncThunk(
  "/users/code",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginCode(credentials);
      console.log("登录结果:", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "登录失败");
    }
  }
);

//注册
export const registerUser = createAsyncThunk(
  "/users/register", //注册用户API
  async (userData, { rejectWithValue }) => {
    console.log("注册用户数据:", userData);
    try {
      const data = await register(userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "注册失败");
    }
  }
);

//更改头像
export const updateAvatar = createAsyncThunk(
  "/users/updateAvatar",
  async ({ formData, userId }, { rejectWithValue }) => {
    // 解构参数
    try {
      const data = await changeAvatar(formData, userId); // 分开传
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "更改头像失败");
    }
  }
);

export const updateUsername = createAsyncThunk(
  "/users/updateName",
  async ({ userId, newUsername }, { rejectWithValue }) => {
    console.log("更新用户名请求数据111:", { userId, newUsername });
    try {
      const response = await changeUsername(userId, newUsername);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "更改用户名失败");
    }
  }
);

export const updatePhone = createAsyncThunk(
  "/users/updatePhone",
  async ({ userId, newPhone }, { rejectWithValue }) => {
    try {
      const response = await changePhone(userId, newPhone);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "更改手机号失败");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    role: localStorage.getItem("role") ? localStorage.getItem("role") : null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      const { id, username, role, token } = action.payload;
      state.id = id;
      state.username = username;
      state.role = role;
      state.token = token;
      state.loading = false;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      useNavigate("/");
    },
    clearError: (state) => {
      state.error = null;
    },
    getUserInfo: (state, action) => {
      const { user, token, role } = action.payload;
      state.user = user;
      state.token = token;
      state.role = role;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserByPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserByPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.token = action.payload.data.token;
        state.role = action.payload.data.user.role;
        state.error = null;
        localStorage.setItem("user", JSON.stringify(action.payload.data.user));
        localStorage.setItem("token", action.payload.data.token);
        localStorage.setItem("role", action.payload.data.user.role);
      })
      .addCase(loginUserByPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUserByCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserByCode.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.error = null;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("role", action.payload.role);
      })
      .addCase(loginUserByCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.error = null;
        localStorage.setItem("user", JSON.stringify(action.payload.data.user));
        localStorage.setItem("token", action.payload.data.token);
        localStorage.setItem("role", action.payload.data.user.role);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.user.avatar = action.payload.avatar;
        localStorage.setItem("user", JSON.stringify(state.user));
        state.error = null;
      })
      .addCase(updateAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError, setUser, getUserInfo } = userSlice.actions;
export default userSlice.reducer;
