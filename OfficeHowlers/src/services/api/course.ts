import { Dayjs } from "dayjs";
import Course from "../../../../Models/course.model";
import User from "../../../../Models/user.model";

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
  // Update the existing list of courses in the system
  return (await fetch(window.location.origin + "/api/course/all")).json();
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
