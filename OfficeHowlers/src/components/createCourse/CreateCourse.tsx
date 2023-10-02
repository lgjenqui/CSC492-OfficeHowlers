import { Box, TextField, Divider, Grid, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { createCourse } from "../../services/api/course";
import { getStatusTSX } from "../../services/util";

interface Props {
  onCreateCourse: (name: string, desc: string) => void;
}

var statusMessages = []

function createCourseWrapper(courseName: string, courseDesc: string) {
    if (courseName.length == 0) {
        statusMessages.append(getStatusTSX("Please provide a course name.", "error"));
    }

    if (courseDesc.length == 0) {
        console.log("Please provide a course description.");
    }
}

function getStatusMessage() {
    return <h1>error!</h1>
}

const CreateCourse = ({ onCreateCourse }: Props) => {
  const [courseName, setCourseName] = useState("");
  const [courseDesc, setCourseDesc] = useState("");

  return (
    <Box
      sx={{
        width: "60%",
        m: "auto",
        mt: "20px",
        alignContent: "center",
      }}
    >
      <Typography sx={{ fontSize: 42, mb: "5px" }}>Create a course</Typography>
      <Divider
        sx={{ borderTop: "1px solid lightgrey", width: "90%", mb: "20px" }}
      />
      <Grid sx={{ flexGrow: 1 }} container spacing={3}>
        <Grid item>
          <Typography sx={{ fontSize: 20, mb: "5px" }}>Course Name</Typography>
          <TextField
            required
            id="outlined-required"
            label="Course Name"
            defaultValue=""
            sx={{ mr: "20px" }}
            onChange={(e) => {
              setCourseName(e.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <Typography sx={{ fontSize: 20, mb: "5px" }}>
            Course Description
          </Typography>
          <TextField
            required
            id="outlined-required"
            label="Course Description"
            defaultValue=""
            sx={{ mr: "20px" }}
            onChange={(e) => {
              setCourseDesc(e.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <Typography sx={{ fontSize: 20, mb: "5px" }}>
            Course start date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker />
          </LocalizationProvider>
        </Grid>
        <Grid item>
          <Typography sx={{ fontSize: 20, mb: "5px" }}>
            Course end date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker />
          </LocalizationProvider>
        </Grid>
        {/* <Grid item>
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
          <input accept="*.csv" type="file" />
        </Grid> */}
      </Grid>
      <Button
        sx={{
          m: 0,
          mt: "15px",
          position: "absolute",
          left: "50%",
          msTransform: "translateX(-50%)",
          transform: "translatex(-50%)",
          fontSize: 20,
          backgroundColor: "#CC0000",
          ":hover": {
            backgroundColor: "#9e0000",
          },
        }}
        variant="contained"
        onClick={() => createCourseWrapper(courseName, courseDesc)}
      >
        Create course
      </Button>
      {getStatusMessage()}
    </Box>
  );
};

export default CreateCourse;
