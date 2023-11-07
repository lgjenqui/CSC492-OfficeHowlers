import { Box, Divider } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Typography from "@mui/material/Typography";
import CourseCards from "./CourseCards";
import UserModel from "../../../Models/user.model";
import CourseModel from "../../../Models/course.model";

interface Props {
  user: UserModel | null;
  instructorCourses: CourseModel[];
  assistantCourses: CourseModel[];
  studentCourses: CourseModel[];
  coursesLoadedSuccessfully: boolean | null;
}

const ViewCourses = ({
  user,
  instructorCourses,
  assistantCourses,
  studentCourses,
  coursesLoadedSuccessfully,
}: Props) => {
  return (
    <Box sx={{ width: "70%", height: "100%", m: "auto", userSelect: "none" }}>
      {user &&
      coursesLoadedSuccessfully &&
      instructorCourses.length +
        assistantCourses.length +
        studentCourses.length ===
        0 ? (
        <Box>
          <Typography
            sx={{
              fontSize: "35px",
              fontWeight: "bold",
              mt: "20px",
              ml: 0,
              display: "inline-block",
              width: "100%",
            }}
          >
            My courses
          </Typography>
          <Divider
            sx={{ borderTop: "1px solid black", width: "80%", mb: "10px" }}
          />
          <Typography
            sx={{
              fontSize: "35px",
              display: "inline-block",
              width: "80%",
            }}
          >
            It looks like you have no courses. Use the{" "}
            <b>
              {user.primaryRole == "student"
                ? "'Join a course' "
                : "'Create course' "}
            </b>
            option to the left to{" "}
            {user.primaryRole == "student" ? "join" : "create"} one.
          </Typography>
        </Box>
      ) : null}
      {coursesLoadedSuccessfully == false ? (
        <Alert
          sx={{
            fontSize: "35px",
            width: "60%",
            borderRadius: "15px",
            "& .MuiAlert-icon": {
              fontSize: 40,
            },
          }}
          severity="error"
        >
          <AlertTitle sx={{ fontWeight: "bold", fontSize: "35px" }}>
            Error
          </AlertTitle>
          There was an unexpected problem while fetching your information.
          <br />
          <br /> Please <strong>reload the page</strong> to try again.
        </Alert>
      ) : null}

      {instructorCourses.length +
        assistantCourses.length +
        studentCourses.length >
      0 ? (
        <Box>
          <Typography
            sx={{
              fontSize: "35px",
              fontWeight: "bold",
              mt: "20px",
              ml: 0,
              display: "inline-block",
              width: "100%",
            }}
          >
            My courses
          </Typography>
          <Divider
            sx={{ borderTop: "1px solid black", width: "80%", mb: "10px" }}
          />
          {instructorCourses.length > 0 ? (
            <CourseCards
              courses={instructorCourses}
              role="Instructor"
            ></CourseCards>
          ) : null}

          {assistantCourses.length > 0 ? (
            <CourseCards
              courses={assistantCourses}
              role="Assistant"
            ></CourseCards>
          ) : null}

          {studentCourses.length > 0 ? (
            <CourseCards courses={studentCourses} role="Student"></CourseCards>
          ) : null}
        </Box>
      ) : null}
    </Box>
  );
};

export default ViewCourses;
