import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import NCSULogo from "./assets/ncstate-logo.jpg";
import Banner from "./components/banner/Banner";
import CreateCourse from "./components/createCourse/createCourse";
import Instructor from "./components/instructor/Instructor";
import Login from "./components/login/Login";
import NotFound from "./components/notFound/NotFound";
import { Box } from "@mui/material";
import Course from "../../HowlBack/models/course.model";
import { setCourses } from "./components/instructor/Instructor";

const systemRoles = ["Instructor", "TA", "Student"];

var courses: Course[] = [];

function App() {
  const navigate = useNavigate();

  const onLogin = (role: string) => {
    navigate("/" + role.toLowerCase());
  };

  const onCourseClick = () => {
    navigate("/instructor/course/CSC216");
  };

  const onInstructorOptionsClick = (option: string) => {
    if (option == "Create course") navigate("/instructor/createCourse");
    else navigate("/instructor/deadend");
  };

  const onReturnHome = () => {
    navigate("/");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <Banner
          title={"OfficeHowlers"}
          subtitle="Think and Do"
          onReturnHome={onReturnHome}
        ></Banner>
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
          />

          <Route
            path="/instructor"
            element={
              <Instructor
                salutation="Dr."
                lastName="King"
                onCourseClick={onCourseClick}
                onInstructorOptionsClick={onInstructorOptionsClick}
              />
            }
          />

          <Route path="/instructor/course/CSC216" />

          <Route
            path="/instructor/createCourse"
            element={<CreateCourse onCreateCourse={createCourse} />}
          />

          <Route path="/*" element={<NotFound onReturnHome={onReturnHome} />} />
        </Routes>
      </div>
    </LocalizationProvider>
  );
}

async function createCourse(name: string, desc: string) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      courseName: name,
      courseDescription: desc,
    }),
  };

  // Create the new course
  await fetch("http://localhost:8080/api/course/create", requestOptions);

  // Update the existing list of courses in the system
  var res = await fetch("http://localhost:8080/api/course/all");
  courses = await res.json();
  setCourses(courses);
  console.log(courses);
}

export default App;
