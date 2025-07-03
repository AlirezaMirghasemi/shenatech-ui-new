import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import roleSlice from "./slices/roleSlice";
import permissionSlice from "./slices/permissionSlice";
import userSlice from "./slices/userSlice";
import tagSlice from "./slices/tagSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      roles: roleSlice,
      permissions: permissionSlice,
      users: userSlice,
      tags: tagSlice,
    },
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
