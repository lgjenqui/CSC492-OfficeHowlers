import { Box, CardContent, Divider, Card } from "@mui/material";
import Typography from "@mui/material/Typography";
import Course from "../../../Models/course.model";
import CourseModel from "../../../Models/course.model";
import { useEffect, useState } from "react";
import { getActiveFacultyMembers } from "../services/api/course";

interface Props {
  course: Course;
  role: string;
  setDisplayedCourse: (course: CourseModel | null) => void;
  setDisplayedCourseRole: (role: string) => void;
}

const CourseCard = ({
  course,
  role,
  setDisplayedCourse,
  setDisplayedCourseRole,
}: Props) => {
  const [facultyMembersJSX, setFacultyMembersJSX] =
    useState<JSX.Element | null>(null);

  useEffect(() => {
    // Grab the active faculty members for this course
    const grabFacultyMembers = async () => {
      await getActiveFacultyMembers(course.id).then((data) => {
        if (data.activeFaculty.length > 0) {
          setFacultyMembersJSX(
            <Box
              sx={{
                mt: "5px",
                mb: "10px",
              }}
            >
              <Typography
                sx={{
                  fontSize: 20,
                  fontWeight: "bold",
                  display: "inline",
                }}
                variant="body2"
              >
                Active Faculty:
              </Typography>
              {data.activeFaculty.map(
                (facultyMemberName: string, index: number) => {
                  return (
                    <Typography
                      sx={{ fontSize: 23, display: "inline", ml: "5px" }}
                      variant="body2"
                      key={facultyMemberName}
                    >
                      {data.activeFaculty.length > 1 && index != 0 ? ", " : ""}
                      {facultyMemberName}
                    </Typography>
                  );
                }
              )}
            </Box>
          );
        } else {
          setFacultyMembersJSX(
            <Typography sx={{ fontSize: 23 }} variant="body2">
              There are no active help sessions.
            </Typography>
          );
        }
      });
    };
    grabFacultyMembers();
  }, [course.id]);

  return (
    <Box
      sx={{
        width: "550px",
        ":hover": {
          cursor: "pointer",
        },
        ":active": {
          backgroundColor: "#9e0000",
        },
      }}
    >
      <Card
        sx={{
          mt: "20px",
          backgroundColor: "#CC0000",
          backgroundClip: "padding-box",
          color: "white",
          borderRadius: "15px",
        }}
        onClick={() => {
          setDisplayedCourse(course);
          setDisplayedCourseRole(role);
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 42, mb: "0" }}>{course.name}</Typography>
          <Typography sx={{ fontSize: 23 }}>{course.description}</Typography>
          {facultyMembersJSX}
          <Divider
            sx={{ borderTop: "1px solid white", width: "80%", mb: "10px" }}
          />
          <Typography sx={{ fontSize: 23 }} variant="body2">
            Enrolled as {role}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CourseCard;
