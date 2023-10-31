import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import NCSULogo from "./assets/ncstate-logo.jpg";
import Banner from "./components/banner/Banner";
import CreateCourse from "./components/createCourse/CreateCourse";
import StartSession from "./components/startSession/StartSession";
import Home from "./components/home/Home";
import NotFound from "./components/notFound/NotFound";
import { getUser } from "./services/api/user";
import EditRoster from "./components/editRoster/EditRoster";
import { useEffect, useState } from "react";
import User from "../../Models/user.model";
import CreateHelpTicket from "./components/createHelpTicket/CreateHelpTicket";

function App() {
  const navigate = useNavigate();

  const onCourseClick = (courseUUID: string) => {
    console.log(courseUUID);
    navigate("/course?id=" + courseUUID);
  };

  const [user, setUser] = useState<User | null>(null);

  const onOptionsClick = (option: string) => {
    if (option == "Create course") navigate("/createCourse");
    else if (option == "Start help session") navigate("/startSession");
    else if (option == "Create help ticket") navigate("/createHelpTicket");
    else navigate("/deadend");
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
            element={
              <Home
                onCourseClick={onCourseClick}
                onOptionsClick={onOptionsClick}
              />
            }
          />

          <Route path="/course" element={<EditRoster />} />

          <Route path="/createCourse" element={<CreateCourse />} />

          <Route path="/startSession" element={<StartSession />} />

          <Route path="/editRoster" element={<EditRoster />} />

          <Route path="/createHelpTicket" element={<CreateHelpTicket />} />

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
