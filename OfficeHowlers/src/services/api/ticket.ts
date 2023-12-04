import { Dayjs } from "dayjs";
import Course from "../../../../Models/course.model";
import Ticket from "../../../../Models/ticket.model";
import TicketWrapperModel from "../../../../Models/ticketWrapper.model";

export async function createTicket(courseId: string, assignment: string, problemDescription: string, solutionAttempt: string, group: string[]): Promise<any> {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ticket: {
          assignment: assignment,
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

export async function setStudentTicketStatus(active: boolean, ticket: TicketWrapperModel): Promise<any> {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "active": active,
      "ticketId": ticket.id
    }),
  };

  // Create the new course
  return (await fetch(window.location.origin + "/api/ticket/setStatus", requestOptions)).json();
}

export async function getMyTicketPosition(): Promise<any> {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  // Create the new course
  return (await fetch(window.location.origin + "/api/ticket/position", requestOptions)).json();
}