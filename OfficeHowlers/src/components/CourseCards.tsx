import Course from "../../../Models/course.model";
import CourseCard from "./CourseCard";
import { Grid } from "@mui/material";

interface Props {
  courses: Course[];
  role: string;
}

const CourseCards = ({ courses, role }: Props) => {
  if (!courses) {
    return null;
  }
  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={3}>
      {courses.map((course, index) => (
        <Grid item key={index} sx={{ paddingTop: 0 }}>
          <CourseCard course={course} role={role}></CourseCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default CourseCards;
