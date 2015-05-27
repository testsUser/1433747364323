describe('user.endpoint', function ()
{
    'use strict';

    var superTest = require('supertest')(require('../../app/index.js'));
    var testHelper = require('../testHelper');

    describe('POST /api/user/auth', function ()
    {
        describe('when user exist in db', function ()
        {
            describe('and password is correct', function ()
            {
                var user = {email: 'mock@email.com', password: 'simplePassword'};
                it('should respond with status 200 and token', function (done)
                {
                    superTest.post('/api/user/auth').set('Content-type', 'application/json')
                        .send(user).expect(200).end(function (error, response)
                    {
                        if (response.body.token) {
                            done();
                        } else {
                            done('Results NOT have token');
                        }
                    });
                });
            });
            describe('and password is NOT correct', function ()
            {
                var user = {email: 'mock@email.com', password: 'simplePassword1'};
                it('should respond with status 401 and without token', function (done)
                {
                    superTest.post('/api/user/auth').set('Content-type', 'application/json')
                        .send(user).expect(401).end(function (error, response)
                    {
                        if (!response.body.token) {
                            done();
                        } else {
                            done('Results have NOT token');
                        }
                    });
                });
            });
        });
        describe('when user NOT exist in DB', function ()
        {
            it('should respond with 404', function (done)
            {
                superTest.post('/api/user/auth').set('Content-type', 'application/json').send({
                    email: 'simple', password: 'digest'
                }).expect(404).end(done);
            });
        });
    });

});