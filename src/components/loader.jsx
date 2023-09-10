import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "../App.css";

export default function CircularIndeterminate() {
  return (
    <div
      className="loader"
      style={{ position: "absolute", top: "40%", left: "45%" }}
    >
      <Box>
        <CircularProgress />
      </Box>
    </div>
  );
}
