import { configureStore } from "@reduxjs/toolkit";
import authSlice from './slices/authSlice';
import roleSlice from './slices/roleSlice';


export const makeStore = () => {
  return configureStore({
    reducer: {
        auth: authSlice,
        roles:roleSlice
    },
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
