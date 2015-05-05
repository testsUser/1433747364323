#NodeJS - sort, search and pagination

##Summary
Sort data, pagination and search with mongoDB in ExpressJS.

We've got simple app where user can do a CRUD operations on a phone book, but server sending all data we can not search and sort, please write sorting data, 
search and pagination.

##Goal
Your task is write pagination, sort and search to endpoint `GET /api/phones`, default settings server should sort **ASC** create data, sent first record in database.
When in request have query params **skip** and **limit** should pagination records and sent under property **results** and under property **total** sent 
how many records in database. When query params have property **sortBy** should server sort this property **ASC** or **DESC** and pagination results.
There are already some routes objects configured.

##API

```
GET /api/phones[...]
```

##Documentation
* [mongoose](http://mongoosejs.com/)
 
##Setup
`npm test` to run tests (when You run start test you must switch off application, the tests automatically run the server)

`npm start` to run the app
