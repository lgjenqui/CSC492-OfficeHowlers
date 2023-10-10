import { Box, Button, Divider, Grid, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import Course from "../../../../Models/course.model";
import { getCourses } from "../../services/api/session";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getTimeDiffStr } from "../../services/util/misc";
import { startSession } from "../../services/api/session";

const StartSession = () => {
  const [open, setOpen] = React.useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<any>([]);
  const [modes, setModes] = useState<string[]>([]);
  const [startTime, setStartTime] = React.useState<Dayjs | null>(
    dayjs().add(0, "hour")
  );
  const [endTime, setEndTime] = React.useState<Dayjs | null>(
    dayjs().add(1, "hour")
  );
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [selectedCoursesError, setSelectedCoursesError] =
    useState<boolean>(false);
  const [modesError, setModesError] = useState<boolean>(false);
  const [startTimeError, setStartTimeError] = useState<boolean>(false);
  const [endTimeError, setEndTimeError] = useState<boolean>(false);

  // Checks if the provided input is valid
  function inputIsValid(): boolean {
    // Reset the error values
    setSelectedCoursesError(false);
    setModesError(false);
    setStartTimeError(false);
    setEndTimeError(false);

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
      <Typography sx={{ fontSize: 42, mb: "5px" }}>Start a session</Typography>
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
        <Grid sx={{ width: "40%" }} item>
          <Typography sx={{ fontSize: 20, mb: "5px" }}>
            Course Selection
          </Typography>
          <Autocomplete
            sx={{ width: "90%" }}
            multiple
            id="tags-standard"
            options={courses}
            getOptionLabel={(option: { name: string }) => {
              return option?.name;
            }}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            value={selectedCourses}
            onChange={(event, newValue) => {
              setSelectedCourses(newValue);
            }}
            renderInput={(params) => (
              <TextField
                required
                error={selectedCoursesError}
                {...params}
                variant="standard"
                label="Select a course or courses"
              />
            )}
          />
        </Grid>
        <Grid sx={{ width: "40%" }} item>
          <Typography sx={{ fontSize: 20, mb: "5px" }}>
            Mode of delivery
          </Typography>
          <Autocomplete
            sx={{ width: "90%" }}
            multiple
            id="tags-standard"
            options={["In Person", "Zoom"]}
            value={modes}
            onChange={(event, newValue) => {
              setModes(newValue);
            }}
            renderInput={(params) => (
              <TextField
                required
                error={modesError}
                {...params}
                variant="standard"
                label="Select a mode or modes"
              />
            )}
          />
        </Grid>
        {}

        <Grid item sx={{ width: "40%" }}>
          <Typography sx={{ fontSize: 20, mb: "5px" }}>
            Session start time
          </Typography>
          <TimePicker
            sx={{ width: "90%" }}
            value={startTime}
            onChange={(newValue) => setStartTime(newValue)}
            slotProps={{
              textField: {
                error: startTimeError,
              },
            }}
          />
        </Grid>
        <Grid item sx={{ width: "40%" }}>
          <Typography sx={{ fontSize: 20, mb: "5px" }}>
            Session end time
          </Typography>
          <TimePicker
            sx={{ width: "90%" }}
            value={endTime}
            onChange={(newValue) => setEndTime(newValue)}
            slotProps={{
              textField: {
                error: endTimeError,
              },
            }}
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
          Start session
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
      <Box>
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Start the session?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This session will be {getTimeDiffStr(startTime, endTime)} long.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpen(false);
              }}
            >
              Go back
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                onSubmit();
              }}
              autoFocus
            >
              Start session
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default StartSession;
