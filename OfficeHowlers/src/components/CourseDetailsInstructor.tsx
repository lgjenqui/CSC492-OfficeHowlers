import { Box, Button } from "@mui/material/";
import CourseModel from "../../../Models/course.model";
import { useState } from "react";
import EditRoster from "./EditRoster";
import CourseInfo from "./courseInfo";

interface Props {
  displayedCourse: CourseModel | null;
  setDisplayedCourse: (course: CourseModel | null) => void;
  setDisplayedCourseRole: (role: string | null) => void;
}

const CourseDetailsInstructor = ({
  displayedCourse,
  setDisplayedCourse,
  setDisplayedCourseRole,
}: Props) => {
  const [selectedCourseOption, setSelectedCourseOption] = useState<
    string | null
  >("courseInfo");

  function getSelectedCourseOptionView() {
    if (selectedCourseOption == "courseInfo") {
      return <CourseInfo course={displayedCourse} />;
    } else if (selectedCourseOption == "manageRoster") {
      return <Box>edit roster</Box>;
    } else if (selectedCourseOption == "accessCode") {
      return <Box>access code</Box>;
    }
  }

  return (
    <Box>
      <Button
        sx={{
          fontSize: 20,
          backgroundColor: "#CC0000",
          ":hover": {
            backgroundColor: "#9e0000",
          },
          mr: "50px",
        }}
        variant="contained"
        onClick={() => {
          setDisplayedCourse(null);
          setDisplayedCourseRole(null);
        }}
      >
        View all courses
      </Button>
      <Button
        sx={{
          fontSize: 20,
          backgroundColor: "#CC0000",
          ":hover": {
            backgroundColor: "#9e0000",
          },
          mr: "50px",
        }}
        variant="contained"
        onClick={() => setSelectedCourseOption("courseInfo")}
      >
        Course Info
      </Button>
      <Button
        sx={{
          fontSize: 20,
          backgroundColor: "#CC0000",
          ":hover": {
            backgroundColor: "#9e0000",
          },
          mr: "50px",
        }}
        variant="contained"
        onClick={() => setSelectedCourseOption("manageRoster")}
      >
        Manage Roster
      </Button>
      <Button
        sx={{
          fontSize: 20,
          backgroundColor: "#CC0000",
          ":hover": {
            backgroundColor: "#9e0000",
          },
          mr: "50px",
        }}
        variant="contained"
        onClick={() => setSelectedCourseOption("accessCode")}
      >
        Access Code
      </Button>
      {getSelectedCourseOptionView()}
    </Box>
  );
};

export default CourseDetailsInstructor;
