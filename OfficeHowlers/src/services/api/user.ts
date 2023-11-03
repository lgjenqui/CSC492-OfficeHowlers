import User from "../../../../Models/user.model";

// Set up a timeout of 2.5 seconds so the user doesn't sit on a blank page too long!
const controller = new AbortController()
setTimeout(() => controller.abort(), 2500)

export async function getUser(): Promise<User> {
    const requestOptions = {
      method: "GET",
      signal: controller.signal
    };
  
    // Create the new course
    return (await fetch(window.location.origin + "/api/user", requestOptions)).json();
}
