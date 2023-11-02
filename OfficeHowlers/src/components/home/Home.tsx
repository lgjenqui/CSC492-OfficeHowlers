import AddIcon from "@mui/icons-material/Add";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import StartIcon from "@mui/icons-material/Start";
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
import Course from "../../../../Models/course.model";
import CourseCards from "../courseCards/CourseCards";
import UserModel from "../../../../Models/user.model";

interface Props {
  user: UserModel | null;
  instructorCourses: Course[];
  assistantCourses: Course[];
  studentCourses: Course[];
  coursesLoadedSuccessfully: boolean | null;
  onOptionsClick: (options: string) => void;
}

const instructorOptions = [
  "Create course",
  "Start help session",
  "Course analytics",
  "Settings",
];

const studentOptions = ["Create help ticket", "Settings"];

const getIcon = (option: String) => {
  if (option == "Create course") return <AddIcon />;
  else if (option == "Create help ticket") return <PersonAddAltIcon />;
  else if (option == "Start help session") return <StartIcon />;
  else if (option == "Course analytics") return <AssessmentIcon />;
  else return <SettingsIcon />;
};

const Home = ({
  user,
  instructorCourses,
  assistantCourses,
  studentCourses,
  coursesLoadedSuccessfully,
  onOptionsClick,
}: Props) => {
  function getMenuOptions(user: UserModel | null) {
    if (!user) {
      return instructorOptions;
    }

    if (studentCourses.length > 0) {
      if (assistantCourses.length > 0) {
        return instructorOptions;
      }
      return studentOptions;
    }

    if (instructorCourses.length > 0 || assistantCourses.length > 0) {
      return instructorOptions;
    }

    // If the user belongs to no courses yet, use their primary role to determine their view
    if (user.primaryRole == "student") {
      return studentOptions;
    }
    return instructorOptions;
  }

  // Check if new courses have been created when the component is reloaded
  // useEffect(() => {
  //   getCourses()
  //     .then((res) => {
  //       console.log(res);
  // setInstructorCourses(res.instructorCourses);
  // setAssistantCourses(res.assistantCourses);
  // setStudentCourses(res.studentCourses);
  //       setCoursesLoadedSuccessfully(true);
  //     })
  //     .catch((err) => {
  //       setCoursesLoadedSuccessfully(false);
  //       console.error(err);
  //     });
  // }, []);

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
      <Box sx={{ width: "70%", height: "100%", m: "auto", userSelect: "none" }}>
        <Typography
          sx={{
            fontSize: "35px",
            fontWeight: "bold",
            mt: "20px",
            display: "inline-block",
            width: "100%",
          }}
        >
          My courses
        </Typography>
        {coursesLoadedSuccessfully &&
        instructorCourses.length +
          assistantCourses.length +
          studentCourses.length ==
          0 ? (
          <Typography
            sx={{
              fontSize: "35px",
              mt: "20px",
              display: "inline-block",
              width: "100%",
            }}
          >
            It looks like you have no courses. Use the 'Create course' menu to
            the left to create one.
          </Typography>
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
            There was an unexpected problem while fetching your courses. <br />
            <br /> Please <strong>reload the page</strong> to try again.
          </Alert>
        ) : null}

        <Grid sx={{ flexGrow: 1 }} container spacing={3}>
          <CourseCards
            courses={instructorCourses}
            role="Instructor"
          ></CourseCards>
          <CourseCards
            courses={assistantCourses}
            role="Teaching Assistant"
          ></CourseCards>
          <CourseCards courses={studentCourses} role="Student"></CourseCards>
          {/* {getCourseCards(courses, onCourseClick)} */}
        </Grid>
      </Box>
    </Grid>
  );
};

export default Home;
