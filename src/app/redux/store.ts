import { configureStore } from "@reduxjs/toolkit";
import RepositorySlice from "pages/home/home.slice";

const store = configureStore({
  reducer: {
    repositoryReducer: RepositorySlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
