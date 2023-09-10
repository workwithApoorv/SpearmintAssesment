import * as actionTypes from "./actionTypes";

export const setThemeLight = () => {
  // eslint-disable-next-line no-labels, no-unused-expressions
  return {
    type: actionTypes.SET_THEME_LIGHT,
  };
};
export const setThemeDark = () => {
  return {
    type: actionTypes.SET_THEME_DARK,
  };
  // eslint-disable-next-line no-labels, no-unused-expressions
};

export const setTask = (data) => {
  console.log(data);
  return {
    type: actionTypes.SET_TASK,
    data,
  };
};
export const getTask = () => {
  return {
    type: actionTypes.GET_TASK,
  };
};

export const updateStatus = (data) => {
    return {
        type: actionTypes.UPDATE_STATUS,
        data
    }
}