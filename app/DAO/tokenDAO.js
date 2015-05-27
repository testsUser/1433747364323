(function ()
{
    'use strict';
    var tokens = [];
    var q = require('q');

    function addToken(userId)
    {
        var defer = q.defer();
        var id = new Buffer(new Date().getTime().toString()).toString('base64');

        var token = {_id: id, userId: userId};
        tokens.push(token);
        defer.resolve(token._id);
        return defer.promise;
    }

    function get(token)
    {
        var defer = q.defer();
        for (var i = 0; i < tokens.length; i++) {
            if (token === tokens[i]._id.toString()) {
                defer.resolve(tokens[i]);
            } else if (i === tokens.length - 1) {
                defer.reject('UNAUTHORIZED');
            }
        }
        return defer.promise;
    }

    module.exports = {
        addToken: addToken,
        get: get
    };
})();