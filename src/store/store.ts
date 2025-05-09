import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import roleSlice from "./slices/roleSlice";
import permissionSlice from "./slices/permissionSlice";
import userSlice from "./slices/userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      roles: roleSlice,
      permissions: permissionSlice,
      users: userSlice,
    },
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
