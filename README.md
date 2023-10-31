## General notes

To run the application, navigate to the root directory (where the `docker-compose.yaml` file is located) and run the command `docker compose up --build` to build the images and run them inside separate containers. You can use `docker compose down` to delete the running containers when you're done with them. The compose file automatically creates a network and runs all containers within that network.

## Concerns / Development Notes

- We may want to stop using .env files and instead hardcode our environment variables into the Docker Compose file. Dr. Potts recommended this
- Currently, the one API endpoint in the backend is accepting requests from any machine/IP address. This wouldn't work in production, and we should think about how to configure CORS for production, though I believe the backend should only accept requests from Shibboleth, and the same with the frontend
- The frontend is targeting localhost for its test request. it should makes calls to /api or something similar in practice, then the reverse proxy (which will run in the same network as the other docker containers) can make requests to the backend via its service name in the docker compose file (currently just 'backend')
- Building the `apacheshib` service in the docker compose file requires pulling down its image from dockerhub.csc.ncsu.edu/ignacioxd/apacheshib-proxy. This can only be done on campus wifi or when connected to the NCSU VPN. Just a note, not a problem.
