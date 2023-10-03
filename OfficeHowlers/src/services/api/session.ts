import { Dayjs } from "dayjs";
import Course from "../../../../Models/course.model";
export async function startSession(courses: Course[], mode: string | null , startTime: Dayjs | null, endTime: Dayjs | null) {
    var names:string[] = new Array(courses.length);
    for(var i = 0; i < courses.length; i++){
        names[i] = courses[i].name;
    }
    console.log(names);
    console.log(mode);
    console.log(startTime);
    console.log(endTime);
    /**const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionCourses: names,
        sessionMode: mode,
        startTime: startTime,
        endTime: endTime
      }),
    };
    */
    // Create the new course
    //await fetch("http://localhost:8080/api/course/create", requestOptions);
}
export async function getCourses(): Promise<Course[]> {
    // Update the existing list of courses in the system
    return (await fetch("http://localhost:8080/api/course/all")).json();
}