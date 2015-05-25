#MongoDB - search, sort and pagination

##Summary
DAO's method designed to receiving data from mongo database. There is ability to perform searching in collection, sort results and paginate it using only mongo queries.

##Goal
Your goal consist in write body of DAO's search method. Use **/app/DAO/phoneDAO** file for your solution. Searching operation is performing on collection which has structure:

```
{
    model: String,
    brand: String,
    state: String
}
```

Our DAO method accepts as parameter object whose properties could be from range of `search, skip, limit, orderBy, sortBy` where `search` is string to search for, `orderBy` can be 'ASC or 'DESC' and `sortBy` is name of field to sort by. Properties `skip` and `limit` are numbers.

You need to fill our DAO method in accordance to guidelines:

- it should return promise,
- by default result of search must be sorted `ascending` by `_id` field and must contain two elements from collection.
- structure of returning data should have structure like: `{ results: [], total: int }`, where results is found data and total is number of all elements in collection.

 
##Setup
Type `npm install` before start.

Type `grunt test` to run unit tests. Note that you have to run `mongod` on your system before running rests.
