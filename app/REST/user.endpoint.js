(function ()
{
    'use strict';

    var businessContainer = require('../business/business.container');

    module.exports = function (router)
    {
        router.route('/api/user/auth').post(function (request, response)
        {
            businessContainer.getUserManager(request).authenticate(request.body.email, request.body.password).then(function (result)
            {
                response.status(200).send({token: result});
            }).catch(function (error)
            {
                if ('UNAUTHORIZED' === error) {
                    response.sendStatus(401);
                } else if ('NOT_FOUND' === error) {
                    response.sendStatus(404);
                } else {
                    response.sendStatus(500);
                }
            });
        });
        router.route('/api/user').post(function (request, response)
        {
            businessContainer.getUserManager(request).addUser(request.body).then(function (result)
            {
                response.status(200).send(result);
            });
        });
    };
})();