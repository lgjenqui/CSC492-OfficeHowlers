import { Box } from "@mui/material";
import { Button } from "@mui/material";

const Login = () => {
  return (
    <Box
      sx={{
        m: "auto",
        background: "#CC0000",
        color: "white",
        width: "475px",
        height: "575px",
        borderRadius: "25px",
        mt: "50px",
      }}
    >
      <Box
        sx={{
          fontSize: "32px",
          textAlign: "center",
          paddingTop: "50px",
          fontWeight: "bold",
        }}
      >
        Local Login
      </Box>
      <Box sx={{ mt: "10px" }}>
        <Button
          sx={{
            color: "white",
            border: "1px solid white",
            fontSize: "20px",
            ml: "10px",
          }}
          variant="outlined"
        >
          Instructor
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
