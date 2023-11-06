import { Box, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import FacultyHelpTicket from "./FacultyHelpTicket";
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
          My help session queue
        </Typography>
        <Divider
          sx={{ borderTop: "1px solid black", width: "80%", mb: "10px" }}
        />
        {noTicketsMsg}
        {tickets.map((ticket, index) => (
          <FacultyHelpTicket ticket={ticket} key={index} />
        ))}
      </Box>
    </Box>
  );
};

export default ViewHelpSession;
