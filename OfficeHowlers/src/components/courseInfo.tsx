import { Box, Typography, Divider, Grid } from "@mui/material";
import CourseModel from "../../../Models/course.model";
import TA_ICON_1 from "../assets/Temp/TA_icon_1.png";
import TA_ICON_2 from "../assets/Temp/TA_icon_2.png";

interface Props {
  course: CourseModel | null;
}

const CourseInfo = ({ course }: Props) => {
  if (!course) {
    return null;
  }
  return (
    <Box
      sx={{
        mt: "20px",
        background: "#CC0000",
        borderRadius: "15px",
        padding: "30px",
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
        Available staff:
      </Typography>
      <Divider
        sx={{
          borderTop: "1px solid white",
          width: "50%",
          m: "auto",
          mb: "10px",
        }}
      />
      <Grid sx={{ mb: "30px" }} container spacing={2}>
        <Grid item>
          <img
            src={TA_ICON_1}
            style={{
              borderRadius: "50%",
              border: "2px solid white",
              height: "150px",
              width: "150px",
            }}
          />
        </Grid>
        <Grid item>
          <Box>
            <Typography
              sx={{
                fontSize: 30,
                display: "inline",
              }}
            >
              Jane Doe
            </Typography>
            <Divider
              sx={{ borderTop: "1px solid white", width: "100%", mb: "10px" }}
            />
            <Typography
              sx={{
                fontSize: 25,
              }}
            >
              EB3 - Room 2201
            </Typography>
            <Typography
              sx={{
                fontSize: 25,
              }}
            >
              4:00pm - 5:30pm
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid sx={{ mb: "50px" }} container spacing={2}>
        <Grid item>
          <img
            src={TA_ICON_2}
            style={{
              borderRadius: "50%",
              border: "2px solid white",
              height: "150px",
              width: "150px",
            }}
          />
        </Grid>
        <Grid item>
          <Box>
            <Typography
              sx={{
                fontSize: 30,
                display: "inline",
              }}
            >
              John Doe
            </Typography>
            <Divider
              sx={{ borderTop: "1px solid white", width: "100%", mb: "10px" }}
            />
            <Typography
              sx={{
                fontSize: 25,
                textDecoration: "underline",
              }}
            >
              Zoom
            </Typography>
            <Typography
              sx={{
                fontSize: 25,
              }}
            >
              4:30pm - 5:45pm
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CourseInfo;
