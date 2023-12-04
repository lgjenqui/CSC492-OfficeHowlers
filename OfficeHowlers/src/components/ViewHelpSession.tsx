import { Box, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import HelpSessionTickets from "./HelpSessionTickets";
import TicketWrapperModel from "../../../Models/ticketWrapper.model";
import { useEffect, useState } from "react";
import { userHasOngoingSession } from "../services/api/session";

interface Props {
  tickets: TicketWrapperModel[];
}

const ViewHelpSession = ({ tickets }: Props) => {
  var noTicketsMsg = null;
  const [ongoingSession, setOngoingSession] = useState<Boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await userHasOngoingSession().then((res) => {
          if (res && res.hasSession) {
            setOngoingSession(true);
          }
        });
      } catch {
        console.log("Error checking if the user has an ongoing session.");
      }
    };

    fetchData();
  });

  if (!ongoingSession) {
    noTicketsMsg = (
      <Typography
        sx={{
          fontSize: "35px",
          display: "inline-block",
          width: "80%",
        }}
      >
        It looks like you haven't started a help session yet. To start a help
        session, use the <b>'Start help session'</b> option to the left.
      </Typography>
    );
  } else if (
    ongoingSession &&
    (!Array.isArray(tickets) || tickets.length == 0)
  ) {
    noTicketsMsg = (
      <Typography
        sx={{
          fontSize: "35px",
          display: "inline-block",
          width: "80%",
        }}
      >
        No students have submitted help tickets yet.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        width: "70%",
        height: "100%",
        m: "auto",
        mt: 0,
        userSelect: "none",
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: 38,
            fontWeight: "bold",
            mt: "20px",
            ml: 0,
            display: "inline-block",
            width: "100%",
          }}
        >
          My help session queue
        </Typography>
        <Divider
          sx={{ borderTop: "1px solid black", width: "100%", mb: "10px" }}
        />
        {noTicketsMsg}
        {ongoingSession ? <HelpSessionTickets tickets={tickets} /> : null}
      </Box>
    </Box>
  );
};

export default ViewHelpSession;
