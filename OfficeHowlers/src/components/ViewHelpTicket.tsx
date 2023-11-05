import { Box, Divider } from "@mui/material/";
import Typography from "@mui/material/Typography";
import TicketModel from "../../../Models/ticket.model";
import CourseModel from "../../../Models/course.model";
import StudentHelpTicket from "./StudentHelpTicket";

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
        <Divider
          sx={{ borderTop: "1px solid black", width: "80%", mb: "10px" }}
        />
        <StudentHelpTicket
          ticket={studentHelpTicket}
          course={studentHelpTicketCourse}
        />
      </Box>
    </Box>
  );
};

export default ViewHelpTicket;
