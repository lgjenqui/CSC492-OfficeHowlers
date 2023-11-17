import { Box, Typography, Divider } from "@mui/material";
import CourseModel from "../../../Models/course.model";
import CourseDetailsStudent from "./CourseDetailsStudent";
import CourseDetailsInstructor from "./CourseDetailsInstructor";
import CourseDetailsAssistant from "./CourseDetailsAssistant";

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
      return (
        <CourseDetailsInstructor
          setDisplayedCourse={setDisplayedCourse}
          setDisplayedCourseRole={setDisplayedCourseRole}
        />
      );
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
            fontSize: 38,
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
