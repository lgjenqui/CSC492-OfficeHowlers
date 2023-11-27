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

// export async function getCourseQueue (req: Request, res: Response) {
//     try {
//       if (await isValidInstructorOrAssistantForCourse((req.headers['x-shib_mail']) as string, course)) {
        
//         res.status(200).json({ tickets: tickets });
//       } else {
//         res.status(403).json({ success: false, error: "Unauthorized to view course queue" });
//       }
//     } catch (error) {
//       res.status(500).json({ message: 'Error retrieving course queue', error: error.message });
//     }
//   };
