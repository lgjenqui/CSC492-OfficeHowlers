## HowlBack Notes

Basic express server with one basic endpoint to test basic authentication configuration. 

Build with: 

``` podman build . -t howlback ```

Run with: 

```podman run -p 3000:3000 --network sdc --env-file .env --name api howlback```

Placing HowlBack behind Shibboleth reverse proxy gives these headers, providing the names and IDs we will need to authorize users: 

```{
    host: 'localhost',
    'sec-fetch-site': 'cross-site',
    'accept-language': 'en-US,en;q=0.9',
    cookie: '_shibsession_XXXXXXX=_XXXXXXX',
    'sec-fetch-mode': 'navigate',
    accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Safari/605.1.15',
    referer: 'https://shib.ncsu.edu/',
    'sec-fetch-dest': 'document',
    'accept-encoding': 'gzip, deflate, br',
    'x-shib_eppn': 'lgjenqui@ncsu.edu',
    'x-shib_uid': 'lgjenqui',
    'x-shib_cpid': '200353696@ncsu.edu',
    'x-shib_ncsu_cid': '200353696',
    'x-shib_eptid': 'https://shib.ncsu.edu/idp/shibboleth!https://csc.ncsu.edu/sp/shibboleth!XXXXXXX=',
    'x-shib_pwexpired': 'N',
    'x-shib_pwexpiredate': 'Wed Apr 24 2024 10:00:00 GMT-0400 (EDT)',
    'x-shib_primary': 'student',
    'x-shib_unaffiliation': 'student;member',
    'x-shib_affiliation': 'student@ncsu.edu;member@ncsu.edu',
    'x-shib_mail': 'lgjenqui@ncsu.edu',
    'x-shib_sn': 'Jenquin',
    'x-shib_givenname': 'Luke',
    'x-shib_displayname': 'Luke Gabriel Jenquin',
    'x-forwarded-proto': 'https',
    'x-forwarded-ssl': 'on',
    'x-forwarded-for': '192.168.127.1',
    'x-forwarded-host': 'localhost',
    'x-forwarded-server': 'local.ncsu.edu',
    connection: 'Keep-Alive'
  }
