import { Dayjs } from "dayjs";
import Course from "../../../../Models/course.model";
import Ticket from "../../../../Models/ticket.model";

export async function createTicket(courseId: string, problemDescription: string, solutionAttempt: string, group: string[]): Promise<any> {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ticket: {
          problemDescription: problemDescription,
          solutionAttempt: solutionAttempt
        },
        group: group

      }),
    };
  
    // Create the new course
    return (await fetch(window.location.origin + "/api/ticket/create?id=" + courseId, requestOptions));
}

export async function getTicket(): Promise<any> {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  // Create the new course
  return (await fetch(window.location.origin + "/api/ticket", requestOptions)).json();
}
