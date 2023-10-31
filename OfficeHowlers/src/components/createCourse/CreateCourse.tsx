import { Box, Button, Divider, Grid, TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCourse } from "../../services/api/course";
import { sleep } from "../../services/util/sleep";

const CreateCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [courseNameError, setCourseNameError] = useState<boolean>(false);
  const [courseDescError, setCourseDescError] = useState<boolean>(false);
  const [startDateError, setStartDateError] = useState<boolean>(false);
  const [endDateError, setEndDateError] = useState<boolean>(false);
  const [courseCreationSuccessful, setCourseCreationSuccessful] =
    useState<boolean>(false);

  // Checks if the provided input is valid
  function inputIsValid(): boolean {
    // Reset the error values
    setCourseNameError(false);
    setCourseDescError(false);
    setStartDateError(false);
    setEndDateError(false);
    let newErrorMessages: string[] = [];

    // Check if a course name and description are provided
    if (!courseName) {
      newErrorMessages.push("Please provide a course name");
      setCourseNameError(true);
    }

    if (!courseDesc) {
      newErrorMessages.push("Please provide a course description");
      setCourseDescError(true);
    }

    // Check if the start and end date are provided
    if (!startDate) {
      newErrorMessages.push("Please provide a course start date");
      setStartDateError(true);
    }

    if (!endDate) {
      newErrorMessages.push("Please provide a course end date");
      setEndDateError(true);
    }

    // Check if the start and end date are valid dates
    if (startDate && endDate) {
      // The end date must be later than the start date - passing in "day" checks the month, day, and year (default is milliseconds)
      if (
        startDate.isSame(endDate, "day") ||
        startDate.isAfter(endDate, "day")
      ) {
        newErrorMessages.push(
          "The course end date must be later than the course start date"
        );
        setEndDateError(true);
      }

      // The start and end dates can be no earlier than today
      if (startDate.isBefore(dayjs(), "day")) {
        newErrorMessages.push(
          "The course start date can be no earlier than today"
        );
        setStartDateError(true);
      }

      if (endDate.isBefore(dayjs(), "day")) {
        newErrorMessages.push(
          "The course end date can be no earlier than today"
        );
        setEndDateError(true);
      }
    }

    // Update the value of the error messages array and return a boolean indicating whether the input was valid
    setErrorMessages(newErrorMessages);

    if (newErrorMessages.length > 0) {
      return false;
    }
    return true;
  }

  const navigate = useNavigate();

  // Creates a new course
  function onSubmit() {
    // Set the course creation successful to false to clear any success message that may be displayed
    setCourseCreationSuccessful(false);

    // Create the course if there were no errors
    if (inputIsValid() && startDate != null && endDate != null) {
      createCourse(courseName, courseDesc, startDate, endDate)
        .then(async (res) => {
          if (res.status == 201) {
            setCourseCreationSuccessful(true);

            // Clear the form input
            setCourseName("");
            setCourseDesc("");
            setStartDate(null);
            setEndDate(null);

            // Sleep for 2 seconds then redirect the user to their home page
            await sleep(2000);
            navigate("/instructor");
          }
        })
        .catch((error) => {
          console.error(error);
          setCourseCreationSuccessful(false);
          setErrorMessages([
            "There was an unexpected problem while creating the course. Please try again.",
          ]);
        });
    }
  }

  // Create a message to display if course creation was successful or unsuccessful
  let requestStatusMsg = null;
  if (courseCreationSuccessful) {
    requestStatusMsg = (
      <>
        <Alert
          severity="success"
          sx={{
            mt: "15px",
            borderRadius: "20px",
            width: "fit-content",
          }}
        >
          Success! Your new course has been created. Redirecting you now...
        </Alert>
        <CircularProgress color="success" sx={{ mt: "15px" }} />
      </>
    );
  }

  return (
    <Box
      sx={{
        width: "60%",
        maxWidth: "1200px",
        m: "auto",
        mt: "20px",
        alignContent: "center",
      }}
    >
      <Typography sx={{ fontSize: 42, mb: "5px" }}>Create a course</Typography>
      <Divider
        sx={{
          borderTop: "1px solid lightgrey",
          width: "100%",
          m: "auto",
          mb: "20px",
        }}
      />
      <Grid
        sx={{ flexGrow: 1, justifyContent: "center" }}
        container
        spacing={3}
      >
        <Grid item>
          <Typography sx={{ fontSize: 20, mb: "5px" }}>Course Name</Typography>
          <TextField
            required
            label="Course Name"
            id="course-name-field"
            value={courseName}
            sx={{ mr: "20px" }}
            onChange={(e) => {
              setCourseName(e.target.value);
              setCourseNameError(false);
            }}
            error={courseNameError}
          />
        </Grid>
        <Grid item>
          <Typography sx={{ fontSize: 20, mb: "5px" }}>
            Course Description
          </Typography>
          <TextField
            required
            label="Course Description"
            id="course-description"
            value={courseDesc}
            sx={{ mr: "20px" }}
            onChange={(e) => {
              setCourseDesc(e.target.value);
              setCourseDescError(false);
            }}
            error={courseDescError}
          />
        </Grid>
        <Grid item>
          <Typography sx={{ fontSize: 20, mb: "5px" }}>
            Course start date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={dayjs(startDate)}
              onChange={(date) => {
                setStartDate(date);
                setStartDateError(false);
              }}
              slotProps={{
                textField: {
                  error: startDateError,
                  id: "start-date-field",
                },
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item>
          <Typography sx={{ fontSize: 20, mb: "5px" }}>
            Course end date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={dayjs(endDate)}
              onChange={(date) => {
                setEndDate(date);
                setEndDateError(false);
              }}
              slotProps={{
                textField: {
                  error: endDateError,
                  id: "end-date-field",
                },
              }}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
      <Box
        sx={{
          width: "50%",
          alignContent: "center",
          m: "auto",
          mt: "25px",
          textAlign: "center",
        }}
      >
        <Button
          id="create-course-button"
          sx={{
            fontSize: 20,
            backgroundColor: "#CC0000",
            ":hover": {
              backgroundColor: "#9e0000",
            },
          }}
          variant="contained"
          onClick={() => onSubmit()}
        >
          Create course
        </Button>
      </Box>
      <Box
        sx={{
          textAlign: "center",
          m: "auto",
        }}
      >
        {requestStatusMsg}
        {errorMessages.map(function (msg) {
          return (
            <Alert
              key={msg}
              severity="error"
              sx={{
                mt: "15px",
                borderRadius: "20px",
                width: "fit-content",
              }}
            >
              {msg}
            </Alert>
          );
        })}
      </Box>
    </Box>
  );
};

export default CreateCourse;
