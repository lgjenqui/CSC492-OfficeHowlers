## Shibboleth Reverse Proxy Notes

Run pre-built images with: 

```podman run -p 443:443 --network sdc --env-file env.file dockerhub.csc.ncsu.edu/ignacioxd/apacheshib-proxy```