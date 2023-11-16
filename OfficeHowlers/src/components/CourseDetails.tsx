import { Box, Button } from "@mui/material";
import CourseModel from "../../../Models/course.model";

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
  if (displayedCourse) {
    return (
      <Box>
        <h1>
          Course details {displayedCourse.name} as {displayedCourseRole}{" "}
        </h1>
        <Button
          sx={{
            fontSize: 20,
            backgroundColor: "#CC0000",
            ":hover": {
              backgroundColor: "#9e0000",
            },
          }}
          variant="contained"
          onClick={() => {
            setDisplayedCourse(null);
            setDisplayedCourseRole(null);
          }}
        >
          Back
        </Button>
      </Box>
    );
  }
  return null;
};

export default CourseDetails;
