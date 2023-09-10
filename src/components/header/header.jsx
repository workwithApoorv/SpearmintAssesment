import "./header.css";
import Logo from "./logo.png";
import Light from "./brightness.svg";
import Dark from "./moon.svg";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setThemeLight, setThemeDark } from "../../store/actionCreator";

const Header = ({ prevTheme }) => {
  const theme = useSelector((state) => state.changeTheme);
  const dispatch = useDispatch();

  const handleThemeSelector = () => {
    if (theme === "light") dispatch(setThemeDark());
    else dispatch(setThemeLight());
  };
  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <img
            src={Logo}
            className="mx-2"
            alt="Logo"
            style={{ height: "5rem" }}
          />
          <h1 className="header-main mx-2">Spearmint Task Manager</h1>
        </div>
        <div className="d-flex align-items-center">
          <img
            className="theme-button me-4"
            src={prevTheme === "light" ? Light : Dark}
            alt="theme Selector"
            onClick={handleThemeSelector}
            style={{ height: "3rem" }}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
