import { Box, Typography, Divider, Button } from "@mui/material";
import { useState } from "react";
import CourseModel from "../../../Models/course.model";
import { regenerateCourseCode } from "../services/api/course";

interface Props {
  course: CourseModel | null;
}

const CourseJoinCode = ({ course }: Props) => {
  if (!course) {
    return null;
  }

  const [joinCode, setJoinCode] = useState<string | null>(
    course.studentJoinCode
  );

  const handleRegenerateCodeClick = async () => {
    if (course.id) {
      try {
        const response = await regenerateCourseCode(course.id);
        if (response.ok) {
          const data = await response.json();
          setJoinCode(data.studentJoinCode);
        } else {
          // Handle the error response here
          console.error("Failed to regenerate course code.", response.status);
        }
      } catch (error) {
        console.error("Error during regeneration!", error);
      }
    }
  };

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
          {joinCode}
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
          onClick={() => handleRegenerateCodeClick()}
        >
          Regenerate Code
        </Button>
      </Box>
    </Box>
  );
};

export default CourseJoinCode;
