#NodeJS - simple security

##Summary
Backend API in ExpressJS secured using authentication with tokens.

Already in our web application anyone can perform every CRUD operation. We don't like situation like that, so we wanna to introduce authentication to our service

##Goal
There are already API configured. Your goal is to secure the `phone` endpoint so that only authenticated users could interact with it.
Please follow the guidelines:

- We wanna get permission to displaying all phones for anyone, so make **GET /api/phones** endpoint only one which is unsecured
- All other endpoints should be accessible with token only.
- Token structure should be like e.g. `Token R28gYmFjayB0byB5b3VyIHRhc2sgTU9GTyE=`. We just wanna to check this token while interacting with API.
- You can use prepared DAOs


##API

###Authenticate user
```
POST /api/user/auth
{email:'', password:''}
```

Expected response: `{token:''}`

###Get phone list
```
GET /api/phones
```

Expected response: `{results:[]}`

###Create/Update phone
```
POST /api/phones
{ phone_entity }
```

Expected response: `{results: { phone_entity }}`

###Get details of phone
```
GET /api/phones/:id
```

Expected response: `{results: { phone_entity }}`

###Remove phone
```
DELETE /api/phones/:id
```

##Setup
Type `npm install` before start.

Type `grunt test` to run unit tests.

Good luck!
