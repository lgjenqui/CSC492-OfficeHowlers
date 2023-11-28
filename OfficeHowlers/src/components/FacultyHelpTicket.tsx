import { Box, CardContent, Divider, Card, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import TicketWrapperModel from "../../../Models/ticketWrapper.model";
import { getTimeDiffStr } from "../services/util/misc";
import dayjs, { Dayjs } from "dayjs";
import { setBeingHelped } from "../services/api/ticket";
import React from "react";

interface Props {
  ticket: TicketWrapperModel | null;
}

const FacultyHelpTicket = ({ ticket }: Props) => {
  var helpTime = dayjs();
  if (!ticket) {
    return null;
  }

  function beingHelped(): void{
    localStorage.setItem("time", helpTime.toString());
    setBeingHelped();
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
            {ticket.User.firstName} {ticket.User.lastName}
          </Typography>
          <Box sx={{ textAlign: "center", mt: "5px" }}>
            <Typography
              sx={{ display: "inline", fontSize: 23, mb: "5px", mr: "45px" }}
            >
              <b>Course: </b>
              {ticket.Course.name}
            </Typography>
            <Typography
              sx={{ display: "inline", fontSize: 23, mb: "5px", mr: "45px" }}
            >
              <b>Location: </b>Virtual
            </Typography>
            {!ticket.beingHelped && <Typography
              sx={{ display: "inline", fontSize: 23, mb: "5px", mr: "45px" }}
            >
              <b>Waiting for: </b>{getTimeDiffStr(ticket.createdAt, dayjs())}
            </Typography>
            }
            {ticket.beingHelped && <Typography
              sx={{ display: "inline", fontSize: 23, mb: "5px", mr: "45px" }}
            >
              <b>Being Helped For: </b>{getTimeDiffStr(dayjs(localStorage.getItem("time")), dayjs())}
            </Typography>
            }
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
              Assignment:
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
              - {ticket.assignment}
            </Typography>
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
              - {ticket.problemDescription}
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
              - {ticket.solutionAttempt}
            </Typography>
          </Box>
          <Box
            sx={{
              textAlign: "center",
              mt: "35px",
            }}
          >
            {!ticket.beingHelped && <Button
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
              onClick={() => {beingHelped()}}
            >
              Help student
            </Button>
            }
            {!ticket.beingHelped && <Button
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
            }
            {ticket.beingHelped && <Button
              sx={{
                fontSize: 20,
                color: "#CC0000",
                backgroundColor: "white",
                ":hover": {
                  backgroundColor: "#D9D9D9",
                },
              }}
              variant="contained"
              onClick={() => {setBeingHelped()}}
            >
              Return to queue
            </Button>
            }
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FacultyHelpTicket;
