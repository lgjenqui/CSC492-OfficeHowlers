import { Box, Typography, Divider, Button } from "@mui/material";
import CourseModel from "../../../Models/course.model";

interface Props {
  course: CourseModel | null;
}

const CourseJoinCode = ({ course }: Props) => {
  if (!course) {
    return null;
  }
  return (
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          m: "auto",
          mt: "20px",
          pt: "15px",
          pb: "10px",
          background: "#CC0000",
          borderRadius: "15px",
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: 35,
            mb: "5px",
            display: "inline",
          }}
        >
          Course Join Code
        </Typography>
        <Divider
          sx={{
            borderTop: "1px solid white",
            width: "50%",
            mb: "10px",
            m: "auto",
          }}
        />
        <Typography
          sx={{
            fontSize: 200,
            mb: "5px",
            display: "inline",
          }}
        >
          {course.studentJoinCode}
        </Typography>
        <Button
          sx={{
            fontSize: 20,
            color: "#CC0000",
            backgroundColor: "white",
            ":hover": {
              backgroundColor: "#EAEAEA",
            },
            m: "auto",
            mb: "15px",
            display: "block",
          }}
          variant="contained"
          onClick={() => {}}
        >
          Regenerate Code
        </Button>
      </Box>
    </Box>
  );
};

export default CourseJoinCode;
