import { Box, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import HelpSessionTickets from "./HelpSessionTickets";
import TicketWrapperModel from "../../../Models/ticketWrapper.model";

interface Props {
  tickets: TicketWrapperModel[];
}

const ViewHelpSession = ({ tickets }: Props) => {
  var noTicketsMsg = null;
  if (tickets.length == 0) {
    noTicketsMsg = (
      <Typography
        sx={{
          fontSize: "35px",
          display: "inline-block",
          width: "80%",
        }}
      >
        It looks like you haven't started a session or no students have
        submitted a help ticket.
        <br />
        <br />
        To start a help session, use the <b>'Start help session'</b> option to
        the left.
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
          sx={{ borderTop: "1px solid black", width: "80%", mb: "10px" }}
        />
        {noTicketsMsg}
        <HelpSessionTickets tickets={tickets} />
      </Box>
    </Box>
  );
};

export default ViewHelpSession;
