import Course from "../../../Models/course.model";
import CourseCard from "./CourseCard";
import { Grid, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
  courses: Course[];
  role: string;
}

const CourseCards = ({ courses, role }: Props) => {
  const navigate = useNavigate();

  if (!courses) {
    return null;
  }
  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={3}>
      {courses.map((course, index) => (
        <Grid item key={index}>
          <Card
            sx={{
              mt: "20px",
              backgroundColor: "#CC0000",
              backgroundClip: "padding-box",
              color: "white",
              borderRadius: "15px",
            }}
            onClick={() => navigate("/course?id=" + course.id)}
          >
            <CourseCard
              courseName={course.name}
              courseDescription={course.description}
              role={role}
            ></CourseCard>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CourseCards;
