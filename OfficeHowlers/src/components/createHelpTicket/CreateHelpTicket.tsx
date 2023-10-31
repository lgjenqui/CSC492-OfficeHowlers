import { Box, Button, Divider, Grid, TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import Course from "../../../../Models/course.model";
import { getCourses, startSession } from "../../services/api/session";


const CreateHelpTicket = () => {
  const [open, setOpen] = React.useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<any>([]);
  const [modes, setModes] = useState<string[]>([]);
  const [virtualLocation, setVirtualLocation] = useState<string>("");
  const [inPersonLocation, setInPersonLocation] = useState<string>("");
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
  const [modesError, setModesError] = useState<boolean>(false);
  const [startTimeError, setStartTimeError] = useState<boolean>(false);
  const [endTimeError, setEndTimeError] = useState<boolean>(false);
  const [virtualLocationError, setVirtualLocationError] =
    useState<boolean>(false);
  const [inPersonLocationError, setInPersonLocationError] =
    useState<boolean>(false);
  const [virtualLocationDisplayError, setVirtualLocationDisplayError] =
    useState<boolean>(false);

  // Resets all error values so the fields don't display with red outlines and such
  function resetErrorValues(): void {
    setSelectedCoursesError(false);
    setModesError(false);
    setStartTimeError(false);
    setEndTimeError(false);
    setVirtualLocationError(false);
    setInPersonLocationError(false);
    setVirtualLocationDisplayError(false);
  }

  // Checks if the provided input is valid
  function inputIsValid(): boolean {
    console.log(virtualLocationDisplay);
    // Reset the error values
    resetErrorValues();

    let newErrorMessages: string[] = [];
    // Check if at least one course was selected
    if (selectedCourses.length <= 0) {
      newErrorMessages.push("Please select 1 or more courses for this session");
      setSelectedCoursesError(true);
    }

    // Check if at least one mode of delivery was selected
    if (modes.length <= 0) {
      newErrorMessages.push("Please select 1 or more modes of delivery");
      setModesError(true);
    }

    // Check if one or both of the start and end times was not provided
    if (!startTime) {
      newErrorMessages.push("Please provide a session start time");
      setStartTimeError(true);
    }

    if (!endTime) {
      newErrorMessages.push("Please provide a session end time");
      setEndTimeError(true);
    }

    // Check a start and end time were provided
    if (startTime && endTime) {
      // The end time must be after the start time
      if (
        startTime.isAfter(endTime, "minute") ||
        startTime.isSame(endTime, "minute")
      ) {
        newErrorMessages.push(
          "The session end time must be after the session start time"
        );
        setEndTimeError(true);
      }

      // The start and end times must not have already passed
      if (startTime.isBefore(dayjs(), "minute")) {
        newErrorMessages.push(
          "The session start time must be the current time or later"
        );
        setStartTimeError(true);
      }
      if (endTime.isBefore(dayjs(), "minute")) {
        newErrorMessages.push(
          "The session end time must be the current time or later"
        );
        setEndTimeError(true);
      }

      // If the user specified virtual or In-Person delivery, they must provide the information
      if (modes.includes("Virtual") && !virtualLocation) {
        newErrorMessages.push(
          "Please provide a virtual location (meeting link/info)"
        );
        setVirtualLocationError(true);
      }
      if (modes.includes("In-Person") && !inPersonLocation) {
        newErrorMessages.push("Please provide an in-person location");
        setInPersonLocationError(true);
      }
    }

    // Check if a virtual location display option is chosen if there's a virtual location
    if (modes.includes("Virtual") && virtualLocationDisplay.length == 0) {
      newErrorMessages.push("Please choose a virtual location display option");
      setVirtualLocationDisplayError(true);
    }

    // Update the value of the error messages array and return a boolean indicating whether the input was valid
    setErrorMessages(newErrorMessages);

    if (newErrorMessages.length > 0) {
      return false;
    }
    return true;
  }

  // Starts a session
  function onSubmit() {
    console.log("submitting!");
  }

  // Grab the courses for this instructor
  // NOTE - this is grabbing ALL system courses for now
  useEffect(() => {
    let res = getCourses();
    res.then((value) => {
      setCourses(value);
    });
    res.catch((error) => {
      console.error(error);
    });
  }, []);

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
      <Typography sx={{ fontSize: 42, mb: "5px" }}>Create help ticket</Typography>
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
        <Grid sx={{ width: "25%" }} item>
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
            }}
            renderInput={(params) => (
              <TextField
                required
                error={selectedCoursesError}
                {...params}
                variant="standard"
                label="Select a course"
              />
            )}
          />
        </Grid>
        <Grid sx={{ width: "40%" }}item>
          <Typography sx={{ fontSize: 20, mb: "5px" }}>
            Group Request
          </Typography>
          <Autocomplete
            sx={{ width: "90%" }}
            multiple
            id="tags-standard"
            options={["Chris", "Cam", "Bagya", "Luke", "Nolan"]}
            //value={modes}
            onChange={(event, newValue) => {
              //setModes(newValue);
              //if (newValue.includes("Virtual")) {
               // setVirtualLocationError(false);
              //}
              //if (newValue.includes("In-Person")) {
               // setInPersonLocationError(false);
              //}
            }}
            renderInput={(params) => (
              <TextField
                //error={modesError}
                {...params}
                variant="standard"
                label="Select students you are working with"
              />
            )}
          />
          
        
        </Grid>
        <Grid sx={{ width: "35%" }} item>
          <Typography sx={{ fontSize: 20, mb: "5px" }}>
            What are you working on?
          </Typography>
          <Autocomplete
            sx={{ width: "90%" }}
            id="tags-standard"
            options={["Project", "Exam", "Homework","Other"]}
            //value={modes}
            onChange={(event, newValue) => {
              //setModes(newValue);
              //if (newValue.includes("Virtual")) {
               // setVirtualLocationError(false);
              //}
              //if (newValue.includes("In-Person")) {
               // setInPersonLocationError(false);
              //}
            }}
            renderInput={(params) => (
              <TextField
                //error={modesError}
                {...params}
                variant="standard"
                label="Select what you need help with"
              />
            )}
          />
        </Grid>
        <Grid sx={{ width: "50%" }} item>
          <Typography sx={{ fontSize: 20, mb: "5px" }}>What is the problem?</Typography>
          <TextField
            required
            label="Description of problem"
            id='course-name-field'
            sx={{ mr: "20px", width:"100%" }}
            onChange={(e) => {
              
            }}
           //error={courseNameError}
          />
        </Grid>
        <Grid sx={{ width: "50%" }}item>
          <Typography sx={{ fontSize: 20, mb: "5px" }}>What have you tried?</Typography>
          <TextField 
            required
            
            label="Description of attempts to solve the problem"
            id='course-name-field'
            sx={{ mr: "20px", width:"100%"}}
            onChange={(e) => {
              
            }}
           //error={courseNameError}
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
