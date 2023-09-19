## MariaDB Notes

Build with: 

``` docker build . -t frontend ```

Run with: 

```docker run -p 3000:3000 --network sdc --env-file .env --name frontend frontend```