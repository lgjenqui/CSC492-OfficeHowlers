import { Box, TextField, Divider, Grid, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import Course from "../../../../Models/course.model";
import { useEffect, useState } from "react";
import { getCourses } from "../../services/api/session";
import { TimePicker } from "@mui/x-date-pickers";
import React from "react";
import dayjs, { Dayjs } from "dayjs";

interface Props {
  onStartSession: (
    courses: Course[],
    modes: string[],
    startTime: Dayjs | null,
    endTime: Dayjs | null
  ) => void;
}

const StartSession = ({ onStartSession }: Props) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [modes, setModes] = useState<string[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<any>([]);
  const [startTime, setStartTime] = React.useState<Dayjs | null>(
    dayjs().add(0, "hour")
  );
  const [endTime, setEndTime] = React.useState<Dayjs | null>(
    dayjs().add(1, "hour")
  );

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
          />
        </Grid>
      </Grid>
      <Button
        sx={{
          m: 0,
          mt: "25px",
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
        onClick={() =>
          onStartSession(selectedCourses, modes, startTime, endTime)
        }
      >
        Start session
      </Button>
    </Box>
  );
};

export default StartSession;
