import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import NCSULogo from "./assets/ncstate-logo.jpg";
import Banner from "./components/banner/Banner";
import CreateCourse from "./components/createCourse/CreateCourse";
import StartSession from "./components/startSession/StartSession";
import Instructor from "./components/instructor/Instructor";
import Login from "./components/login/Login";
import NotFound from "./components/notFound/NotFound";
import { getUser } from "./services/api/user";
import EditRoster from "./components/editRoster/EditRoster";
import { useEffect, useState } from "react";
import User from "../../Models/user.model";
import CreateHelpTicket from "./components/createHelpTicket/CreateHelpTicket";

const systemRoles = ["Instructor", "TA", "Student"];

function App() {
  const navigate = useNavigate();

  const onLogin = (role: string) => {
    navigate("/" + role.toLowerCase());
  };

  const onCourseClick = (courseUUID: string) => {
    console.log(courseUUID);
    navigate("/instructor/course?id=" + courseUUID);
  };

  const [user, setUser] = useState<User | null>(null);

  const onInstructorOptionsClick = (option: string) => {
    if (option == "Create course") navigate("/instructor/createCourse");
    else if (option == "Start help session")
      navigate("/instructor/startSession");
    else if (option == "Create help ticket") navigate("/instructor/createHelpTicket");
    else navigate("/instructor/deadend");
  };

  const onReturnHome = () => {
    navigate("/");
  };

  function getGreeting() {
    if (user) {
      return "Hello, " + user.firstName;
    }
    return "";
  }

  useEffect(() => {
    getUser()
      .then((res) => {
        console.log(res);
        setUser(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          height: "100%",
          position: "relative",
        }}
      >
        <Banner
          title={"OfficeHowlers"}
          subtitle="Think and Do"
          greeting={getGreeting()}
          onReturnHome={onReturnHome}
        ></Banner>

        <Routes>
          <Route
            path="/"
            element={<Login systemRoles={systemRoles} onLogin={onLogin} />}
          />

          <Route
            path="/instructor"
            element={
              <Instructor
                onCourseClick={onCourseClick}
                onInstructorOptionsClick={onInstructorOptionsClick}
              />
            }
          />

          <Route path="/instructor/course" element={<EditRoster />} />

          <Route path="/instructor/createCourse" element={<CreateCourse />} />

          <Route path="/instructor/startSession" element={<StartSession />} />

          <Route path="/instructor/editRoster" element={<EditRoster />} />

          <Route path="/instructor/createHelpTicket" element={<CreateHelpTicket/>}/>

          <Route path="/*" element={<NotFound onReturnHome={onReturnHome} />} />
        </Routes>

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
    </LocalizationProvider>
  );
}

export default App;
