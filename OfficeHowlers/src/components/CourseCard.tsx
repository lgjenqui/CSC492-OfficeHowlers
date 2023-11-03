import { Box, CardContent, Divider, Card } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Course from "../../../Models/course.model";

interface Props {
  course: Course;
  role: string;
}

const CourseCard = ({ course, role }: Props) => {
  const navigate = useNavigate();

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
        onClick={() => navigate("/course?id=" + course.id)}
      >
        <CardContent>
          <Typography sx={{ fontSize: 42, mb: "0" }}>{course.name}</Typography>
          <Typography sx={{ fontSize: 23 }}>{course.description}</Typography>
          <Divider
            sx={{ borderTop: "1px solid white", width: "80%", mb: "10px" }}
          />
          <Typography sx={{ fontSize: 20 }} variant="body2">
            Enrolled as {role}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CourseCard;
