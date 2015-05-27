(function ()
{
    'use strict';
    var userDAO = require( '../DAO/userDAO' );
    var tokenDAO = require( '../DAO/tokenDAO' );
    var sha1 = require('sha1');
    var q = require('q');

    module.exports = function (router)
    {
        var defer = q.defer();
        defer.resolve();
        return defer.promise;
    };
})();