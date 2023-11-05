import AddIcon from "@mui/icons-material/Add";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import StartIcon from "@mui/icons-material/Start";
import QueueIcon from "@mui/icons-material/Queue";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
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
import { useState } from "react";
import ViewHelpTickets from "./ViewHelpTickets";
import ViewCourses from "./ViewCourses";

interface Props {
  user: UserModel | null;
  instructorCourses: CourseModel[];
  assistantCourses: CourseModel[];
  studentCourses: CourseModel[];
  coursesLoadedSuccessfully: boolean | null;
  isLoading: boolean;
  viewMyCourses: boolean;
  setViewMyCourses: (val: boolean) => void;
}

const instructorOptions = [
  "Create course",
  "Start help session",
  "Course analytics",
];

const assistantOptions = ["Start help session"];

const studentOptions = ["Join a course", "Create help ticket"];

const getIcon = (option: String) => {
  if (option == "Create course") return <AddIcon />;
  else if (option == "Create help ticket") return <PersonAddAltIcon />;
  else if (option == "Start help session") return <StartIcon />;
  else if (option == "Course analytics") return <AssessmentIcon />;
  else if (option == "Join a course") return <QueueIcon />;
  else if (option == "My help tickets") return <ReceiptLongIcon />;
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
  viewMyCourses,
  setViewMyCourses,
}: Props) => {
  var navigate = useNavigate();

  function onOptionsClick(option: string) {
    if (option == "Create course") navigate("/createCourse");
    else if (option == "Start help session") navigate("/startSession");
    else if (option == "Create help ticket") navigate("/helpTickets/create");
    else if (option == "My help tickets") setViewMyCourses(false);
    else if (option == "My courses") setViewMyCourses(true);
    else navigate("/deadend");
  }

  function getMenuOptions(user: UserModel | null): string[] {
    let options: string[] = [];
    if (!user) {
      return [];
    }

    // Every user can view their courses and tickets
    options.push("My courses");
    options.push("My help tickets");

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

  if (user && isLoading == false) {
    return (
      <Grid sx={{ flexGrow: 1, mt: "20px" }} container spacing={3}>
        <Box
          sx={{
            width: "20%",
            height: "min-height: 1000px",
            m: "auto",
            ml: "50px",
            mt: "50px",
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
        {viewMyCourses ? (
          <ViewCourses
            user={user}
            instructorCourses={instructorCourses}
            assistantCourses={assistantCourses}
            studentCourses={studentCourses}
            coursesLoadedSuccessfully={coursesLoadedSuccessfully}
          />
        ) : (
          <ViewHelpTickets />
        )}
      </Grid>
    );
  }
};

export default Home;
