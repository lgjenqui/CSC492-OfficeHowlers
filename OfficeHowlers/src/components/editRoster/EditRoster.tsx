import { Box, Button, Divider, Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  addAssistants,
  addInstructors,
  addStudents,
  getAssistants,
  getInstructors,
  getStudents,
} from "../../services/api/course";

  var deleteIcon =
  (<IconButton>
    <DeleteIcon color="secondary" />
  </IconButton>
  );


const columns: GridColDef[] = [
  { field: 'Name', headerName: 'Name', width: 100 },
  { field: 'Email', headerName: 'Email', width: 80 },
  {field: 'actions',
        type: 'actions',
        width: 1,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
          />,],
        }
];
const rows = [
  { 
    id: 1,
    Name: 'Christopher Kastritis',
    Email: 'crkastri@ncsu.edu' 
    },
    { 
      id: 2,
      Name: 'Christopher Kastritis',
      Email: 'crkastri@ncsu.edu' 
      },
      { 
        id: 3,
        Name: 'Christopher Kastritis',
        Email: 'crkastri@ncsu.edu' 
        },
        { 
          id: 4,
          Name: 'Christopher Kastritis',
          Email: 'crkastri@ncsu.edu' 
          },
];
const EditRoster = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const courseUUID = urlParams.get("id") || "invalid";
  const [error, setError] = useState<boolean>(false);
  const [studentError, setStudentError] = useState<boolean>(false);
  const [teachingAssistantError, setTeachingAssistantError] =
    useState<boolean>(false);
  const [instructorError, setInstructorError] = useState<boolean>(false);
  const [students, setStudents] = useState("");
  const [teachingAssistants, setTeachingAssistants] = useState("");
  const [instructors, setInstructors] = useState("");
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  // Resets all error values so the fields don't display with red outlines and such
  function resetErrorValues(): void {}

  // Checks if the provided input is valid
  function inputIsValid(): boolean {
    // Reset the error values
    resetErrorValues();

    let newErrorMessages: string[] = [];
    // Update the value of the error messages array and return a boolean indicating whether the input was valid
    if (!students && !instructors && !teachingAssistants) {
      newErrorMessages.push("Please provide a value for at least one box");
      setError(true);
    }

    var regex = new RegExp("^([\\w-\\.]+@([\\w-]+\\.)+edu\n?)+$");
    var testStudents = regex.exec(students);
    var testTeachingAssitants = regex.exec(teachingAssistants);
    var testInstructors = regex.exec(instructors);
    if (students.length > 0 && testStudents == null) {
      newErrorMessages.push("Incorrect format in student input");
      setStudentError(true);
    }
    if (teachingAssistants.length > 0 && testTeachingAssitants == null) {
      newErrorMessages.push("Incorrect format in TA input");
      setTeachingAssistantError(true);
    }
    if (instructors.length > 0 && testInstructors == null) {
      newErrorMessages.push("Incorrect format in instructor input");
      setInstructorError(true);
    }

    setErrorMessages(newErrorMessages);

    if (newErrorMessages.length > 0) {
      return false;
    }
    return true;
  }

  // Starts a session
  function onSubmit() {
    if (inputIsValid()) {
      addInstructors(instructors.split("\n"), courseUUID).then(() => {
        addAssistants(teachingAssistants.split("\n"), courseUUID).then(() => {
          addStudents(students.split("\n"), courseUUID).then(() => {
            fetchAllCourseEmails();
          });
        });
      });
      console.log("submitted");
    }
  }

  function fetchAllCourseEmails() {
    getInstructors(courseUUID)
      .then((instructorEmails) => {
        setInstructors(instructorEmails.instructors.join("\n"));
      })
      .catch((error) => {
        console.error(error);
      });
    getAssistants(courseUUID)
      .then((assistantEmails) => {
        setTeachingAssistants(assistantEmails.assistants.join("\n"));
      })
      .catch((error) => {
        console.error(error);
      });
    getStudents(courseUUID)
      .then((studentEmails) => {
        setStudents(studentEmails.students.join("\n"));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Grab the courses for this instructor
  // NOTE - this is grabbing ALL system courses for now
  useEffect(() => {
    fetchAllCourseEmails();
  }, []);

  return (
    <Box sx={{
      width: "80%",
      maxWidth: "1200px",
      m: "auto",
      mt: "20px",
      alignContent: "center",
    }}>
    <Box
      sx={{
        width: "60%",
        maxWidth: "1200px",
        m: "auto",
        mt: "20px",
        alignContent: "center",
      }}
    >
      <Typography sx={{ fontSize: 42, mb: "5px" }}>Edit Roster</Typography>
      <Divider
        sx={{ borderTop: "1px solid lightgrey", width: "90%", mb: "20px" }}
      />
      <Grid
        sx={{
          width: "100%",
          flexGrow: 1,
          justifyContent: "center",
        }}
        container
        spacing={3}
      >
        <Grid item>
          <Typography sx={{ fontSize: 20 }}>
            Manually enter student, TA, and instructor emails
          </Typography>
          <Typography sx={{ fontSize: 14, mb: "15px" }}>
            One on each line in this format: <i>johndoe@org.edu</i>
          </Typography>
          <TextField
            id="outlined-multiline-static"
            label="Student Emails"
            multiline
            rows={4}
            sx={{ mr: "10px" }}
            value={students}
            onChange={(e) => {
              setStudents(e.target.value);
              setStudentError(false);
              setError(false);
            }}
            error={error || studentError}
          />
          <TextField
            id="outlined-multiline-static"
            label="TA Emails"
            multiline
            rows={4}
            sx={{ mr: "10px" }}
            value={teachingAssistants}
            onChange={(e) => {
              setTeachingAssistants(e.target.value);
              setTeachingAssistantError(false);
              setError(false);
            }}
            error={error || teachingAssistantError}
          />
          <TextField
            id="outlined-multiline-static"
            label="Instructor Emails"
            multiline
            rows={4}
            value={instructors}
            onChange={(e) => {
              setInstructors(e.target.value);
              setInstructorError(false);
              setError(false);
            }}
            error={error || instructorError}
          />
          <br></br>
         {/* <DataGrid
         sx={{width:"32%"}}
          rows={rows}
          columns={columns}
          /> */}
        </Grid>
        <Grid item></Grid>
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
          onClick={() => onSubmit()}
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
    <Grid container direction = "row" spacing = {3} alignItems="center" width={"100%"}>
      <Grid item xs = {4}>
      <h3>Enrolled Students</h3>
      <Box sx={{overflowY:"scroll", maxHeight:"300px", maxWidth:"100%"}}>
      <Grid container direction="row" alignItems="center" spacing={3}>
        <Grid item xs = {5}>
          Name 
        </Grid>
        <Grid item xs = {4}>
          Email
        </Grid>
        <Grid item xs = {3}>
          Delete
        </Grid>
      </Grid>
      <Grid container direction="row" alignItems="center" spacing={3}>
        <Grid item xs = {5} sx={{textOverflow:"ellipsis", overflow:"hidden", whiteSpace:"nowrap"}}>
          Christopher Kastritis
        </Grid>
        <Grid item xs = {4}>
          crkastri@ncsu.edu
        </Grid>
        <Grid item xs = {3}>
          <IconButton><DeleteIcon/></IconButton>
        </Grid>
        </Grid>
        
      </Box>
      </Grid>
      <Grid item xs = {4}>
      <h3>Enrolled Teaching Assistants</h3>
      <Box sx={{overflowY:"scroll", maxHeight:"300px", maxWidth:"100%"}}>
      <Grid container direction="row" alignItems="center" spacing={3}>
        <Grid item xs = {5}>
          Name 
        </Grid>
        <Grid item xs = {4}>
          Email
        </Grid>
        <Grid item xs = {3}>
          Delete
        </Grid>
      </Grid>
      <Grid container direction="row" alignItems="center" spacing={3}>
        <Grid item xs = {5} sx={{textOverflow:"ellipsis", overflow:"hidden", whiteSpace:"nowrap"}}>
          Christopher Kastritis
        </Grid>
        <Grid item xs = {4}>
          crkastri@ncsu.edu
        </Grid>
        <Grid item xs = {3}>
          <IconButton><DeleteIcon/></IconButton>
        </Grid>
        </Grid>
      </Box>
      </Grid>
      <Grid item xs = {4}>
      <h3>Enrolled Professors</h3>
      <Box sx={{overflowY:"scroll", maxHeight:"300px", maxWidth:"100%"}}>
      <Grid container direction="row" alignItems="center" spacing={3}>
        <Grid item xs = {5}>
          Name 
        </Grid>
        <Grid item xs = {4}>
          Email
        </Grid>
        <Grid item xs = {3}>
          Delete
        </Grid>
      </Grid>
      <Grid container direction="row" alignItems="center" spacing={3}>
        <Grid item xs = {5} sx={{textOverflow:"ellipsis", overflow:"hidden", whiteSpace:"nowrap"}}>
          Christopher Kastritis
        </Grid>
        <Grid item xs = {4}>
          crkastri@ncsu.edu
        </Grid>
        <Grid item xs = {2}>
          <IconButton><DeleteIcon/></IconButton>
        </Grid>
        </Grid>
      </Box>
      </Grid>
      </Grid>
      
      
    </Box>
  );
};

export default EditRoster;
