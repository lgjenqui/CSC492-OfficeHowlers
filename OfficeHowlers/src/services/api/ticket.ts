import { Dayjs } from "dayjs";
import Course from "../../../../Models/course.model";
import Ticket from "../../../../Models/ticket.model";

export async function createTicket(problemDescription: string, solutionAttempt: string): Promise<any> {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        problemDescription: problemDescription,
        solutionAttempt: solutionAttempt
      }),
    };
  
    // Create the new course
    return (await fetch(window.location.origin + "/api/ticket/create", requestOptions));
}


