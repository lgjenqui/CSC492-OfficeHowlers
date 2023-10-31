import { Box, CardContent, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";

interface Props {
  courseName: string;
  courseDescription: string;
  role: string;
}

const CourseCard = ({ courseName, courseDescription, role }: Props) => {
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
      <CardContent>
        <Typography sx={{ fontSize: 42, mb: "0" }}>{courseName}</Typography>
        <Typography sx={{ fontSize: 23 }}>{courseDescription}</Typography>
        <Divider
          sx={{ borderTop: "1px solid white", width: "80%", mb: "10px" }}
        />
        <Typography sx={{ fontSize: 20 }} variant="body2">
          Enrolled as {role}
        </Typography>
      </CardContent>
    </Box>
  );
};

export default CourseCard;
