import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TicketModel from "../../../Models/ticket.model";
import CourseModel from "../../../Models/course.model";
import HelpTicket from "./HelpTicket";

interface Props {
  studentHelpTicket: TicketModel | null;
  studentHelpTicketCourse: CourseModel | null;
}

const ViewHelpTicket = ({
  studentHelpTicket,
  studentHelpTicketCourse,
}: Props) => {
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
        <HelpTicket
          helpTicket={studentHelpTicket}
          course={studentHelpTicketCourse}
        />
      </Box>
    </Box>
  );
};

export default ViewHelpTicket;
