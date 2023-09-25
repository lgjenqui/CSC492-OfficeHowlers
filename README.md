## General notes
To run the application, navigate to the root directory (where the ```docker-compose.yaml``` file is located) and run the command ```docker compose up --build``` to build the images and run them inside separate containers. You can use ```docker compose down``` to delete the running containers when you're done with them. The compose file automatically creates a network and runs all containers within that network. 
 
## Concerns / Development Notes
* We may want to stop using .env files and instead hardcode our environment variables into the Docker Compose file. Dr. Potts recommended this
* Currently, the one API endpoint in the backend is accepting requests from any machine/IP address. This wouldn't work in production, and we should think about how to configure CORS for production, though I believe the backend should only accept requests from Shibboleth, and the same with the frontend
* The frontend is targeting localhost for its test request. it should makes calls to /api or something similar in practice, then the reverse proxy (which will run in the same network as the other docker containers) can make requests to the backend via its service name in the docker compose file (currently just 'backend')

## Next steps!
1. Implement basic login skeleton
    * Buttons to log in as instructor, TA, and student
    * Note - we should separate our html and css files, decide on a general structure for the frontend files, and make sure that our code is clean and consistent!! 
2. Implement course creation and related UCs
3. Add Shibboleth to the compose file and configure it
    * On a related note, we must add the appropriate mappings for Shibboleth to the compose file (80 for http, 443 for https). We can remove the other mappings eventually - they are convenient sometimes for development, but ultimately unnecessary