import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  loginPassword,
  loginCode,
  register,
  getUserInfoApi,
} from "../../api/service/userService.js";
import { useNavigate } from "react-router-dom";
import { use } from "react";
import {
  changeAvatar,
  changeUsername,
  changePhone,
} from "../../api/service/userService.js";

export const fetchUserInfo = createAsyncThunk(
  "",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getUserInfoApi(userId);
      console.log("获取用户信息结果:", response);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "获取用户信息失败");
    }
  }
);

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
      console.log("注册结果:", data);
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
      console.log("更新头像结果:", data);
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
      return { ...response.data, name: newUsername };
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

const getSafeLocalStorage = (key) => {
  const item = localStorage.getItem(key);
  // 明确排除 "undefined" 和 "null" 字符串
  if (item === "undefined" || item === "null" || item === null) {
    return null;
  }
  try {
    return JSON.parse(item);
  } catch {
    return null;
  }
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: getSafeLocalStorage("user"),
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null,
    avatar: getSafeLocalStorage("user")?.avatar || null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      const { id, username, role, token, avatar } = action.payload;
      state.avatar = avatar;
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
      window.location.reload(); // 刷新页面
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
        state.avatar = action.payload.data.user.avatar;
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
        state.user = action.payload.data.user;
        state.token = action.payload.data.token;
        state.role = 3;
        state.avatar = action.payload.data.user.avatar;
        state.error = null;
        localStorage.setItem("user", JSON.stringify(action.payload.data.user));
        localStorage.setItem("token", action.payload.data.token);
        localStorage.setItem("role", 3);
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
        console.log("更新头像成功:", action.payload.data);
        state.loading = false;
        state.user.avatar = action.payload.data;
        localStorage.setItem("user", JSON.stringify(state.user));
        state.error = null;
      })
      .addCase(updateAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUsername.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUsername.fulfilled, (state, action) => {
        console.log("更新用户名成功:", action.payload.name);
        state.loading = false;
        state.user.name = action.payload.name;
        let currentUserInLocalStorage = JSON.parse(
          localStorage.getItem("user") || "{}"
        );

        // 2. 更新 localStorage 中用户数据的 name 属性
        currentUserInLocalStorage = {
          ...currentUserInLocalStorage,
          name: action.payload.name, // 这里使用 newUsername (字符串)，而不是 action.payload (对象)
        };

        // 3. 将更新后的 JavaScript 对象转换为 JSON 字符串，再存入 localStorage
        localStorage.setItem("user", JSON.stringify(currentUserInLocalStorage));
        state.error = null;
      });
  },
});

export const { logout, clearError, setUser, getUserInfo } = userSlice.actions;
export default userSlice.reducer;
