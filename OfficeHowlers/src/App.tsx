import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import NCSULogo from "./assets/ncstate-logo.jpg";
import Banner from "./components/Banner";
import CreateCourse from "./components/CreateCourse";
import StartSession from "./components/StartSession";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import { getUser } from "./services/api/user";
import { getCourses } from "./services/api/course";
import EditRoster from "./components/EditRoster";
import { useEffect, useState } from "react";
import CourseModel from "../../Models/course.model";
import User from "../../Models/user.model";
import CreateHelpTicket from "./components/CreateHelpTicket";
import { useLocation } from "react-router-dom";
import { getTicket } from "./services/api/ticket";
import { getSessionTickets } from "./services/api/session";
import TicketWrapperModel from "../../Models/ticketWrapper.model";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState<User | null>(null);
  const [instructorCourses, setInstructorCourses] = useState<CourseModel[]>([]);
  const [assistantCourses, setAssistantCourses] = useState<CourseModel[]>([]);
  const [studentCourses, setStudentCourses] = useState<CourseModel[]>([]);
  const [studentHelpTicket, setStudentHelpTicket] =
    useState<TicketWrapperModel | null>(null);
  const [sessionTickets, setSessionTickets] = useState<TicketWrapperModel[]>(
    []
  );
  const [coursesLoadedSuccessfully, setCoursesLoadedSuccessfully] = useState<
    boolean | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<string>("myCourses");

  const onReturnHome = () => {
    navigate("/");
  };

  const handleLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  function getGreeting() {
    if (user) {
      return "Hello, " + user.firstName;
    }
    return "";
  }

  useEffect(() => {
    setCoursesLoadedSuccessfully(null);
    setIsLoading(true);

    // Set up a timeout of 2.5 seconds so the user doesn't sit on a blank page too long!
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 5500);

    const fetchData = async () => {
      try {
        const user = await getUser();
        console.log(user);
        setUser(user);

        const courses = await getCourses();
        setInstructorCourses(courses.instructorCourses);
        setAssistantCourses(courses.assistantCourses);
        setStudentCourses(courses.studentCourses);
        setCoursesLoadedSuccessfully(true);

        // Grab the user's help session tickets if they are faculty
        if (user && user.primaryRole === "faculty") {
          const sessionTickets = await getSessionTickets();
          console.log(sessionTickets);
          setSessionTickets(sessionTickets);
        }

        // Grab the user's help ticket if they are a student
        if (user && user.primaryRole != "faculty") {
          const helpTicket = await getTicket();
          console.log(helpTicket);
          setStudentHelpTicket(helpTicket);
        }
      } catch (err) {
        console.error(err);
        setCoursesLoadedSuccessfully(false);
      } finally {
        setTimeout(() => setIsLoading(false), 0);
      }
    };

    fetchData();

    // Cleanup function to clear the timeout and abort the fetch if the component unmounts
    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [location]);

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
                user={user}
                instructorCourses={instructorCourses}
                assistantCourses={assistantCourses}
                studentCourses={studentCourses}
                coursesLoadedSuccessfully={coursesLoadedSuccessfully}
                isLoading={isLoading}
                currentView={currentView}
                setCurrentView={setCurrentView}
                studentHelpTicket={studentHelpTicket}
                facultyHelpTickets={sessionTickets}
              />
            }
          />

          <Route path="/course" element={<EditRoster />} />

          <Route
            path="/createCourse"
            element={<CreateCourse onLoading={handleLoading} />}
          />

          <Route
            path="/startSession"
            element={<StartSession setCurrentView={setCurrentView} />}
          />

          <Route path="/editRoster" element={<EditRoster />} />

          <Route
            path="/helpTickets/create"
            element={<CreateHelpTicket setCurrentView={setCurrentView} />}
          />

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
