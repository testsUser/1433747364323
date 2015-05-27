(function ()
{
    'use strict';
    var q = require('q');

    function isAuthenticated( authorized )
    {
        var defer = q.defer();
        if( !authorized ) {
            defer.reject('UNAUTHORIZED');
        }
        else {
            defer.resolve();
        }
        return defer.promise;
    }

    module.exports = {
        isAuthenticated: isAuthenticated
    };
})();