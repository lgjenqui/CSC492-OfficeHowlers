import { Box, Typography, Divider, Button } from "@mui/material";
import CourseModel from "../../../Models/course.model";
import CourseDetailsStudent from "./CourseDetailsStudent";
import CourseDetailsInstructor from "./CourseDetailsInstructor";
import CourseDetailsAssistant from "./CourseDetailsAssistant";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface Props {
  displayedCourse: CourseModel | null;
  displayedCourseRole: string | null;
  setDisplayedCourse: (course: CourseModel | null) => void;
  setDisplayedCourseRole: (role: string | null) => void;
}

const CourseDetails = ({
  displayedCourse,
  displayedCourseRole,
  setDisplayedCourse,
  setDisplayedCourseRole,
}: Props) => {
  function getCourseDetailsByRole() {
    if (displayedCourseRole == "Student") {
      return <CourseDetailsStudent />;
    } else if (displayedCourseRole == "Instructor") {
      return <CourseDetailsInstructor displayedCourse={displayedCourse} />;
    }
    return <CourseDetailsAssistant />;
  }

  if (displayedCourse) {
    return (
      <Box
        sx={{
          width: "85%",
          height: "100%",
          mt: 0,
        }}
      >
        <Typography
          sx={{
            fontSize: 45,
            fontWeight: "bold",
            mb: "5px",
            display: "inline",
          }}
          variant="body2"
        >
          {displayedCourse.name}{" "}
        </Typography>
        <Typography sx={{ fontSize: 20, display: "inline" }} variant="body2">
          Enrolled as {displayedCourseRole}{" "}
        </Typography>
        <Button
          sx={{
            backgroundColor: "#CC0000",
            ":hover": {
              backgroundColor: "#9e0000",
            },
            mr: "50px",
            mb: "10px",
            display: "flex",
            fontSize: "20px",
          }}
          variant="contained"
          onClick={() => {
            setDisplayedCourse(null);
            setDisplayedCourseRole(null);
          }}
        >
          <ArrowBackIcon
            sx={{ fontSize: 30, m: "auto", verticalAlign: "center" }}
          />{" "}
          <span style={{ marginLeft: "10px" }}>View all courses</span>
        </Button>
        <Divider
          sx={{ borderTop: "1px solid black", width: "90%", mb: "10px" }}
        />
        {getCourseDetailsByRole()}
      </Box>
    );
  }
  return null;
};

export default CourseDetails;
