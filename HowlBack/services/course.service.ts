import Course from '../models/course.model';

export async function isValidInstructorForCourse( email: string, course: Course ) {
    const instructors = await course.getInstructors();
    return instructors.find((user) => { return user.email == email });
}

export async function isValidInstructorOrAssistantForCourse( email: string, course: Course ) {
    const assistants = await course.getAssistants();
    const instructors = await course.getInstructors();
    const allElevatedUsers = assistants.concat(instructors);
    return allElevatedUsers.find((user) => { return user.email == email });
}

export async function isValidUserForCourse( email: string, course: Course ) {
    const instructors = await course.getInstructors();
    const assistants = await course.getAssistants();
    const students = await course.getStudents();
    const allCourseUsers = instructors.concat(assistants, students);
    return allCourseUsers.find((user) => { return user.email == email });
}
