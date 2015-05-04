(function ()
{
    'use strict';

    var sha1 = require('sha1');
    var q = require('q');
    var userDAO = require('../DAO/userDAO');
    var tokenDAO = require('../DAO/tokenDAO');

    function create()
    {
        function hashPassword(password)
        {
            return sha1(password);
        }

        function getToken(user)
        {

        }

        function authenticate(email, password)
        {

        }

        function addUser(user)
        {

        }

        function getUserByToken(token)
        {

        }
        return{
            addUser: addUser,
            authenticate: authenticate,
            getUserByToken: getUserByToken
        };
    }

    module.exports = {
       create:create
    };
})();