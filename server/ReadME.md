# Helpful commands

`curl -i localhost:4000/v1/healthcheck`
`curl -X POST localhost:4000/v1/test_info`
`curl localhost:4000/v1/test_info/123`

# Error checking commands

`curl -i localhost:4000/foo`

Expected:

```
{
"error": "the requested resource could not be found"
}
```

`curl -i localhost:4000/v1/test_info/abc`
Expected:

```
{
"error": "the requested resource could not be found"
}
```

`curl -i -X PUT localhost:4000/v1/healthcheck`
Expected:

```
{
"error": "the PUT method is not supported for this resource"
}
```

# Post Test Info commands

```
BODY='{"title":"TitleTest","description":"This is the post request test"}'
curl -i -d "$BODY" localhost:4000/v1/test_info
```

# DB commands

## Credentials

Username = astro_admin
Password = password123

## Login

`psql --host=0.0.0.0 --dbname=postgres --username=astro_admin`
