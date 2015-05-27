describe('phones.endpoint', function ()
{
    'use strict';

    var superTest = require('supertest')(require('../../app/index.js'));
    var testHelper = require('../testHelper');

    describe('GET /api/phones',function()
    {
        var phones = [{model: 'New phones', brand: 'new brand mock'}];
        describe('when authorized',function()
        {
            var token;
            beforeEach(function (done)
            {
                superTest.post('/api/user/auth').set('Content-type', 'application/json').send({email: 'mock@email.com', password: 'simplePassword'})
                    .end(function (error,
                                   response)
                    {
                        if (error) {
                            done(error);
                        }
                        token = 'Token ' + response.body.token;
                        done();
                    });
            });

            it('should respond with 200 and all elements', function (done)
            {
                superTest.get('/api/phones').set('Authorization', token).expect(200).end(function(error, response)
                {
                    if (response.body.results && testHelper.isEquals(phones, response.body.results, ['_id'])) {
                        done();
                    } else {
                        done('Results is NOT equals');
                    }
                });
            });
        });
        describe('when not authorized',function()
        {
            it('should respond with 200 and all elements', function (done)
            {
                superTest.get('/api/phones').expect(200).end(function(error, response)
                {
                    if (response.body.results && testHelper.isEquals(phones, response.body.results, ['_id'])) {
                        done();
                    } else {
                        done('Results is NOT equals');
                    }
                });
            });
        });
    });
    describe('POST /api/phones', function ()
    {
        describe('when authorized', function ()
        {
            var phone = {model: 'New phones', brand: 'new brand mock'};
            var token;
            beforeEach(function (done)
            {
                superTest.post('/api/user/auth').set('Content-type', 'application/json').send({email: 'mock@email.com', password: 'simplePassword'})
                    .end(function (error,
                                   response)
                    {
                        if (error) {
                            done(error);
                        }
                        token = 'Token ' + response.body.token;
                        done();
                    });
            });
            describe('when we add one element without _id', function ()
            {
                it('should respond with 201 and this element', function (done)
                {
                    superTest.post('/api/phones').set('Authorization', token).send(phone).expect(201).end(function (error, response)
                    {
                        if (response.body.results && testHelper.isEquals(phone, response.body.results, ['_id'])) {
                            done();
                        } else {
                            done('Results is NOT equals');
                        }
                    });
                });
            });
            describe('when we update element in db', function ()
            {
                beforeEach(function (done)
                {
                    superTest.get('/api/phones').set('Authorization', token).expect(200).end(function (error, response)
                    {
                        phone = response.body.results[0];
                        done();
                    });
                });
                it('should update this element in db', function (done)
                {
                    phone.model = 'Test test';
                    phone.brand = 'mock mock';
                    superTest.post('/api/phones').set('Authorization', token).send(phone).end(function ()
                    {
                        superTest.get('/api/phones/' + phone._id).set('Authorization', token).expect(200).end(function (error, response)
                        {
                            if (response.body.results && testHelper.isEquals(phone, response.body.results)) {
                                done();
                            } else {
                                done('Results is NOT equals');
                            }
                        });
                    });
                });
            });
        });
        describe('when not authorized', function ()
        {
            var phone = {model: 'New phones', brand: 'new brand mock'};
            var phones;
            beforeEach(function (done)
            {
                superTest.get('/api/phones').expect(200).end(function (error, response)
                {
                    phones = response.body.results;
                    done();
                });
            });
            it('should respond with 401 and don\'t add element to DB', function (done)
            {
                superTest.post('/api/phones').send(phone).expect(401).end(function ()
                {
                    superTest.get('/api/phones').expect(200).end(function (error, response)
                    {
                        if (response.body.results && testHelper.isEquals(phones, response.body.results)) {
                            done();
                        } else {
                            done('Results is NOT equals');
                        }
                    });
                });
            });
        });
        describe('when given fake token', function ()
        {
            it('should respond with 401', function (done)
            {
                var token='Token asdsdsfdgsfg';
                superTest.post('/api/phones').set('Authorization', token).expect(401).end(done);
            });
        });
    });
    describe('GET /api/phones/:id', function ()
    {
        describe('when authorized', function ()
        {
            var token;
            beforeEach(function (done)
            {
                superTest.post('/api/user/auth').set('Content-type', 'application/json').send({email: 'mock@email.com', password: 'simplePassword'})
                    .end(function (error,
                                   response)
                    {
                        if (error) {
                            done(error);
                        }
                        token = 'Token ' + response.body.token;
                        done();
                    });
            });
            describe('when we get details of first element', function ()
            {
                var phoneId, phone;
                beforeEach(function (done)
                {
                    superTest.get('/api/phones').set('Authorization', token).end(function (error, response)
                    {
                        phone = response.body.results[0];
                        phoneId = response.body.results[0]._id;
                        done();
                    });
                });
                it('should respond with 200 and details of first phone', function (done)
                {
                    superTest.get('/api/phones/' + phoneId).set('Authorization', token).expect(200).end(function (error, response)
                    {
                        if (response.body.results && testHelper.isEquals(phone, response.body.results)) {
                            done();
                        } else {
                            done('Results is NOT equals');
                        }
                    });
                });
            });
        });
        describe('when not authorized', function ()
        {
            it('should respond with 401', function (done)
            {
                var phoneId;
                superTest.get('/api/phones').expect(200).end(function (error, response)
                {
                    phoneId = response.body.results[0]._id;
                    superTest.get('/api/phones/' + phoneId).expect(401).end(done);
                });
            });
        });
    });
    describe('DELETE /api/phones/:id', function ()
    {
        describe('when authorized', function ()
        {
            var token;
            beforeEach(function (done)
            {
                superTest.post('/api/user/auth').set('Content-type', 'application/json').send({email: 'mock@email.com', password: 'simplePassword'})
                    .end(function (error,
                                   response)
                    {
                        if (error) {
                            done(error);
                        }
                        token = 'Token ' + response.body.token;
                        done();
                    });
            });
            var phoneId;
            beforeEach(function (done)
            {
                superTest.get('/api/phones').end(function (error, response)
                {
                    phoneId = response.body.results[0]._id;
                    done();
                });
            });
            it('should respond with 200 and remove this element in db', function (done)
            {
                superTest.get('/api/phones').end(function (error, respond)
                {
                    superTest.delete('/api/phones/' + phoneId).set('Authorization', token).expect(200).end(function (error, response)
                    {
                        if (testHelper.isEquals({}, response.body)) {
                            superTest.get('/api/phones').end(function (error, response)
                            {
                                if (respond.body.results.length - 1 === response.body.results.length) {
                                    done();
                                } else {
                                    done('Length results is NOT correct');
                                }
                            });
                        } else {
                            done('Results is NOT equals');
                        }
                    });
                });
            });
        });
        describe('when not authorized', function ()
        {
            var token;
            beforeEach(function (done)
            {
                superTest.post('/api/user/auth').set('Content-type', 'application/json').send({email: 'mock@email.com', password: 'simplePassword'})
                    .end(function (error,
                                   response)
                    {
                        if (error) {
                            done(error);
                        }
                        token = 'Token ' + response.body.token;
                        done();
                    });
            });
            it('should respond with 401 and don\'t remove data', function (done)
            {
                var phoneId;
                superTest.get('/api/phones').expect(200).end(function (error, response)
                {
                    phoneId = response.body.results[0]._id;
                    superTest.delete('/api/phones/' + phoneId).expect(401).end(function ()
                    {
                        superTest.get('/api/phones/' + phoneId).set('Authorization', token).expect(200).end(function (error, respond)
                        {
                            var expect = {_id: 2, model: 'New phones', brand: 'new brand mock'};
                            if (respond.body.results && testHelper.isEquals(expect, respond.body.results)) {
                                done();
                            } else {
                                done('Remove data.');
                            }
                        });
                    });
                });
            });
        });
    });
});