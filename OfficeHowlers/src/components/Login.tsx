import { Box } from "@mui/material";
import { Button, Grid } from "@mui/material";

interface Props {
  systemRoles: string[];
  onLogin: (role: string) => void;
}

const Login = ({ systemRoles, onLogin }: Props) => {
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
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ mt: "20px", ml: "auto" }}
      >
        {systemRoles.map((role, index) => (
          <Button
            sx={{
              bgcolor: "white",
              color: "#CC0000",
              border: "1px solid white",
              fontSize: "20px",
              mr: "10px",
              ":hover": {
                bgcolor: "lightgrey",
                border: "0px",
              },
            }}
            variant="contained"
            onClick={() => onLogin(role)}
            key={index}
          >
            {role}
          </Button>
        ))}
      </Grid>
    </Box>
  );
};

export default Login;
