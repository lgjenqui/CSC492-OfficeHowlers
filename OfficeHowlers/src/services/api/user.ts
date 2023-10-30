import User from "../../../../Models/user.model";

export async function getUser(): Promise<any> {
    const requestOptions = {
      method: "GET"
    };
  
    // Create the new course

    return (await fetch(window.location.origin + "/api/username", requestOptions)).json();
}
