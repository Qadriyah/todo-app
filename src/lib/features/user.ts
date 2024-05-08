import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Credentials, User } from "@/types";
import { postApi } from "@/api";

export interface UserState {
  loading: "idle" | "pending" | "fulfilled" | "failed";
  error: unknown;
  user: User | null;
}

const initialState = {
  loading: "idle",
  error: null,
  user: null,
} as UserState;

const namespace = "user";

export const loginUser = createAsyncThunk(
  `${namespace}/loginUser`,
  async (data: Credentials, { rejectWithValue }) => {
    try {
      const response = await postApi<User>({
        pathname: "/Tests/scripts/user-login.php",
        data,
      });
      return response;
    } catch (err: any) {
      if (!err.response) {
        return rejectWithValue({
          err,
          message: "Network Error",
        });
      } else {
        return rejectWithValue(err.response.data);
      }
    }
  }
);

const userSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = "idle";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
