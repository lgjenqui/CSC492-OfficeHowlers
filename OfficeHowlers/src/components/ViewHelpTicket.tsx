import { Box, Divider } from "@mui/material/";
import Typography from "@mui/material/Typography";
import TicketWrapperModel from "../../../Models/ticketWrapper.model";
import StudentHelpTicket from "./StudentHelpTicket";

interface Props {
  studentHelpTicket: TicketWrapperModel | null;
}

const ViewHelpTicket = ({ studentHelpTicket }: Props) => {
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
          My help ticket
        </Typography>
        <Divider
          sx={{ borderTop: "1px solid black", width: "80%", mb: "10px" }}
        />
        <StudentHelpTicket ticket={studentHelpTicket} />
      </Box>
    </Box>
  );
};

export default ViewHelpTicket;
