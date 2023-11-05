import { Box, Button, Divider, Grid, TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Course from "../../../Models/course.model";
import { getCourses } from "../services/api/course";
import { createTicket } from "../services/api/ticket";
import { sleep } from "../services/util/sleep";

interface Props {
  setCurrentView: (val: string) => void;
}

const CreateHelpTicket = ({ setCurrentView }: Props) => {
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
  const [ticketCreationSuccessful, setTicketCreationSuccessful] = useState<
    boolean | null
  >(null);

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
    // if (selectedCourses.length <= 0) {
    //   newErrorMessages.push("Please select a course for this help ticket");
    //   setCourseError(true);
    // }
    var regex = new RegExp("^([\\w-\\.]+@([\\w-]+\\.)+edu,? ?)+$");
    var testStudents = regex.exec(group);
    // Check if at least one mode of delivery was selected
    if (group.length > 0 && testStudents == null) {
      newErrorMessages.push("Incorrect format for group request");
      setGroupError(true);
    }

    if (selectedCourses.length == 0) {
      newErrorMessages.push("Please select a course");
      setSelectedCoursesError(true);
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

  const navigate = useNavigate();

  // Starts a ticket
  function onSubmit() {
    if (inputIsValid()) {
      createTicket(
        selectedCourses.id,
        description,
        tried,
        group.split(/\s*,\s*/)
      )
        .then(async (res) => {
          if (res.status == 201) {
            setTicketCreationSuccessful(true);

            // Clear the form input
            setSelectedCourses([]);
            setGroup("");
            setDescription("");
            setTried("");

            // Sleep for 2 seconds then redirect the user to the home page set to the tickets view
            setCurrentView("studentTicket");
            await sleep(2000);
            navigate("/");
          } else {
            setTicketCreationSuccessful(false);
            setErrorMessages([
              "There was an unexpected problem while creating your help ticket. Please try again.",
            ]);
          }
        })
        .catch((error) => {
          console.error(error);
          setTicketCreationSuccessful(false);
          setErrorMessages([
            "There was an unexpected problem while creating your help ticket. Please try again.",
          ]);
        });
    }
  }

  // Create a message to display if course creation was successful or unsuccessful
  let requestStatusMsg = null;
  if (ticketCreationSuccessful == true) {
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
          Success! Your help ticket has been created. Redirecting you now...
        </Alert>
        <CircularProgress color="success" sx={{ mt: "15px" }} />
      </>
    );
  }

  useEffect(() => {
    getCourses()
      .then((value: any) => {
        setCourses(value.studentCourses);
      })
      .catch((error: any) => {
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
        <Grid sx={{ width: "30%" }} item>
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
            // value={selectedCourses}
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
        <Grid sx={{ width: "70%" }} item>
          <Typography sx={{ fontSize: 20, mb: "5px" }}>
            Group Request
          </Typography>
          <TextField
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
        <Grid sx={{ width: "50%" }} item>
          <Typography sx={{ fontSize: 20, mb: "5px" }}>
            What is the problem?
          </Typography>
          <TextField
            required
            multiline={true}
            rows={3}
            label="Description of problem"
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

export default CreateHelpTicket;
