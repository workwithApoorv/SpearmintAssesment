import { combineReducers } from "@reduxjs/toolkit";
import changeTheme from "./reducer";
import changeTask from "./changeTasks";

export const rootReducer = combineReducers({
  changeTheme,
  changeTask,
});
