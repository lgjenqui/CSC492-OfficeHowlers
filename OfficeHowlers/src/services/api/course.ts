import Course from "../../../../Models/course.model";

export async function createCourse(name: string, desc: string): Promise<any> {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseName: name,
        courseDescription: desc,
      }),
    };
  
    // Create the new course
    return (await fetch("http://localhost:8080/api/course/create", requestOptions));
}

export async function getCourses(): Promise<Course[]> {
    // Update the existing list of courses in the system
    return (await fetch("http://localhost:8080/api/course/all")).json();
}