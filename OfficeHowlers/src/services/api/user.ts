import User from "../../../../Models/user.model";

export async function getUser(): Promise<User> {
    const requestOptions = {
      method: "GET"
    };
  
    // Create the new course

    return (await fetch(window.location.origin + "/api/user", requestOptions)).json();
}
