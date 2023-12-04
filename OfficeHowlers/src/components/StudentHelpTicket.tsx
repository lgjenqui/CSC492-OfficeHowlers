import { Box, Button, Card, CardContent, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import TicketWrapperModel from "../../../Models/ticketWrapper.model";
import { getMyTicketPosition } from "../services/api/ticket";

interface Props {
  ticket: TicketWrapperModel | null;
}

const StudentHelpTicket = ({ ticket }: Props) => {
  const [ticketPosition, setTicketPosition] = useState<string | null>("");
  const [ticketLocation, setTicketLocation] = useState<string | null>("");

  if (!ticket) {
    return null;
  }
  console.log(ticket);
  useEffect(() => {
    getMyTicketPosition()
      .then((value: string) => {
        setTicketPosition(value);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, []);
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
          {!ticket.active && (
            <Typography sx={{ fontSize: 23 }}>
              <b>Assignment: </b>
              {ticket.assignment}
            </Typography>
          )}
          {!ticket.active && (
            <Typography sx={{ fontSize: 23 }}>
              <b>Position in queue: </b>
              {ticketPosition}
            </Typography>
          )}
          {!ticket.active && (
            <Typography sx={{ fontSize: 23 }}>
              <b>Problem description: </b>
              {ticket.problemDescription}
            </Typography>
          )}
          {ticket.active && (
            <Typography sx={{ fontSize: 23 }}>
              You have been invited to join office hours
            </Typography>
          )}
          {ticket.active && (
            <Typography sx={{ fontSize: 23 }}>
              <b>Location: </b>
              {ticket.location}
            </Typography>
          )}

          <Box
            sx={{
              textAlign: "center",
              mt: "35px",
            }}
          >
            {!ticket.active && (
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
            )}
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
