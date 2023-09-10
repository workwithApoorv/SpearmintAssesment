import { useSelector } from "react-redux";
import "./App.css";
import TaskManager from "./components/Screen/taskManager";
import Header from "./components/header/header";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setThemeDark, setThemeLight } from "./store/actionCreator";

function App() {
  const theme = useSelector((state) => state.changeTheme);
  const prevTheme = localStorage.getItem("theme");

  const dispatch = useDispatch();
  useEffect(() => {
    console.log(prevTheme, "PPPPPRRRRRRRREEEEE");
    if (prevTheme === "dark") {
      dispatch(setThemeDark());
    } else {
      dispatch(setThemeLight());
    }
  }, []);
  return (
    <>
      <div className={theme === "light" ? "dark-theme header" : "header"}>
        <Header prevTheme={prevTheme} />
      </div>
      <div className="screen">
        <TaskManager />
      </div>
    </>
  );
}

export default App;
