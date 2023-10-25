import Course from "../../../../Models/course.model";

export async function createCourse(name: string, desc: string, startDate: Date, endDate: Date): Promise<any> {
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