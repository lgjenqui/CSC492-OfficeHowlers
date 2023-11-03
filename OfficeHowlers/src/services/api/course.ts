import { Dayjs } from "dayjs";
import Course from "../../../../Models/course.model";
import User from "../../../../Models/user.model";

// Set up a timeout of 2.5 seconds so the user doesn't sit on a blank page too long!
const controller = new AbortController()
setTimeout(() => controller.abort(), 2500)

export async function createCourse(name: string, desc: string, startDate: Dayjs, endDate: Dayjs): Promise<any> {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        description: desc,
        startDate: startDate, 
        endDate: endDate
      }),
    };
  
    // Create the new course
    return (await fetch(window.location.origin + "/api/course/create", requestOptions));
}

export async function getCourses(): Promise<{instructorCourses: Course[], assistantCourses: Course[], studentCourses: Course[]}> {
  const requestOptions = {
    method: "GET",
    signal: controller.signal
  };
  
  return (await fetch(window.location.origin + "/api/course/all", requestOptions)).json();
}

export async function getInstructors(courseUUID: string): Promise<{ instructors: User[] }> {
  return (await fetch(window.location.origin + "/api/course/manage/instructors/get?id=" + courseUUID)).json();
}

export async function getAssistants(courseUUID: string): Promise<{assistants: User[]}> {
  return (await fetch(window.location.origin + "/api/course/manage/assistants/get?id=" + courseUUID)).json();
}

export async function getStudents(courseUUID: string): Promise<{ students: User[] }> {
  return (await fetch(window.location.origin + "/api/course/manage/roster/get?id=" + courseUUID)).json();
}

export async function addInstructors(emails: string[], courseUUID: string): Promise<any> {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ emails: emails }),
  };

  // Add the new instructors
  return (await fetch(window.location.origin + "/api/course/manage/instructors/add?id=" + courseUUID, requestOptions));
}

export async function addAssistants(emails: string[], courseUUID: string): Promise<any> {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ emails: emails }),
  };

  // Add the new assistants
  return (await fetch(window.location.origin + "/api/course/manage/assistants/add?id=" + courseUUID, requestOptions));
}

export async function addStudents(emails: string[], courseUUID: string): Promise<any> {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ emails: emails }),
  };

  // Add the new students
  return (await fetch(window.location.origin + "/api/course/manage/roster/add?id=" + courseUUID, requestOptions));
}
