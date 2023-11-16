import { Box, Button, Typography, Divider } from "@mui/material";
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
      <Box
        sx={{
          width: "70%",
          height: "100%",
          mt: 0,
        }}
      >
        <Typography
          sx={{ fontSize: 38, fontWeight: "bold", mb: "5px" }}
          variant="body2"
        >
          {displayedCourse.name}{" "}
        </Typography>
        <Divider
          sx={{ borderTop: "1px solid black", width: "80%", mb: "10px" }}
        />
        <Typography sx={{ fontSize: 20 }} variant="body2">
          Enrolled as {displayedCourseRole}{" "}
        </Typography>
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
