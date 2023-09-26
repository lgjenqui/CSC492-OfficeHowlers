import { Box } from "@mui/material";
import * as React from "react";
import "./App.css";
import Banner from "./components/banner/Banner";
import NCSULogo from "./assets/ncstate-logo.jpg";

const title = "OfficeHowlers";

function App() {
  return (
    <React.StrictMode>
      <Box
        sx={{
          width: "100%",
          color: "white",
          height: "150px",
          m: 0,
        }}
      >
        <Banner title="OfficeHowlers" subtitle="Think and Do"></Banner>
        <Box
          sx={{
            position: "absolute",
            bottom: 15,
            left: 15,
          }}
        >
          <img src={NCSULogo} width="162" height="78" alt="" />
        </Box>
      </Box>
    </React.StrictMode>
  );
}

export default App;
