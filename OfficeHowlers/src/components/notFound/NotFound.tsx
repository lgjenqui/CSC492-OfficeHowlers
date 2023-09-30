import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";

interface Props {
  onReturnHome: () => void;
}

const NotFound = ({ onReturnHome }: Props) => {
  return (
    <Box sx={{ m: "auto" }}>
      <Typography
        sx={{
          fontSize: 30,
          fontWeight: "bold",
          mt: "20px",
          textAlign: "center",
        }}
      >
        PAGE NOT FOUND
      </Typography>

      <Button
        sx={{
          m: 0,
          mt: "15px",
          position: "absolute",
          left: "50%",
          msTransform: "translateX(-50%)",
          transform: "translatex(-50%)",
          fontSize: 20,
          backgroundColor: "#CC0000",
          ":hover": {
            backgroundColor: "#9e0000",
          },
        }}
        variant="contained"
        onClick={() => onReturnHome()}
      >
        Return to home
      </Button>
    </Box>
  );
};

export default NotFound;
