import { Box, Button, Divider, TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { joinCourseByCourseCode } from "../services/api/course";
import { COURSE_JOIN_CODE_LENGTH } from "../services/util/constants";
import { sleep } from "../services/util/sleep";
import { useNavigate } from "react-router-dom";

interface Props {
  isLoading: boolean;
  setCurrentView: (val: string) => void;
}

const JoinCourse = ({ isLoading, setCurrentView }: Props) => {
  const [courseCode, setCourseCode] = useState<string>("");
  const [joinCourseSuccessful, setJoinCourseSuccessful] =
    useState<boolean>(false);
  const [courseCodeError, setCourseCodeError] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const navigate = useNavigate();

  function inputIsValid(): boolean {
    // Check that the course code is made up of uppercase letters, numbers, and is of the appropriate length
    const courseCodeRegex = new RegExp(
      `^[A-Z0-9]{${COURSE_JOIN_CODE_LENGTH}}$`
    );
    if (courseCodeRegex.test(courseCode)) {
      return true;
    }
    setErrorMessages([
      "Course codes must be " +
        COURSE_JOIN_CODE_LENGTH.toString() +
        " characters long and consist only of numbers and uppercase letters.",
    ]);
    return false;
  }

  function onSubmit() {
    // Reset the success status and the error messages
    setJoinCourseSuccessful(false);

    if (inputIsValid()) {
      console.log(courseCode);
      joinCourseByCourseCode(courseCode)
        .then(async (res) => {
          console.log(res.status);
          if (res.status == 200) {
            setErrorMessages([]);
            setJoinCourseSuccessful(true);

            // Clear the form input
            setCourseCode("");

            // Set isLoading to true before navigating away
            isLoading = true;

            // Sleep for 2 seconds then redirect the user to the course page view
            await sleep(2000);
            navigate("/");
            setCurrentView("myCourses");
          } else if (res.status == 400) {
            setErrorMessages([
              "Course codes must be " +
                COURSE_JOIN_CODE_LENGTH.toString() +
                " characters long and consist only of numbers and uppercase letters.",
            ]);
          } else if (res.status == 404) {
            setErrorMessages([
              "No course with that course code was found in the system. Please contact your instructor for assistance.",
            ]);
          } else {
            setErrorMessages([
              "There was an unexpected problem while adding you to the course. Please contact your instructor for assistance.",
            ]);
          }
        })
        .catch((error) => {
          console.error(error);
          setErrorMessages([
            "There was an unexpected problem while adding you to the course. Please contact your instructor for assistance.",
          ]);
        });
    }
  }

  function getSuccessMessage() {
    if (joinCourseSuccessful) {
      return (
        <Box>
          <Box sx={{ width: "80%", display: "flex", justifyContent: "center" }}>
            <Alert
              severity="success"
              sx={{
                m: "auto",
                mt: "25px",
                borderRadius: "20px",
                width: "fit-content",
              }}
            >
              Success! You've been added to a course. Redirecting you now...
            </Alert>
          </Box>
          <Box sx={{ width: "80%", display: "flex", justifyContent: "center" }}>
            <CircularProgress color="success" sx={{ mt: "25px" }} />
          </Box>
        </Box>
      );
    }
    return null;
  }

  function getErrorMessages() {
    return errorMessages.map(function (msg) {
      return (
        <Box
          key={msg}
          sx={{ width: "80%", display: "flex", justifyContent: "center" }}
        >
          <Alert
            severity="error"
            sx={{
              mt: "15px",
              borderRadius: "20px",
              width: "fit-content",
            }}
          >
            {msg}
          </Alert>
        </Box>
      );
    });
  }

  return (
    <Box sx={{ width: "70%", height: "100%", m: "auto", userSelect: "none" }}>
      <Typography
        sx={{
          fontSize: "35px",
          fontWeight: "bold",
          mt: "20px",
          ml: 0,
          display: "inline-block",
          width: "100%",
        }}
      >
        Join a course
      </Typography>
      <Divider
        sx={{ borderTop: "1px solid black", width: "80%", mb: "10px" }}
      />
      <Typography
        sx={{
          fontSize: "35px",
          display: "inline-block",
          width: "80%",
        }}
      >
        You can join a course using the course join code provided by your
        instructor:
      </Typography>
      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
          mt: "20px",
          width: "80%",
        }}
      >
        <TextField
          required
          label="Course code"
          id="course-description"
          value={courseCode}
          inputProps={{ style: { fontSize: "20px" } }} // Adjust the font size as needed
          sx={{
            width: "300px",
            mr: "30px",
            "& .MuiInputLabel-root": {
              paddingTop: "4px",
            },
          }}
          onChange={(e) => {
            setCourseCode(e.target.value);
            setCourseCodeError(false);
          }}
          error={courseCodeError}
        />
        <Button
          id="create-course-button"
          sx={{
            display: "block",
            fontSize: 20,
            backgroundColor: "#CC0000",
            ":hover": {
              backgroundColor: "#9e0000",
            },
          }}
          variant="contained"
          onClick={() => onSubmit()}
        >
          Join course
        </Button>
      </Box>
      {getSuccessMessage()}
      {getErrorMessages()}
    </Box>
  );
};

export default JoinCourse;
