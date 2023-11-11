import AddIcon from "@mui/icons-material/Add";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import StartIcon from "@mui/icons-material/Start";
import QueueIcon from "@mui/icons-material/Queue";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import BackHandIcon from "@mui/icons-material/BackHand";
import SchoolIcon from "@mui/icons-material/School";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CourseModel from "../../../Models/course.model";
import UserModel from "../../../Models/user.model";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import ViewHelpTickets from "./ViewHelpTicket";
import ViewCourses from "./ViewCourses";
import ViewHelpSession from "./ViewHelpSession";
import TicketWrapperModel from "../../../Models/ticketWrapper.model";
import JoinCourse from "./JoinCourse";
import CreateHelpTicket from "./CreateHelpTicket";

interface Props {
  user: UserModel | null;
  instructorCourses: CourseModel[];
  assistantCourses: CourseModel[];
  studentCourses: CourseModel[];
  coursesLoadedSuccessfully: boolean | null;
  isLoading: boolean;
  currentView: string;
  setCurrentView: (val: string) => void;
  studentHelpTicket: TicketWrapperModel | null;
  facultyHelpTickets: TicketWrapperModel[];
  fetchCourses: () => void;
}

const instructorOptions = [
  "My help session",
  "Create course",
  "Start help session",
  "Course analytics",
];

const assistantOptions = ["My help session", "Start help session"];

const studentOptions = ["Join a course", "Create help ticket"];

const getIcon = (option: String) => {
  if (option == "Create course") return <AddIcon />;
  else if (option == "Create help ticket") return <PersonAddAltIcon />;
  else if (option == "Start help session") return <StartIcon />;
  else if (option == "Course analytics") return <AssessmentIcon />;
  else if (option == "Join a course") return <QueueIcon />;
  else if (option == "My help ticket") return <ReceiptLongIcon />;
  else if (option == "My help session") return <BackHandIcon />;
  else if (option == "My courses") return <SchoolIcon />;
  else return <SettingsIcon />;
};

const Home = ({
  user,
  instructorCourses,
  assistantCourses,
  studentCourses,
  coursesLoadedSuccessfully,
  isLoading,
  currentView,
  setCurrentView,
  studentHelpTicket,
  facultyHelpTickets,
  fetchCourses,
}: Props) => {
  var navigate = useNavigate();

  function onOptionsClick(option: string) {
    if (option == "Create course") navigate("/createCourse");
    else if (option == "Start help session") navigate("/startSession");
    else if (option == "Create help ticket") setCurrentView("createHelpTicket");
    else if (option == "My help ticket") setCurrentView("studentTicket");
    else if (option == "My help session") setCurrentView("helpSession");
    else if (option == "My courses") setCurrentView("myCourses");
    else if (option == "Join a course") setCurrentView("joinCourse");
    else navigate("/deadend");
  }

  function getMenuOptions(user: UserModel | null): string[] {
    let options: string[] = [];
    if (!user) {
      return [];
    }

    // Every user can view their courses
    options.push("My courses");

    // Users with a student help ticket open can view it
    if (studentHelpTicket) {
      options.push("My help ticket");
    }

    // Users with faculty help tickets can view them through their active session
    // if (facultyHelpTickets.length > 0) {
    //   options.push("My help session");
    // }

    if (instructorCourses.length > 0) {
      options = options.concat(instructorOptions);
    }

    if (assistantCourses.length > 0 && instructorCourses.length == 0) {
      options = options.concat(assistantOptions);
    }

    if (studentCourses.length > 0) {
      options = options.concat(studentOptions);
    }

    // If the user belongs to no courses yet, use their primary role to determine their view
    if (
      instructorCourses.length +
        assistantCourses.length +
        studentCourses.length ==
      0
    ) {
      if (user.primaryRole === "faculty") {
        options = options.concat(instructorOptions);
      } else {
        // Until a TA is added to a course as a TA, give them the student options
        options = options.concat(studentOptions);
      }
    }

    // Every user can change their settings
    options.push("Settings");

    return options;
  }

  // Don't render the page until the user has been retrieved and passed in from the parent component (App.tsx)
  if (isLoading === true) {
    return (
      <Box
        sx={{
          textAlign: "center",
          m: "auto",
          mt: "50px",
        }}
      >
        <CircularProgress color="success" size="120px" />
      </Box>
    );
  }

  function getCurrentView() {
    if (currentView == "myCourses") {
      return (
        <ViewCourses
          user={user}
          instructorCourses={instructorCourses}
          assistantCourses={assistantCourses}
          studentCourses={studentCourses}
          coursesLoadedSuccessfully={coursesLoadedSuccessfully}
        />
      );
    }
    if (currentView == "studentTicket") {
      return <ViewHelpTickets studentHelpTicket={studentHelpTicket} />;
    }
    if (currentView == "helpSession") {
      return <ViewHelpSession tickets={facultyHelpTickets} />;
    }
    if (currentView == "joinCourse") {
      return (
        <JoinCourse
          isLoading={isLoading}
          setCurrentView={setCurrentView}
          fetchCourses={fetchCourses}
        />
      );
    }
    if (currentView == "createHelpTicket") {
      return (
        <CreateHelpTicket setCurrentView={setCurrentView}></CreateHelpTicket>
      );
    }
  }

  if (user && isLoading == false) {
    return (
      <Grid sx={{ flexGrow: 1, mt: "35px" }} container spacing={3}>
        <Box
          sx={{
            width: "20%",
            height: "min-height: 1000px",
            m: "auto",
            ml: "50px",
            mt: 0,
            userSelect: "none",
            borderRight: "1px solid black",
          }}
        >
          <List>
            {getMenuOptions(user).map((option, index) => (
              <ListItem
                onClick={() => onOptionsClick(option)}
                key={index}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon>{getIcon(option)}</ListItemIcon>
                  <ListItemText
                    sx={{ fontSize: "25px" }}
                    disableTypography
                    primary={option}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        {getCurrentView()}
      </Grid>
    );
  }
};

export default Home;
