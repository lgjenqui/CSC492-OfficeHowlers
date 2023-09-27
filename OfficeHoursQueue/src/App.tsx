import { Box } from "@mui/material";
import * as React from "react";
import "./App.css";
import NCSULogo from "./assets/ncstate-logo.jpg";
import Banner from "./components/banner/Banner";
import Login from "./components/login/Login";

function App() {
  return (
    <React.StrictMode>
      <Banner title={"OfficeHowlers"} subtitle="Think and Do"></Banner>
      <Box sx={{ width: "100%", height: "100%", m: 0 }}>
        <Login />
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 15,
          left: 15,
        }}
      >
        <img src={NCSULogo} width="162" height="78" alt="" />
      </Box>
    </React.StrictMode>
  );
}

export default App;
