import Course from "../../../../Models/course.model";
import { setCourses } from "../../components/instructor/Instructor";

export async function createCourse(name: string, desc: string) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseName: name,
        courseDescription: desc,
      }),
    };
  
    // Create the new course
    await fetch("http://localhost:8080/api/course/create", requestOptions);
  
    // Update the existing list of courses in the system
    var res = await fetch("http://localhost:8080/api/course/all");
    var courses: Course[] = await res.json();
    setCourses(courses);
  }