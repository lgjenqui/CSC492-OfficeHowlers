import { Box, Button, Divider, Grid, TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import Course from "../../../Models/course.model";
import { getCourses } from "../services/api/course";
import { startSession } from "../services/api/session";
import { getTimeDiffStr } from "../services/util/misc";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { sleep } from "../services/util/sleep";

interface Props {
  setCurrentView: (val: string) => void;
}

const StartSession = ({ setCurrentView }: Props) => {
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
  const [endTimeError, setEndTimeError] = useState<boolean>(false);
  const [virtualLocationError, setVirtualLocationError] =
    useState<boolean>(false);
  const [inPersonLocationError, setInPersonLocationError] =
    useState<boolean>(false);
  const [virtualLocationDisplayError, setVirtualLocationDisplayError] =
    useState<boolean>(false);
  const [startSessionSuccessful, setStartSessionSuccessful] =
    useState<boolean>(false);

  const navigate = useNavigate();

  // Resets all error values so the fields don't display with red outlines and such
  function resetErrorValues(): void {
    setSelectedCoursesError(false);
    setModesError(false);
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
    const online = modes.includes("Virtual");
    const inPerson = modes.includes("In-Person");
    startSession(selectedCourses, inPerson, online, dayjs(), endTime)
      .then(async (res) => {
        if (res.status == 201) {
          setStartSessionSuccessful(true);

          // Clear the form input
          setSelectedCourses([]);
          setModes([]);
          setVirtualLocation("");
          setInPersonLocation("");
          setStartTime(null);
          setEndTime(null);
          setVirtualLocationDisplay("");

          // Sleep for 2 seconds then redirect the user to their home page
          setCurrentView("helpSession");
          await sleep(2000);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(error);
        setStartSessionSuccessful(false);
        setErrorMessages([
          "There was an unexpected problem while creating the course. Please try again.",
        ]);
      });
  }

  // Create a message to display if course creation was successful or unsuccessful
  let requestStatusMsg = null;
  if (startSessionSuccessful) {
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

  // Grab the courses for this instructor
  // NOTE - this is grabbing ALL system courses for now
  useEffect(() => {
    let res = getCourses();
    res.then((value) => {
      setCourses(value.instructorCourses);
    });
    res.catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <Box
      sx={{
        width: "70%",
        height: "100%",
        m: "auto",
        mt: "20px",
      }}
    >
      <Typography sx={{ fontSize: 38, fontWeight: "bold", mb: "5px" }}>
        Start a session
      </Typography>
      <Divider
        sx={{ borderTop: "1px solid black", width: "80%", mb: "10px" }}
      />
      <Grid
        sx={{
          flexGrow: 1,
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
            options={["In-Person", "Virtual"]}
            value={modes}
            onChange={(event, newValue) => {
              setModes(newValue);
              if (newValue.includes("Virtual")) {
                setVirtualLocationError(false);
              }
              if (newValue.includes("In-Person")) {
                setInPersonLocationError(false);
              }
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
        <Grid item sx={{ width: "40%" }}>
          <Typography sx={{ fontSize: 20, mb: "5px" }}>
            Session start time
          </Typography>
          <TimePicker
            disabled
            sx={{ width: "90%" }}
            value={startTime}
            onChange={(newValue) => setStartTime(newValue)}
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
        {modes.map(function (mode) {
          return (
            <Grid sx={{ width: "40%" }} item key={mode}>
              <Typography sx={{ fontSize: 20, mb: "5px" }}>
                {mode} Location
              </Typography>
              <TextField
                required
                label={mode + " Location"}
                value={mode == "Virtual" ? virtualLocation : inPersonLocation}
                sx={{ mr: "20px", width: "90%" }}
                onChange={(e) => {
                  if (mode == "Virtual") {
                    setVirtualLocation(e.target.value);
                    setVirtualLocationError(false);
                  } else {
                    setInPersonLocation(e.target.value);
                    setInPersonLocationError(false);
                  }
                }}
                error={
                  mode == "Virtual"
                    ? virtualLocationError
                    : inPersonLocationError
                }
              />
            </Grid>
          );
        })}
        {modes.includes("Virtual") && (
          <Grid item sx={{ width: "40%" }}>
            <FormControl error={virtualLocationDisplayError} required={true}>
              <FormLabel
                id="demo-controlled-radio-buttons-group"
                sx={{ fontSize: 20, fontWeight: 400 }}
              >
                Virtual location should display to:
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={virtualLocationDisplay}
                onChange={(e) => {
                  setVirtualLocationDisplayError(false);
                  setVirtualLocationDisplay(e.target.value);
                }}
              >
                <FormControlLabel
                  value="all"
                  control={<Radio />}
                  label="All students in the queue"
                />
                <FormControlLabel
                  value="helpedStudent"
                  control={<Radio />}
                  label="Only the student(s) currently being helped"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        )}
      </Grid>
      <Box
        sx={{
          width: "50%",
          mt: "25px",
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
              setStartTime(dayjs());
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
              This session will be {getTimeDiffStr(dayjs(), endTime)} long.
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
