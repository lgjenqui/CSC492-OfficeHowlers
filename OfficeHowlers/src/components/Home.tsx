import AddIcon from "@mui/icons-material/Add";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import StartIcon from "@mui/icons-material/Start";
import QueueIcon from "@mui/icons-material/Queue";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Typography from "@mui/material/Typography";
import CourseModel from "../../../Models/course.model";
import CourseCards from "./CourseCards";
import UserModel from "../../../Models/user.model";
import CircularProgress from "@mui/material/CircularProgress";

interface Props {
  user: UserModel | null;
  instructorCourses: CourseModel[];
  assistantCourses: CourseModel[];
  studentCourses: CourseModel[];
  coursesLoadedSuccessfully: boolean | null;
  onOptionsClick: (options: string) => void;
  isLoading: boolean;
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
  else return <SettingsIcon />;
};

const Home = ({
  user,
  instructorCourses,
  assistantCourses,
  studentCourses,
  coursesLoadedSuccessfully,
  onOptionsClick,
  isLoading,
}: Props) => {
  function getMenuOptions(user: UserModel | null): string[] {
    let options: string[] = [];
    if (!user) {
      return [];
    }

    if (instructorCourses.length > 0 || true) {
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

    // Every user can change their settings!
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

  // If coursesLoadedSuccessfully is set to false, that means the requests have gone through and there was an error!
  // if (coursesLoadedSuccessfully == false) {
  //   return (
  //     <Box sx={{ m: "auto" }}>
  //       <Typography
  //         sx={{
  //           fontSize: 45,
  //           fontWeight: "bold",
  //           mt: "50px",
  //           textAlign: "center",
  //         }}
  //       >
  //         Uh-oh...
  //       </Typography>
  //       <Typography
  //         sx={{
  //           fontSize: 30,
  //           mt: "20px",
  //           textAlign: "center",
  //         }}
  //       >
  //         There was a problem fetching your information. Please refresh the page
  //         to try again.
  //       </Typography>
  //     </Box>
  //   );
  // }

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
        <Box
          sx={{ width: "70%", height: "100%", m: "auto", userSelect: "none" }}
        >
          {coursesLoadedSuccessfully &&
          instructorCourses.length +
            assistantCourses.length +
            studentCourses.length ===
            0 ? (
            <Box>
              <Typography
                sx={{
                  fontSize: "35px",
                  fontWeight: "bold",
                  mt: "20px",
                  ml: 0,
                  display: "inline-block",
                  width: "100%",
                }}
              >
                My courses
              </Typography>
              <Typography
                sx={{
                  fontSize: "35px",
                  display: "inline-block",
                  width: "100%",
                }}
              >
                It looks like you have no courses. Use the{" "}
                <b>
                  {user.primaryRole == "student"
                    ? "'Join a course' "
                    : "'Create course' "}
                </b>
                option to the left to{" "}
                {user.primaryRole == "student" ? "join" : "create"} one.
              </Typography>
            </Box>
          ) : null}
          {coursesLoadedSuccessfully == false ? (
            <Alert
              sx={{
                fontSize: "35px",
                width: "60%",
                borderRadius: "15px",
                "& .MuiAlert-icon": {
                  fontSize: 40,
                },
              }}
              severity="error"
            >
              <AlertTitle sx={{ fontWeight: "bold", fontSize: "35px" }}>
                Error
              </AlertTitle>
              There was an unexpected problem while fetching your information.
              <br />
              <br /> Please <strong>reload the page</strong> to try again.
            </Alert>
          ) : null}

          {instructorCourses.length +
            assistantCourses.length +
            studentCourses.length >
          0 ? (
            <Box>
              <Typography
                sx={{
                  fontSize: "35px",
                  fontWeight: "bold",
                  mt: "20px",
                  ml: 0,
                  display: "inline-block",
                  width: "100%",
                }}
              >
                My courses
              </Typography>
              {instructorCourses.length > 0 ? (
                <CourseCards
                  courses={instructorCourses}
                  role="Instructor"
                ></CourseCards>
              ) : null}

              {assistantCourses.length > 0 ? (
                <CourseCards
                  courses={assistantCourses}
                  role="Assistant"
                ></CourseCards>
              ) : null}

              {studentCourses.length > 0 ? (
                <CourseCards
                  courses={studentCourses}
                  role="Student"
                ></CourseCards>
              ) : null}
            </Box>
          ) : null}
        </Box>
      </Grid>
    );
  }
};

export default Home;
