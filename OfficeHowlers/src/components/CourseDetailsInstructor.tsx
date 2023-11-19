import { Box, Button } from "@mui/material/";
import CourseModel from "../../../Models/course.model";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditRoster from "./EditRoster";
import CourseInfo from "./courseInfo";

interface Props {
  displayedCourse: CourseModel | null;
  setDisplayedCourse: (course: CourseModel | null) => void;
  setDisplayedCourseRole: (role: string | null) => void;
}

const BUTTONS = {
  COURSE_INFO: "courseInfo",
  MANAGE_ROSTER: "manageRoster",
  ACCESS_CODE: "accessCode",
};

const CourseDetailsInstructor = ({
  displayedCourse,
  setDisplayedCourse,
  setDisplayedCourseRole,
}: Props) => {
  const [selectedCourseOption, setSelectedCourseOption] = useState<
    string | null
  >("courseInfo");

  function getSelectedCourseOptionView() {
    if (selectedCourseOption == BUTTONS.COURSE_INFO) {
      return <CourseInfo course={displayedCourse} />;
    } else if (selectedCourseOption == BUTTONS.MANAGE_ROSTER) {
      return <Box>edit roster</Box>;
    } else if (selectedCourseOption == BUTTONS.ACCESS_CODE) {
      return <Box>access code</Box>;
    }
  }

  return (
    <Box>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Button
          sx={{
            fontSize: 20,
            backgroundColor: "#CC0000",
            ":hover": {
              backgroundColor: "#9e0000",
            },
            mr: "50px",
            ...(selectedCourseOption === BUTTONS.COURSE_INFO && {
              className: "selectedButton",
            }),
          }}
          variant="contained"
          onClick={() => setSelectedCourseOption(BUTTONS.COURSE_INFO)}
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
          onClick={() => setSelectedCourseOption(BUTTONS.MANAGE_ROSTER)}
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
          onClick={() => setSelectedCourseOption(BUTTONS.ACCESS_CODE)}
        >
          Access Code
        </Button>
      </Box>
      {getSelectedCourseOptionView()}
    </Box>
  );
};

export default CourseDetailsInstructor;
