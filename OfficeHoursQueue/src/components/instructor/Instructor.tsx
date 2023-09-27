import AddIcon from "@mui/icons-material/Add";
import StartIcon from "@mui/icons-material/Start";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
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
import Typography from "@mui/material/Typography";

interface Props {
  lastName: string;
  salutation: string;
  onCourseClick: () => void;
  onInstructorOptionsClick: (options: string) => void;
}

const courses = ["CSC 116 (001)", "CSC 216 (002)", "CSC 230 (004)"];
const courseDescriptions = [
  "Intro To Computing - Java",
  "Software Development Fundamentals",
  "C and Software Tools",
];
const instructorOptions = [
  "Create course",
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

const getIcon = (index: number) => {
  if (index == 0) return <AddIcon />;
  else if (index == 1) return <StartIcon />;
  else if (index == 2) return <AssessmentIcon />;
  else return <SettingsIcon />;
};

const Instructor = ({
  lastName,
  salutation,
  onCourseClick,
  onInstructorOptionsClick,
}: Props) => {
  return (
    <Grid sx={{ flexGrow: 1, mt: "20px" }} container spacing={3}>
      <Box
        sx={{
          width: "20%",
          height: "min-height: 1000px",
          m: "auto",
          ml: "50px",
          userSelect: "none",
          border: "1px solid black",
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
        <Grid sx={{ flexGrow: 1 }} container spacing={3}>
          {courses.map((course, index) => (
            <Grid item key={index}>
              <Card
                sx={{
                  mt: "20px",
                  backgroundColor: "#CC0000",
                  backgroundClip: "padding-box",
                  color: "white",
                  borderRadius: "15px",
                }}
                onClick={onCourseClick}
              >
                {card(course, courseDescriptions[index])}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Grid>
  );
};

export default Instructor;
