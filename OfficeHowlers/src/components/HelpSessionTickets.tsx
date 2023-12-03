import { Box, Button, Card, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import TicketWrapperModel from "../../../Models/ticketWrapper.model";
import { setStudentTicketStatus } from "../services/api/ticket";
import { getTimeDiffStr } from "../services/util/misc";
import { useEffect, useState } from "react";

interface Props {
  // TODO: This component should receive MULTIPLE tickets
  tickets: TicketWrapperModel[];
}

const HelpSessionTickets = ({ tickets }: Props) => {
  var helpTime = dayjs();
  if (tickets.length == 0) {
    return null;
  }
  console.log(tickets);

  const [activeTicket, setActiveTicket] = useState<TicketWrapperModel | null>(
    null
  );

  function setStudentTicketStatusHandler(
    active: boolean,
    ticket: TicketWrapperModel
  ): void {
    // TODO: Send this info to the backend instead of using local storage
    localStorage.setItem("time", helpTime.toString());
    setStudentTicketStatus(active).then();

    // Update the view to show that this ticket is active
    if (active) {
      setActiveTicket(ticket);
    } else {
      ticket!.active = false;
      setActiveTicket(null);
    }
  }

  useEffect(() => {
    console.log(tickets);
    tickets.forEach((ticket) => {
      if (ticket && ticket.active) {
        setActiveTicket(ticket);
      }
    });
  });

  if (tickets.length == 0) {
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
      {tickets.map((ticket) => {
        if (!ticket || !ticket.User || !ticket.Course) {
          console.log(ticket);
          return null;
        }
        return (
          <Card
            key={ticket.id}
            sx={{
              mt: "20px",
              border: "2px solid #CC0000",
              backgroundClip: "padding-box",
              color: "black",
              borderRadius: "15px",
              ":hover": {
                cursor: "default",
              },
              padding: 0,
            }}
          >
            <CardContent sx={{ padding: 0 }}>
              <Box
                sx={{
                  background: "#CC0000",
                  color: "white",
                  pt: "10px",

                  pb: "15px",
                }}
              >
                <Typography sx={{ fontSize: 42, mb: "0", textAlign: "center" }}>
                  {ticket.User.firstName} {ticket.User.lastName}
                </Typography>
                <Box sx={{ textAlign: "center", mt: "5px" }}>
                  <Typography
                    sx={{
                      display: "inline",
                      fontSize: 23,
                      mb: "5px",
                      mr: "45px",
                    }}
                  >
                    <b>Course: </b>
                    {ticket.Course.name}
                  </Typography>
                  <Typography
                    sx={{
                      display: "inline",
                      fontSize: 23,
                      mb: "5px",
                      mr: "45px",
                    }}
                  >
                    <b>Location: </b>Virtual
                  </Typography>
                  {!activeTicket && (
                    <Typography
                      sx={{
                        display: "inline",
                        fontSize: 23,
                        mb: "5px",
                        mr: "45px",
                      }}
                    >
                      <b>Waiting for: </b>
                      {getTimeDiffStr(ticket.createdAt, dayjs())}
                    </Typography>
                  )}
                  {activeTicket && (
                    <Typography
                      sx={{
                        display: "inline",
                        fontSize: 23,
                        mb: "5px",
                        mr: "45px",
                      }}
                    >
                      <b>Being Helped For: </b>
                      {getTimeDiffStr(
                        dayjs(localStorage.getItem("time")),
                        dayjs()
                      )}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box sx={{ m: "15px" }}>
                <Box sx={{ m: "auto", mt: "10px" }}>
                  <Typography
                    sx={{ fontSize: 23, mb: "5px", fontWeight: "bold" }}
                  >
                    Assignment:
                  </Typography>
                  <Typography
                    sx={{
                      background: "white",
                      color: "black",
                      width: "90%",
                      paddingTop: "3px",
                      paddingBottom: "3px",
                      paddingLeft: "15px",
                      fontSize: 23,
                      mb: "15px",
                      ml: "20px",
                      mt: "5px",
                      border: "1px solid black",
                      borderRadius: "10px",
                    }}
                  >
                    {ticket.assignment}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 23, mb: "5px", fontWeight: "bold" }}
                  >
                    Problem description:
                  </Typography>
                  <Typography
                    sx={{
                      background: "white",
                      color: "black",
                      width: "90%",
                      paddingTop: "3px",
                      paddingBottom: "3px",
                      paddingLeft: "15px",
                      fontSize: 23,
                      mb: "15px",
                      ml: "20px",
                      mt: "5px",
                      border: "1px solid black",
                      borderRadius: "10px",
                    }}
                  >
                    {ticket.problemDescription}
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
                      background: "white",
                      color: "black",
                      width: "90%",
                      paddingTop: "3px",
                      paddingBottom: "3px",
                      paddingLeft: "15px",
                      fontSize: 23,
                      mb: "5px",
                      ml: "20px",
                      mt: "5px",
                      border: "1px solid black",
                      borderRadius: "10px",
                    }}
                  >
                    {ticket.solutionAttempt}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    textAlign: "center",
                    mt: "35px",
                  }}
                >
                  {!activeTicket && (
                    <Button
                      sx={{
                        fontSize: 20,
                        color: "white",
                        backgroundColor: "#CC0000",
                        ":hover": {
                          backgroundColor: "#D9D9D9",
                        },
                        mr: "20px",
                      }}
                      variant="contained"
                      onClick={() => {
                        setStudentTicketStatusHandler(true, ticket);
                      }}
                    >
                      Help student
                    </Button>
                  )}
                  {!activeTicket && (
                    <Button
                      sx={{
                        fontSize: 20,
                        color: "white",
                        backgroundColor: "#CC0000",
                        ":hover": {
                          backgroundColor: "#D9D9D9",
                        },
                      }}
                      variant="contained"
                      onClick={() => {}}
                    >
                      Remove from queue
                    </Button>
                  )}
                  {activeTicket && (
                    <Button
                      sx={{
                        fontSize: 20,
                        color: "white",
                        backgroundColor: "#CC0000",
                        ":hover": {
                          backgroundColor: "#D9D9D9",
                        },
                      }}
                      variant="contained"
                      onClick={() => {
                        setStudentTicketStatusHandler(false, ticket);
                      }}
                    >
                      Return to queue
                    </Button>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default HelpSessionTickets;
