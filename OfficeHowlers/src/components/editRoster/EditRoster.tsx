import { Box, Button, Divider, Grid, TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import Course from "../../../../Models/course.model";
import { getCourses} from "../../services/api/session";
import { getTimeDiffStr } from "../../services/util/misc";

const EditRoster = () => {
  const [open, setOpen] = React.useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
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
    // Reset the error values
    resetErrorValues();

    let newErrorMessages: string[] = [];
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
          width: "90%",
          flexGrow: 1,
          justifyContent: "center",
        }}
        container
        spacing={3}
      >
         <Grid item>
          <Typography sx={{ fontSize: 20 }}>
            Manually enter student and TA emails
          </Typography>
          <Typography sx={{ fontSize: 14, mb: "15px" }}>
            One on each line in this format: <i>johndoe@org.edu</i>
          </Typography>
          <TextField
            id="outlined-multiline-static"
            label="Student Emails"
            multiline
            rows={4}
            defaultValue=""
            sx={{ mr: "10px" }}
          />
          <TextField
            id="outlined-multiline-static"
            label="TA Emails"
            multiline
            rows={4}
            defaultValue=""
          />
        </Grid>
        <Grid item>
          <Typography sx={{ fontSize: 25, mr: "15px", ml: "25px" }}>
            <u>or</u>
          </Typography>
        </Grid>
        <Grid item>
          <Typography sx={{ fontSize: 20, mb: "5px" }}>
            Upload course roster as a CSV
          </Typography>
          <input accept=".csv" type="file" />
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
          Edit Roster
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

export default EditRoster;
