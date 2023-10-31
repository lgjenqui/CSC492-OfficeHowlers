import AddIcon from "@mui/icons-material/Add";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import StartIcon from "@mui/icons-material/Start";
import {
  Box,
  Card,
  CardContent,
  Divider,
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
import { useEffect, useState } from "react";
import Course from "../../../../Models/course.model";
import { getCourses } from "../../services/api/course";

interface Props {
  onCourseClick: (courseUUID: string) => void;
  onInstructorOptionsClick: (options: string) => void;
}

const instructorOptions = [
  "Create course",
  "Create help ticket",
  "Start help session",
  "Course analytics",
  "Settings",
];

const card = (course: string, courseDescription: string) => {
  return (
    <Box
      sx={{
        width: "550px",
        ":hover": {
          cursor: "pointer",
        },
        ":active": {
          backgroundColor: "#9e0000",
        },
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 42, mb: "0" }}>{course}</Typography>
        <Typography sx={{ fontSize: 23 }}>{courseDescription}</Typography>
        <Divider
          sx={{ borderTop: "1px solid white", width: "80%", mb: "10px" }}
        />
        <Typography sx={{ fontSize: 20 }} variant="body2">
          Enrolled as Instructor
        </Typography>
      </CardContent>
    </Box>
  );
};

function getCourseCards(courses: Course[], onCourseClick: (courseUUID:string) => void) {
  if (!courses) {
    return <h1>Still loading courses...</h1>;
  }

  return courses.map((course, index) => (
    <Grid item key={index}>
      <Card
        sx={{
          mt: "20px",
          backgroundColor: "#CC0000",
          backgroundClip: "padding-box",
          color: "white",
          borderRadius: "15px",
        }}
        onClick={()=> onCourseClick(course.id)}
      >
        {card(course.name, course.description)}
      </Card>
    </Grid>
  ));
}

const getIcon = (index: number) => {
  if (index == 0) return <AddIcon />;
  else if (index == 1) return <PersonAddAltIcon />;
  else if (index == 2) return <StartIcon />;
  else if (index == 3) return <AssessmentIcon />;
  else return <SettingsIcon />;
};

const Instructor = ({ onCourseClick, onInstructorOptionsClick }: Props) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [coursesLoadedSuccessfully, setCoursesLoadedSuccessfully] = useState<
    boolean | null
  >(null);

  // Check if new courses have been created when the component is reloaded
  useEffect(() => {
    getCourses()
      .then((res) => {
        setCourses(res.instructorCourses);
        setCoursesLoadedSuccessfully(true);
      })
      .catch((err) => {
        setCoursesLoadedSuccessfully(false);
        console.error(err);
      });
  }, []);

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
          {instructorOptions.map((option, index) => (
            <ListItem
              onClick={() => onInstructorOptionsClick(option)}
              key={index}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>{getIcon(index)}</ListItemIcon>
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
        {coursesLoadedSuccessfully && courses.length > 0 ? (
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
        ) : null}
        {coursesLoadedSuccessfully && courses.length == 0 ? (
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
        {!coursesLoadedSuccessfully ? (
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
          {getCourseCards(courses, onCourseClick)}
        </Grid>
      </Box>
    </Grid>
  );
};

export default Instructor;
