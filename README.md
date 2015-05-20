#NodeJS - simple security

##Summary
Authentication and authorization in ExpressJS.

We've got simple app where user can do a CRUD operations on a phone book. Please, secure it.

##Goal
Your task is to secure the `phone` endpoint so that only authenticated users could interact with it.
There are already some routes and business objects configured.
All you need to do is to implement authentication and authorization.

##API

###Authenticate user
```
POST /api/user/auth
{email:'', password:''}
```

Expected response:

```
{token:''}
```

Where the token is plain value. It should be Base64 encoded end sent as header on subsequent requests that require authorization. Sample header for
token 'abc'.

```
Authorization: Token YWJj
```
 
##Setup
`npm test` to run tests (when You run start test you must switch off application, the tests automatically run the server)

`npm start` to run the app
