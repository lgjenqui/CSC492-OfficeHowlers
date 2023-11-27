import { Box, CardContent, Divider, Card, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import TicketWrapperModel from "../../../Models/ticketWrapper.model";

interface Props {
  ticket: TicketWrapperModel | null;
}

const StudentHelpTicket = ({ ticket }: Props) => {
  if (!ticket) {
    return null;
  }
  console.log(ticket);

  return (
    <Box
      sx={{
        width: "550px",
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
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 42, mb: "0" }}>
            {ticket.Course.name}
          </Typography>
          <Divider
            sx={{ borderTop: "1px solid white", width: "80%", mb: "10px" }}
          />
          <Typography sx={{ fontSize: 23 }}>
            <b>Assignment: </b>
            {ticket.assignment}
          </Typography>
          <Typography sx={{ fontSize: 23 }}>
            <b>Position in queue: </b>
            3rd
          </Typography>
          <Typography sx={{ fontSize: 23 }}>
            <b>Problem description: </b>
            {ticket.problemDescription}
          </Typography>
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
              Edit help ticket
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
              Cancel help ticket
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StudentHelpTicket;
