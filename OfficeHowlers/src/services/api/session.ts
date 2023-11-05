import { Dayjs } from "dayjs";
import Course from "../../../../Models/course.model";
export async function startSession(courses: Course[], inPerson: Boolean, online: Boolean, startTime: Dayjs | null, endTime: Dayjs | null) {
    var names:string[] = new Array(courses.length);
    for(var i = 0; i < courses.length; i++){
        names[i] = courses[i].name;
    }
    console.log(names);
    console.log(inPerson);
    console.log(online);
    console.log(startTime);
    console.log(endTime);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseIDs: courses.map((course) => course.id),
        inPerson: inPerson,
        online: online,
        startTime: startTime,
        endTime: endTime
      }),
    };

    return (await fetch(window.location.origin + "/api/session/create", requestOptions));
}

export async function getMySession(): Promise<any> {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  // Create the new course
  return (await fetch(window.location.origin + "/api/session/all", requestOptions)).json();
}
