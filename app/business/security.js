(function ()
{
    'use strict';
    var q = require('q');

    function isAuthenticated()
    {
        var defer = q.defer();
        defer.reject('UNAUTHORIZED');
        return defer.promise;
    }

    module.exports = {
        isAuthenticated: isAuthenticated
    };
})();