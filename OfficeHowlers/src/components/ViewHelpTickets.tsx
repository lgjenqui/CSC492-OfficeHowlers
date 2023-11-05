import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ViewHelpTickets = () => {
  return (
    <Box sx={{ width: "70%", height: "100%", m: "auto", userSelect: "none" }}>
      <Box>
        <Typography
          sx={{
            fontSize: "35px",
            fontWeight: "bold",
            mt: "20px",
            ml: 0,
            display: "inline-block",
            width: "100%",
          }}
        >
          My help tickets
        </Typography>
      </Box>
    </Box>
  );
};

export default ViewHelpTickets;
