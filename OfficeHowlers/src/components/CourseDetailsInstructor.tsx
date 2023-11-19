import { Box, Button } from "@mui/material/";
import CourseModel from "../../../Models/course.model";
import { useState } from "react";
import EditRoster from "./EditRoster";
import CourseInfo from "./CourseInfo";
import CourseJoinCode from "./CourseJoinCode";

interface Props {
  displayedCourse: CourseModel | null;
}

const BUTTONS = {
  COURSE_INFO: "courseInfo",
  MANAGE_ROSTER: "manageRoster",
  JOIN_CODE: "joinCode",
};

const CourseDetailsInstructor = ({ displayedCourse }: Props) => {
  const [selectedCourseOption, setSelectedCourseOption] = useState<
    string | null
  >(BUTTONS.COURSE_INFO);

  const selectedButtonStyle = {
    bgcolor: "white",
    color: "#CC0000",
    borderRadius: "20px",
    border: "2px solid grey",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    "&:hover": {
      bgcolor: "#f0f0f0",
    },
  };

  function getSelectedCourseOptionView() {
    if (selectedCourseOption == BUTTONS.COURSE_INFO) {
      return <CourseInfo course={displayedCourse} />;
    } else if (selectedCourseOption == BUTTONS.MANAGE_ROSTER) {
      return <Box>edit roster</Box>;
    } else if (selectedCourseOption == BUTTONS.JOIN_CODE) {
      return <CourseJoinCode course={displayedCourse} />;
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
            ...(selectedCourseOption === BUTTONS.COURSE_INFO
              ? selectedButtonStyle
              : null),
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
            ...(selectedCourseOption === BUTTONS.MANAGE_ROSTER
              ? selectedButtonStyle
              : null),
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
            ...(selectedCourseOption === BUTTONS.JOIN_CODE
              ? selectedButtonStyle
              : null),
          }}
          variant="contained"
          onClick={() => setSelectedCourseOption(BUTTONS.JOIN_CODE)}
        >
          Join Code
        </Button>
      </Box>
      {getSelectedCourseOptionView()}
    </Box>
  );
};

export default CourseDetailsInstructor;
