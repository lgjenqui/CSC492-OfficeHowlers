import { Box } from "@mui/material";
import { useNavigate, Route, Routes } from "react-router-dom";
import "./App.css";
import NCSULogo from "./assets/ncstate-logo.jpg";
import Banner from "./components/banner/Banner";
import Login from "./components/login/Login";
import Instructor from "./components/instructor/Instructor";

const systemRoles = ["Instructor", "TA", "Student"];

function App() {
  const navigate = useNavigate();

  const onLogin = (role: string) => {
    navigate("/" + role.toLowerCase());
  };

  const onCourseClick = () => {
    navigate("/instructor/course/CSC216");
  };

  return (
    <div>
      <Banner title={"OfficeHowlers"} subtitle="Think and Do"></Banner>
      <Box
        sx={{
          position: "absolute",
          bottom: 15,
          left: 15,
        }}
      >
        <img src={NCSULogo} width="162" height="78" alt="" />
      </Box>

      <Routes>
        <Route
          path="/"
          element={<Login systemRoles={systemRoles} onLogin={onLogin} />}
        ></Route>

        <Route
          path="/instructor"
          element={
            <Instructor
              salutation="Dr."
              lastName="King"
              onCourseClick={onCourseClick}
            />
          }
        ></Route>

        <Route path="/instructor/course/CSC216"></Route>
      </Routes>
    </div>
  );
}

export default App;
