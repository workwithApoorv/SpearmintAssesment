import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./task.css";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import crossLight from "./cross.png";
import cross from "./close-button.png";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { useState, useMemo } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setTask } from "../../store/actionCreator";

const TaskForm = ({ display, onSetDisplay, onSetLoader }) => {
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);

  const dispatch = useDispatch();
  const bgTheme = useSelector((state) => state.changeTheme);
  function todayDate() {
    const date = new Date();
    let currentDay = String(date.getDate()).padStart(2, "0");
    let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
    let currentYear = date.getFullYear();
    // we will display the date as DD-MM-YYYY
    let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
    return currentDate;
  }

  const date = useMemo(todayDate, []);
  const [taskObj, setTaskObj] = useState({
    taskName: "",
    taskSummary: "",
    responsible: "",
    date: date,
    status: "Pending",
  });
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const tempArr = [...event.target.value];
    const responsible = tempArr.join(",");
    setTaskObj({ ...taskObj, responsible: responsible });
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const ITEM_HEIGHT = 50;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 500,
      },
    },
  };

  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleFormSubmit = () => {
    onSetLoader(true);
    setTimeout(() => {
      dispatch(setTask(taskObj));
      setTaskObj({
        taskName: "",
        taskSummary: "",
        person: [],
        date: date,
        status: "pending",
      });
      onSetDisplay("none");
      onSetLoader(false);
    }, 2000);
  };

  return (
    <div
      className={`${display === "none" ? "form" : "form open"} ${
        bgTheme === "dark" ? "dark-bg-form" : ""
      }`}
    >
      <div className="d-flex task-name flex-column justify-content-center  ">
        <div style={{ textAlign: "right" }}>
          <img
            src={cross}
            style={{ width: "2rem" }}
            alt="close"
            className="mx-4 mt-4 cross"
            onClick={() => {
              onSetDisplay("none");
            }}
          />
        </div>

        <TextField
          className=" mx-2"
          id="outlined-basic"
          sx={
            bgTheme === "dark"
              ? { input: { color: "#faf0e6" }, label: { color: "#faf0e6" } }
              : {}
          }
          label="Enter Task Name"
          variant="standard"
          value={taskObj.taskName}
          onChange={(event) => {
            setTaskObj({ ...taskObj, taskName: event.target.value });
          }}
        />
        <TextField
          className="mx-2 my-2"
          id="outlined-multiline-flexible"
          sx={
            bgTheme === "dark"
              ? { input: { color: "#faf0e6" }, label: { color: "#faf0e6" } }
              : {}
          }
          value={taskObj.taskSummary}
          label="Enter Task Summary"
          multiline
          variant="standard"
          minRows={10}
          onChange={(event) => {
            setTaskObj({ ...taskObj, taskSummary: event.target.value });
          }}
        />
        <div className="ms-4 align-items-center">
          <label
            htmlFor="deadline"
            style={
              bgTheme === "dark" ? { color: "#faf0e6" } : { color: "#5c5470" }
            }
            className="mx-2"
          >
            Choose Deadline
          </label>

          <DemoItem>
            <DatePicker
              sx={{ width: 300 }}
              className=""
              name="deadline"
              defaultValue={dayjs(date)}
              onChange={(value) => {
                setTaskObj({
                  ...taskObj,
                  date: moment(value.$d).format("L"),
                });
              }}
              format="DD-MM-YYYY"
            />
          </DemoItem>
        </div>

        <div className="d-flex align-items-center">
          <FormControl sx={{ m: 3, width: 300 }}>
            <InputLabel id="demo-multiple-chip-label">
              Responsible person
            </InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, personName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <button
            type="button"
            className="create-button me-1"
            style={{ height: "3rem", width: "6rem" }}
            onClick={handleFormSubmit}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
