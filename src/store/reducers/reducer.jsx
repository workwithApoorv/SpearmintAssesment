import * as actionType from "../actionTypes";

const initialState = "";

const changeTheme = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_THEME_DARK:
      localStorage.setItem("theme", "dark");
      return "dark";
    case actionType.SET_THEME_LIGHT:
      localStorage.setItem("theme", "light");
      return "light";
    default:
      return state;
  }
};

export default changeTheme;
