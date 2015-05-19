#MongoDB - sort, search and pagination

##Summary
Backend app providing endpoints able to return sorted data in parts.

Application has got already configured endpoints for CRUD operations and three DAO methods. We need DAO's find method to be configured in a way that would allow to sort, search and paginate data depending on received query.

##Goal
Your goal is to write body of DAO's find method. Possible properties of query are:

``` sortBy, orderBy, skip, limit ```

where `skip` and `limit` can be positive signed numbers, `orderBy` can be *ASC* or *DESC* strings and `sortBy` - name of field to sort by.
By default request for data should return only one, first record from sorted ascending by id data.
Structure of response.body should be like:

```{ result: [], total: x }```

where under `result` are returned data and under `total` are number of all records in collection.

##Documentation
* [mongoose](http://mongoosejs.com/)
 
##Setup
Run `npm install` before start.

Run `grunt test` to run unit tests. Note that you have to run `mongod` on your system before running rests.
 
 
 Good luck!