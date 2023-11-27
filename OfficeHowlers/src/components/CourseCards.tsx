import CourseModel from "../../../Models/course.model";
import Course from "../../../Models/course.model";
import CourseCard from "./CourseCard";
import { Grid } from "@mui/material";

interface Props {
  courses: Course[];
  role: string;
  setDisplayedCourse: (course: CourseModel | null) => void;
  setDisplayedCourseRole: (role: string) => void;
}

const CourseCards = ({
  courses,
  role,
  setDisplayedCourse,
  setDisplayedCourseRole,
}: Props) => {
  if (!courses) {
    return null;
  }
  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={3}>
      {courses.map((course, index) => (
        <Grid item key={index} sx={{ paddingTop: 0 }}>
          <CourseCard
            course={course}
            role={role}
            setDisplayedCourse={setDisplayedCourse}
            setDisplayedCourseRole={setDisplayedCourseRole}
          ></CourseCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default CourseCards;
