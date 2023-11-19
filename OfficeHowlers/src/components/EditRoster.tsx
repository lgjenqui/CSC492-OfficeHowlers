import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  addAssistants,
  addInstructors,
  addStudents,
  getAssistants,
  getInstructors,
  getStudents,
  removeInstructorsByEmail,
  removeStudentsByEmail,
  removeTeachingAssistantsByEmail,
} from "../services/api/course";
import UserModel from "../../../Models/user.model";
import CourseModel from "../../../Models/course.model";

interface Props {
  course: CourseModel | null;
}

const EditRoster = ({ course }: Props) => {
  if (!course) {
    return null;
  }

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const [studentError, setStudentError] = useState<boolean>(false);
  const [teachingAssistantError, setTeachingAssistantError] =
    useState<boolean>(false);
  const [instructorError, setInstructorError] = useState<boolean>(false);
  const [students, setStudents] = useState("");
  const [teachingAssistants, setTeachingAssistants] = useState("");
  const [instructors, setInstructors] = useState("");
  const [instructorsEnrolled, setInstructorsEnrolled] = useState<UserModel[]>(
    []
  );
  const [teachingAssistantsEnrolled, setTeachingAssistantsEnrolled] = useState<
    UserModel[]
  >([]);
  const [studentsEnrolled, setStudentsEnrolled] = useState<UserModel[]>([]);
  const [teachingAssistantErrorMessages, setTeachingAssistantErrorMessages] =
    useState<string[]>([]);
  const [instructorErrorMessages, setInstructorErrorMessages] = useState<
    string[]
  >([]);
  const [studentErrorMessages, setStudentErrorMessages] = useState<string[]>(
    []
  );

  // Resets all error values so the fields don't display with red outlines and such
  function resetErrorValues(): void {}

  // Checks if the provided input is valid
  function inputIsValidInstructor(): boolean {
    // Reset the error values
    resetErrorValues();

    let newErrorMessages: string[] = [];
    // Update the value of the error messages array and return a boolean indicating whether the input was valid
    if (!instructors) {
      newErrorMessages.push("Please provide at least one email");
      setInstructorError(true);
    }

    var regex = new RegExp("^([\\w-\\.]+@([\\w-]+\\.)+edu\n?)+$");
    var testInstructors = regex.exec(instructors);
    if (instructors.length > 0 && testInstructors == null) {
      newErrorMessages.push("Incorrect format in instructor input");
      setInstructorError(true);
    }

    setInstructorErrorMessages(newErrorMessages);

    if (newErrorMessages.length > 0) {
      return false;
    }
    return true;
  }

  function inputIsValidTeachingAssistant(): boolean {
    // Reset the error values
    resetErrorValues();

    let newErrorMessages: string[] = [];
    // Update the value of the error messages array and return a boolean indicating whether the input was valid
    if (!teachingAssistants) {
      newErrorMessages.push("Please provide at least one email");
      setTeachingAssistantError(true);
    }

    var regex = new RegExp("^([\\w-\\.]+@([\\w-]+\\.)+edu\n?)+$");
    var testTeachingAssitants = regex.exec(teachingAssistants);
    if (teachingAssistants.length > 0 && testTeachingAssitants == null) {
      newErrorMessages.push("Incorrect format in TA input");
      setTeachingAssistantError(true);
    }

    setTeachingAssistantErrorMessages(newErrorMessages);

    if (newErrorMessages.length > 0) {
      return false;
    }
    return true;
  }

  function inputIsValidStudent(): boolean {
    // Reset the error values
    resetErrorValues();

    let newErrorMessages: string[] = [];
    // Update the value of the error messages array and return a boolean indicating whether the input was valid
    if (!students) {
      newErrorMessages.push("Please provide a value for at least one box");
      setStudentError(true);
    }

    var regex = new RegExp("^([\\w-\\.]+@([\\w-]+\\.)+edu\n?)+$");
    var testStudents = regex.exec(students);
    if (students.length > 0 && testStudents == null) {
      newErrorMessages.push("Incorrect format in student input");
      setStudentError(true);
    }

    setStudentErrorMessages(newErrorMessages);

    if (newErrorMessages.length > 0) {
      return false;
    }
    return true;
  }
  // Starts a session
  function onSubmitInstructors() {
    if (!course) {
      return;
    }
    if (inputIsValidInstructor()) {
      addInstructors(instructors.split("\n"), course.id).then(() => {
        fetchAllCourseEmails();
      });
      console.log("submitted");
      setInstructors("");
    }
  }

  function onSubmitTeachingAssistants() {
    if (!course) {
      return;
    }
    if (inputIsValidTeachingAssistant()) {
      addAssistants(teachingAssistants.split("\n"), course.id).then(() => {
        fetchAllCourseEmails();
      });
      console.log("submitted");
      setTeachingAssistants("");
    }
  }

  function onSubmitStudents() {
    if (!course) {
      return;
    }
    if (inputIsValidStudent()) {
      addStudents(students.split("\n"), course.id).then(() => {
        fetchAllCourseEmails();
      });
      console.log("submitted");
      setStudents("");
    }
  }

  function fetchAllCourseEmails() {
    if (!course) {
      return;
    }
    getInstructors(course.id)
      .then((instructorEmails) => {
        console.log(instructorEmails);
        setInstructorsEnrolled(instructorEmails.instructors);
        console.log(instructorsEnrolled);
      })
      .catch((error) => {
        console.error(error);
      });
    getAssistants(course.id)
      .then((assistantEmails) => {
        setTeachingAssistantsEnrolled(assistantEmails.assistants);
      })
      .catch((error) => {
        console.error(error);
      });
    getStudents(course.id)
      .then((studentEmails) => {
        setStudentsEnrolled(studentEmails.students);
        console.log(studentsEnrolled);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function deleteInstructor(instructorEmail: string) {
    var instructorEmails = [instructorEmail];
    if (!course) {
      return;
    }
    removeInstructorsByEmail(instructorEmails, course.id);
    fetchAllCourseEmails();
  }
  function deleteStudent(studentEmail: string) {
    if (!course) {
      return;
    }
    var studentEmails = [studentEmail];
    removeStudentsByEmail(studentEmails, course.id);
    fetchAllCourseEmails();
  }
  function deleteTeachingAssistant(teachingAssistantEmail: string) {
    if (!course) {
      return;
    }
    var teachingAssistantEmails = [teachingAssistantEmail];
    removeTeachingAssistantsByEmail(teachingAssistantEmails, course.id);
    fetchAllCourseEmails();
  }

  // Grab the courses for this instructor
  // NOTE - this is grabbing ALL system courses for now
  useEffect(() => {
    fetchAllCourseEmails();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1200px",
        borderRadius: "15px",
        m: "auto",
        mt: "20px",
        alignContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          m: "auto",
          alignContent: "center",
        }}
      >
        <Typography
          sx={{ fontSize: 35, textAlign: "center", mb: "5px", color: "black" }}
        >
          Edit Course Roster
        </Typography>
        <Divider
          sx={{
            borderTop: "1px solid lightgrey",
            width: "90%",
            m: "auto",
            mb: "20px",
          }}
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
            <Typography sx={{ fontSize: 20, color: "grey" }}>
              Manually enter instructor, TA, and student emails
            </Typography>
            <Typography sx={{ fontSize: 14, mb: "15px", color: "grey" }}>
              One on each line in this format: <i>example@org.edu</i>
            </Typography>
          </Grid>
        </Grid>
        <h3>Enrolled Instructors</h3>
        <TextField
          sx={{
            width: "100%",
            color: "white",
            backgroundColor: "white",
            mb: "15px",
          }}
          id="outlined-multiline-static"
          label="Instructor Emails"
          multiline
          rows={4}
          value={instructors}
          onChange={(e) => {
            setInstructors(e.target.value);
            setInstructorError(false);
          }}
          error={instructorError}
        />
        <Box
          sx={{
            overflowY: "scroll",
            maxHeight: "300px",
            maxWidth: "100%",
          }}
        >
          <Grid container direction="row" alignItems="center" spacing={3}>
            <Grid item xs={5} sx={{ fontWeight: "bold" }}>
              Name
            </Grid>
            <Grid item xs={4} sx={{ fontWeight: "bold" }}>
              Email
            </Grid>
            <Grid item xs={3} sx={{ fontWeight: "bold" }}>
              Delete
            </Grid>
            <Divider
              sx={{
                borderTop: "1px solid white",
                width: "100%",
                m: "auto",
                mt: "10px",
                mb: "10px",
              }}
            />
          </Grid>
          {instructorsEnrolled.map((instructor) => {
            return (
              <Grid
                container
                direction="row"
                alignItems="center"
                spacing={3}
                key={instructor.email}
              >
                <Grid
                  item
                  xs={5}
                  sx={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {instructor.firstName != "Unset firstname"
                    ? instructor.firstName
                    : ""}{" "}
                  {!!(instructor.lastName != "Unset lastname")
                    ? instructor.lastName
                    : ""}
                </Grid>
                <Grid item xs={4}>
                  {instructor.email}
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    onClick={(e) => deleteInstructor(instructor.email)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            );
          })}
        </Box>

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
            onClick={() => onSubmitInstructors()}
          >
            Add To Instructor Roster
          </Button>
        </Box>
        <Box
          sx={{
            textAlign: "center",
            m: "auto",
          }}
        >
          {instructorErrorMessages.map(function (msg) {
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

        <br></br>
        <h3>Enrolled Teaching Assistants</h3>

        <TextField
          sx={{ width: "100%", backgroundColor: "white", mb: "15px" }}
          id="outlined-multiline-static"
          label="TA Emails"
          multiline
          rows={4}
          value={teachingAssistants}
          onChange={(e) => {
            setTeachingAssistants(e.target.value);
            setTeachingAssistantError(false);
          }}
          error={teachingAssistantError}
        />
        <Box sx={{ overflowY: "scroll", maxHeight: "300px", maxWidth: "100%" }}>
          <Grid container direction="row" alignItems="center" spacing={3}>
            <Grid item xs={5} sx={{ fontWeight: "bold" }}>
              Name
            </Grid>
            <Grid item xs={4} sx={{ fontWeight: "bold" }}>
              Email
            </Grid>
            <Grid item xs={3} sx={{ fontWeight: "bold" }}>
              Delete
            </Grid>
            <Divider
              sx={{
                borderTop: "1px solid white",
                width: "100%",
                m: "auto",
                mt: "10px",
                mb: "10px",
              }}
            />
          </Grid>
          {teachingAssistantsEnrolled.map((teachingAssistant) => {
            return (
              <Grid
                container
                direction="row"
                alignItems="center"
                spacing={3}
                key={teachingAssistant.email}
              >
                <Grid
                  item
                  xs={5}
                  sx={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {teachingAssistant.firstName != "Unset firstname"
                    ? teachingAssistant.firstName
                    : ""}{" "}
                  {!!(teachingAssistant.lastName != "Unset lastname")
                    ? teachingAssistant.lastName
                    : ""}
                </Grid>
                <Grid item xs={4}>
                  {teachingAssistant.email}
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    onClick={(e) =>
                      deleteTeachingAssistant(teachingAssistant.email)
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            );
          })}
        </Box>
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
            onClick={() => onSubmitTeachingAssistants()}
          >
            Add To TA Roster
          </Button>
        </Box>
        <br></br>
        <Box
          sx={{
            textAlign: "center",
            m: "auto",
          }}
        >
          {teachingAssistantErrorMessages.map(function (msg) {
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
        <h3>Enrolled Students</h3>

        <TextField
          sx={{ width: "100%", backgroundColor: "white", mb: "15px" }}
          id="outlined-multiline-static"
          label="Student Emails"
          multiline
          rows={4}
          value={students}
          onChange={(e) => {
            setStudents(e.target.value);
            setStudentError(false);
          }}
          error={studentError}
        />
        <Box sx={{ overflowY: "scroll", maxHeight: "300px", maxWidth: "100%" }}>
          <Grid container direction="row" alignItems="center" spacing={3}>
            <Grid item xs={5} sx={{ fontWeight: "bold" }}>
              Name
            </Grid>
            <Grid item xs={4} sx={{ fontWeight: "bold" }}>
              Email
            </Grid>
            <Grid item xs={3} sx={{ fontWeight: "bold" }}>
              Delete
            </Grid>
            <Divider
              sx={{
                borderTop: "1px solid white",
                width: "100%",
                m: "auto",
                mt: "10px",
                mb: "10px",
              }}
            />
          </Grid>
          {studentsEnrolled.map((student) => {
            return (
              <Grid
                container
                direction="row"
                alignItems="center"
                spacing={3}
                key={student.email}
              >
                <Grid
                  item
                  xs={5}
                  sx={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {student.firstName != "Unset firstname"
                    ? student.firstName
                    : ""}{" "}
                  {!!(student.lastName != "Unset lastname")
                    ? student.lastName
                    : ""}
                </Grid>
                <Grid item xs={4}>
                  {student.email}
                </Grid>
                <Grid item xs={2}>
                  <IconButton onClick={(e) => deleteStudent(student.email)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            );
          })}
        </Box>
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
            onClick={() => onSubmitStudents()}
          >
            Add To Student Roster
          </Button>
        </Box>
        <Box
          sx={{
            textAlign: "center",
            m: "auto",
          }}
        >
          {studentErrorMessages.map(function (msg) {
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
    </Box>
  );
};

export default EditRoster;
