(function ()
{
    'use strict';
    var phoneDAO = require( '../DAO/phoneDAO' );
    var tokenDAO = require( '../DAO/tokenDAO' );
    var security = require( '../business/security' );

    module.exports = function (router)
    {
        router.use( '/api/phones', function( request, response, next ) {
            tokenDAO.get( ( request.headers.authorization || '' ).split('Token ').join('')).then(function() {
                request.authorized = true;
            }).finally(next);
        } );

        router.route('/api/phones').get(function (request, respond)
        {
            phoneDAO.search(request.query).then(function (result)
            {
                respond.status(200).send(result);
            }).catch(function ()
            {
                respond.sendStatus(500);
            });
        }).post(function (request, respond)
        {
            security.isAuthenticated( request.authorized ).then( function() {
                return phoneDAO.createNewOrUpdate(request.body).then(function (result)
                {
                    respond.status(200).send(result);
                })
            } ).catch(function (error)
            {
                if ('UNAUTHORIZED' === error) {
                    respond.sendStatus(401);
                } else {
                    respond.sendStatus(500);
                }
            });
        });

        router.route('/api/phones/:id').get(function (request, respond)
        {
            security.isAuthenticated( request.authorized ).then( function() {
                return phoneDAO.getDetails(request.params.id).then(function (results)
                {
                    respond.status(200).send(results);
                })
            } ).catch(function (error)
            {
                if ('UNAUTHORIZED' === error) {
                    respond.sendStatus(401);
                } else {
                    respond.sendStatus(500);
                }
            });
        }).delete(function (request, respond)
        {
            security.isAuthenticated( request.authorized ).then( function() {
                return phoneDAO.removePhone(request.params.id).then(function ()
                {
                    respond.sendStatus(200);
                })
            } ).catch(function (error)
            {
                if ('UNAUTHORIZED' === error) {
                    respond.sendStatus(401);
                } else {
                    respond.sendStatus(500);
                }
            });
        });
    };
})();