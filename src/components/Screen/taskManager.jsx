/* eslint-disable react-hooks/exhaustive-deps */
import TaskForm from "./taskForm";
import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import filter from "./filter.png";
import StickyHeadTable from "../table";
import CircularIndeterminate from "../loader";
import { setTask, updateStatus } from "../../store/actionCreator";

const TaskManager = () => {
  const [render, setRender] = useState(false);
  const [display, setDisplay] = useState("none");
  const [filterName, setFilterName] = useState("All");
  const [showLoader, setShowLoader] = useState(false);
  const [rows, setRows] = useState([]);
  const bgtheme = useSelector((state) => state.changeTheme);
  const taskObj = useSelector((state) => state.changeTask);

  console.log(rows, "BIg rowwwwwwwwwww");
  useEffect(() => {
    if (filterName === "All") {
      setRows(taskObj);
    } else {
      const tempArr = taskObj.filter((ele) => {
        return ele.status.toLowerCase() === filterName.toLowerCase();
      });
      setRows(tempArr);
    }
  }, [filterName, taskObj]);

  return (
    <div className={bgtheme === "light" ? "screen" : "screen dark-bg"}>
      {showLoader && <CircularIndeterminate />}
      <div className="d-flex align-items-center justify-content-center screen-sm">
        <button
          className={`create-button my-4  ${
            bgtheme === "light" ? "" : "dark-btn"
          }`}
          type="button"
          onClick={() => setDisplay("block")}
        >
          Create Task
        </button>
        <div className="d-flex align-items-center mx-2 screen-767 filter">
          <select
            className={`form-select mx-2  ${
              bgtheme === "light" ? "" : "dark-btn"
            }`}
            style={{ width: "20rem", height: "4rem" , border: "none" }}
            aria-label="Default select example"
            value={filterName}
            onChange={(event) => setFilterName(event.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="All">All</option>
          </select>
          <img src={filter} alt="filter" style={{height: "2rem",}} />
        </div>
      </div>
      <div className="d-flex my-4 justify-content-center">
        <div className="table">
          <StickyHeadTable rows={rows} onReRender={setRender} />
        </div>
      </div>
      <TaskForm
        display={display}
        onSetDisplay={setDisplay}
        onSetLoader={setShowLoader}
      />
    </div>
  );
};

export default TaskManager;
