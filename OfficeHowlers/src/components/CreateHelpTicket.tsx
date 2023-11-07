import { Box, Button, Divider, Grid, TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import Course from "../../../Models/course.model";
import { startSession } from "../services/api/session";

const CreateHelpTicket = () => {
  const [open, setOpen] = React.useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<any>([]);
  const [group, setGroup] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tried, setTried] = useState<string>("");
  const [startTime, setStartTime] = React.useState<Dayjs | null>(
    dayjs().add(0, "hour")
  );
  const [endTime, setEndTime] = React.useState<Dayjs | null>(
    dayjs().add(1, "hour")
  );
  const [virtualLocationDisplay, setVirtualLocationDisplay] =
    useState<string>("");
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [selectedCoursesError, setSelectedCoursesError] =
    useState<boolean>(false);
  const [courseError, setCourseError] = useState<boolean>(false);
  const [groupError, setGroupError] = useState<boolean>(false);
  const [descriptionError, setDescriptionError] = useState<boolean>(false);
  const [triedError, setTriedError] = useState<boolean>(false);
  const [inPersonLocationError, setInPersonLocationError] =
    useState<boolean>(false);
  const [virtualLocationDisplayError, setVirtualLocationDisplayError] =
    useState<boolean>(false);

  // Resets all error values so the fields don't display with red outlines and such
  function resetErrorValues(): void {
    setCourseError(false);
    setGroupError(false);
    setDescriptionError(false);
    setTriedError(false);
  }

  // Checks if the provided input is valid
  function inputIsValid(): boolean {
    console.log(virtualLocationDisplay);
    // Reset the error values
    resetErrorValues();

    let newErrorMessages: string[] = [];
    // Check if at least one course was selected
    if (selectedCourses.length <= 0) {
      newErrorMessages.push("Please select a course for this help ticket");
      setCourseError(true);
    }
    var regex = new RegExp("^([\\w-\\.]+@([\\w-]+\\.)+edu,? ?)+$");
    var testStudents = regex.exec(group);
    // Check if at least one mode of delivery was selected
    if (group.length > 0 && testStudents == null) {
      newErrorMessages.push("Incorrect format for group request");
      setGroupError(true);
    }

    if (tried.length <= 0) {
      newErrorMessages.push("Please describe what you have tried so far");
      setTriedError(true);
    }

    if (description.length <= 0) {
      newErrorMessages.push("Please describe the problem you have");
      setDescriptionError(true);
    }

    // Check if one or both of the start and end times was not provided

    // Check a start and end time were provided

    // Check if a virtual location display option is chosen if there's a virtual location

    // Update the value of the error messages array and return a boolean indicating whether the input was valid
    setErrorMessages(newErrorMessages);

    if (newErrorMessages.length > 0) {
      return false;
    }
    return true;
  }

  // Starts a session
  function onSubmit() {
    if (inputIsValid()) {
      console.log("submitting!");
    }
  }

  // Grab the courses for this instructor
  // NOTE - this is grabbing ALL system courses for now
  // useEffect(() => {
  //   let res = getCourses();
  //   res.then((value) => {
  //     setCourses(value);
  //   });
  //   res.catch((error) => {
  //     console.error(error);
  //   });
  // }, []);

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
      <Typography sx={{ fontSize: 42, mb: "5px" }}>
        Create help ticket
      </Typography>
      <Divider
        sx={{ borderTop: "1px solid lightgrey", width: "90%", mb: "20px" }}
      />
      <Grid
        sx={{
          flexGrow: 1,
          justifyContent: "center",
        }}
        container
        spacing={3}
      >
        <Grid sx={{ width: "20%" }} item>
          <Typography sx={{ fontSize: 20, mb: "5px" }}>
            Select your Course
          </Typography>
          <Autocomplete
            sx={{ width: "90%" }}
            id="tags-standard"
            options={courses}
            getOptionLabel={(option: { name: string }) => {
              return option?.name;
            }}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            //value={selectedCourses}
            onChange={(event, newValue) => {
              setSelectedCourses(newValue);
              setCourseError(false);
            }}
            renderInput={(params) => (
              <TextField
                required
                error={courseError}
                {...params}
                variant="standard"
                label="Select a course"
              />
            )}
          />
        </Grid>
        <Grid sx={{ width: "45%" }} item>
          <Typography sx={{ fontSize: 20, mb: "5px" }}>
            Group Request
          </Typography>
          <TextField
            required
            label="Enter emails seperated by commas of who you are working with"
            id="course-name-field"
            sx={{ mr: "20px", width: "100%" }}
            value={group}
            onChange={(e) => {
              setGroup(e.target.value);
              setGroupError(false);
            }}
            error={groupError}
          />
        </Grid>
        <Grid sx={{ width: "35%" }} item>
        <Typography sx={{ fontSize: 20 , mb: "5px" }}>
            What are you working on?
          </Typography>
          <TextField
            required
            label="Assignment"
            id="course-name-field"
            sx={{ mr: "20px", width: "100%" }}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setDescriptionError(false);
            }}
            error={descriptionError}
          />
        </Grid>
        <Grid sx={{ width: "50%" }} item>
          <Typography sx={{ fontSize: 20, mb: "5px" }}>
            What would you like help with?
          </Typography>
          <TextField
            required
            multiline={true}
            rows={3}
            label="Description of what you need help with"
            id="course-name-field"
            sx={{ mr: "20px", width: "100%" }}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setDescriptionError(false);
            }}
            error={descriptionError}
          />
        </Grid>
        <Grid sx={{ width: "50%" }} item>
          <Typography sx={{ fontSize: 20, mb: "5px" }}>
            What have you tried?
          </Typography>
          <TextField
            required
            multiline={true}
            rows={3}
            label="Description of attempts to solve the problem"
            id="course-name-field"
            sx={{ mr: "20px", width: "100%" }}
            value={tried}
            onChange={(e) => {
              setTried(e.target.value);
              setTriedError(false);
            }}
            error={triedError}
          />
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
          sx={{
            fontSize: 20,
            backgroundColor: "#CC0000",
            ":hover": {
              backgroundColor: "#9e0000",
            },
          }}
          variant="contained"
          onClick={() => {
            if (inputIsValid()) {
              setOpen(true);
            }
            onSubmit();
          }}
        >
          Create Help Ticket
        </Button>
      </Box>
      <Box
        sx={{
          textAlign: "center",
          m: "auto",
        }}
      >
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

export default CreateHelpTicket;
