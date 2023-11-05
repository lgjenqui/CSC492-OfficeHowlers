import { Box, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import TicketModel from "../../../Models/ticket.model";
import HelpTicket from "./HelpTicket";

interface Props {
  tickets: TicketModel[];
}

const ViewHelpSession = ({ tickets }: Props) => {
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
        {/* <HelpTicket
          helpTicket={}
          course={studentHelpTicketCourse}
        /> */}
      </Box>
    </Box>
  );
};

export default ViewHelpSession;
