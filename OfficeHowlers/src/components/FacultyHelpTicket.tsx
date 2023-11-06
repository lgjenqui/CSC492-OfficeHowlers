import { Box, CardContent, Divider, Card, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import TicketWrapperModel from "../../../Models/ticketWrapper.model";

interface Props {
  ticket: TicketWrapperModel | null;
}

const FacultyHelpTicket = ({ ticket }: Props) => {
  if (!ticket) {
    return null;
  }

  return (
    <Box
      sx={{
        width: "80%",
        minWidth: "600px",
        maxWidth: "1200px",
        display: "block",
        ":hover": {
          cursor: "pointer",
        },
        ":active": {
          backgroundColor: "#D9D9D9",
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
          ":hover": {
            cursor: "default",
          },
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 42, mb: "0", textAlign: "center" }}>
            {/* {ticket.nam} */}
          </Typography>
          <Box sx={{ textAlign: "center", mt: "5px" }}>
            <Typography
              sx={{ display: "inline", fontSize: 23, mb: "5px", mr: "45px" }}
            >
              <b>Course: </b>CSC116
            </Typography>
            <Typography
              sx={{ display: "inline", fontSize: 23, mb: "5px", mr: "45px" }}
            >
              <b>Location: </b>Virtual
            </Typography>
            <Typography
              sx={{ display: "inline", fontSize: 23, mb: "5px", mr: "45px" }}
            >
              <b>Waiting for: </b>45 min
            </Typography>
            <Divider
              sx={{
                m: "auto",
                borderTop: "1px solid white",
                width: "95%",
                mt: "10px",
                mb: "10px",
              }}
            />
          </Box>
          <Box sx={{ m: "auto", mt: "10px" }}>
            <Typography sx={{ fontSize: 23, mb: "5px", fontWeight: "bold" }}>
              Problem description:
            </Typography>
            <Typography
              sx={{
                // background: "#D9D9D9",
                color: "white",
                width: "90%",
                paddingTop: "3px",
                paddingBottom: "3px",
                paddingLeft: "15px",
                fontSize: 23,
                mb: "15px",
                ml: "20px",
                mt: "5px",
                border: "1px solid white",
              }}
            >
              - I can't open my IDE!I can't open my IDE!I can't open my IDE!I
              can't open my IDE!I can't open my IDE!I can't open my IDE!I can't
              open my IDE!I can't open my IDE!I can't open my IDE!I can't open
              my IDE!I can't open my IDE!
            </Typography>
            <Typography
              sx={{
                fontSize: 23,
                fontWeight: "bold",
              }}
            >
              What they've tried:
            </Typography>
            <Typography
              sx={{
                // background: "#D9D9D9",
                color: "white",
                width: "90%",
                paddingTop: "3px",
                paddingBottom: "3px",
                paddingLeft: "15px",
                fontSize: 23,
                mb: "5px",
                ml: "20px",
                mt: "5px",
                border: "1px solid white",
              }}
            >
              - Turning my computer off and back on...
            </Typography>
          </Box>
          <Box
            sx={{
              textAlign: "center",
              mt: "35px",
            }}
          >
            <Button
              sx={{
                fontSize: 20,
                color: "#CC0000",
                backgroundColor: "white",
                ":hover": {
                  backgroundColor: "#D9D9D9",
                },
                mr: "20px",
              }}
              variant="contained"
              onClick={() => {}}
            >
              Help student
            </Button>
            <Button
              sx={{
                fontSize: 20,
                color: "#CC0000",
                backgroundColor: "white",
                ":hover": {
                  backgroundColor: "#D9D9D9",
                },
              }}
              variant="contained"
              onClick={() => {}}
            >
              Remove from queue
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FacultyHelpTicket;
