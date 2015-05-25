describe('DAO\'s search method', function ()
{
    'use strict';

    var DAO = require('../../app/index.js');
    var testHelper = require('../testHelper');
    var phones = [{
        model: 'Nokia',
        brand: 'Test Phone',
        state: 'New'
        },
        {
            model: 'Mock',
            brand: 'Super Phone',
            state: 'New'
        },
        {
            model: 'Time Phone',
            brand: 'Test Phone',
            state: 'New'
        }];

    beforeEach(function (done)
    {
        testHelper.openDBConnection();
        testHelper.seedPhones(phones).then(function ()
        {
            done();
        });
    });

    afterEach(function (done)
    {
        testHelper.closeDBConnection(done);
    });

    it('should return promise', function (done)
    {
        if (testHelper.isPromise( DAO.search({}) )) {
            done();
        } else {
            done('Return is NOT promise');
        }
    });

    it('should returned data have proper body structure', function (done)
    {
        DAO.search({}).then(function(data)
        {
            if (data && data.hasOwnProperty('results') && data.hasOwnProperty('total') ) {
                done();
            } else {
                done('Return is NOT promise');
            }
        });
    });

    describe('when don\'t provide query params', function ()
    {
        it('should respond with 2 elements', function (done)
        {
            DAO.search({}).then( function( data ) {
                if (testHelper.isEquals( phones.slice( 0, 2 ), data.results, ['_id', '__v'])) {
                    done();
                } else {
                    done('Results is NOT equals');
                }
            });
        });
    });

    describe('search param', function ()
    {
        describe('when provided search param equals "Pho"', function()
        {
            it('should respond with 2 elements', function(done)
            {
                DAO.search({ search: 'Pho' }).then( function( data ) {
                    if( testHelper.isEquals( phones.slice( 0, 2 ), data.results, ['_id', '__v']) ) {
                        done();
                    }
                    else {
                        done('Results is NOT equals')
                    }
                });
            });
        });

        describe('when provided search param equals "oki"', function()
        {
            it( 'should respond with 1 element', function( done )
            {
                DAO.search({ search: 'oki' }).then( function( data ) {
                    if( testHelper.isEquals( [ phones[ 0 ] ], data.results, ['_id', '__v']) ) {
                        done();
                    }
                    else {
                        done('Results is NOT equals')
                    }
                });
            } );
        });
    } );

    describe('pagination params', function()
    {
        describe('when provided skip param equals 2', function ()
        {
            it('should respond with one, third element', function (done)
            {
                DAO.search({ skip: 2 }).then( function( data ) {
                    if (testHelper.isEquals( phones.slice( 2 ), data.results, ['_id', '__v'])) {
                        done();
                    } else {
                        done('Results is NOT equals');
                    }
                });
            });
        });

        describe('when provided skip param equals 3', function ()
        {
            it('should respond with nothing', function (done)
            {
                DAO.search({ skip: 3 }).then( function( data ) {
                    if (0 === data.results.length) {
                        done();
                    } else {
                        done('Result is not empty');
                    }
                });
            });
        });

        describe('when provided skip param equals -1', function ()
        {
            it('should respond first two elements', function (done)
            {
                DAO.search({ skip: -1 }).then( function( data ) {
                    if (testHelper.isEquals( phones.slice(0, 2), data.results, ['_id', '__v'])) {
                        done();
                    } else {
                        done('Result is not empty');
                    }
                });
            });
        });

        describe('when provided limit param equals 1', function ()
        {
            it('should respond with first two elements', function (done)
            {
                DAO.search({ limit: 1 }).then( function( data ) {
                    if (testHelper.isEquals( phones.slice( 0, 1 ), data.results, ['_id', '__v'])) {
                        done();
                    } else {
                        done('Results is NOT equals');
                    }
                });
            });
        });

        describe('when provided limit param equals 10', function ()
        {
            it('should respond all elements', function (done)
            {
                DAO.search({ limit: 10 }).then( function( data ) {
                    if (testHelper.isEquals( phones, data.results, ['_id', '__v'])) {
                        done();
                    } else {
                        done('Result is not empty');
                    }
                });
            });
        });

        describe('when provided limit param equals 0', function ()
        {
            it('should respond first two elements', function (done)
            {
                DAO.search({ limit: 0 }).then( function( data ) {
                    if (testHelper.isEquals( phones.slice(0, 2), data.results, ['_id', '__v'])) {
                        done();
                    } else {
                        done('Result is not empty');
                    }
                });
            });
        });

        describe('when provided limit param equals 3 and skip param equals 1', function ()
        {
            it('should respond with two last elements', function (done)
            {
                DAO.search({ skip: 1, limit: 3 }).then( function( data ) {
                    if (testHelper.isEquals( phones.slice( 1 ), data.results, ['_id', '__v'])) {
                        done();
                    } else {
                        done('Result is not empty');
                    }
                });
            });
        });
    });

    describe('sort params', function()
    {
        describe('when provided orderBy param equals "ASC"', function ()
        {
            it('should respond with 2 elements sorted ascending', function (done)
            {
                DAO.search({ orderBy: 'ASC' }).then( function( data ) {
                    if (testHelper.isEquals( phones.slice( 0, 2 ), data.results, ['_id', '__v'])) {
                        done();
                    } else {
                        done('Results is NOT equals');
                    }
                });
            });
        });

        describe('when provided orderBy param equals "DESC"', function ()
        {
            it('should respond with 2 elements sorted descending', function (done)
            {
                DAO.search({ orderBy: 'DESC' }).then( function( data ) {
                    var tempPhones = [];
                    for( var i=phones.length; i>1; ) {
                        tempPhones.push( phones[ --i ] );
                    }
                    if (testHelper.isEquals( tempPhones, data.results, ['_id', '__v'])) {
                        done();
                    } else {
                        done('Results is NOT equals');
                    }
                });
            });
        });

        describe('when provided orderBy param is invalid', function ()
        {
            it('should respond with 2 elements sorted ascending', function (done)
            {
                DAO.search({ orderBy: 'other string' }).then( function( data ) {
                    if (testHelper.isEquals( phones.slice( 0, 2 ), data.results, ['_id', '__v'])) {
                        done();
                    } else {
                        done('Results is NOT equals');
                    }
                });
            });
        });

        describe('when provided sortBy param equals "_id"', function ()
        {
            it('should respond with 2 elements sorted by _id ', function (done)
            {
                DAO.search({ sortBy: '_id' }).then( function( data ) {
                    if (testHelper.isEquals( phones.slice( 0, 2 ), data.results, ['_id', '__v'])) {
                        done();
                    } else {
                        done('Results is NOT equals');
                    }
                });
            });
        });

        describe('when provided sortBy param equals "model"', function ()
        {
            it('should respond with 2 elements sorted by model', function (done)
            {
                DAO.search({ sortBy: 'model' }).then( function( data ) {

                    var tempPhones = testHelper.sort( 'model', 1, testHelper.makeCopy( phones ) );

                    if (testHelper.isEquals( tempPhones.slice( 0, 2 ), data.results, ['_id', '__v'])) {
                        done();
                    } else {
                        done('Results is NOT equals');
                    }
                });
            });
        });

        describe('when provided sortBy param equals "state" and orderBy param equals "DESC"', function ()
        {
            it('should respond with 2 elements sorted descending by model', function (done)
            {
                DAO.search({ sortBy: 'state', orderBy: 'DESC' }).then( function( data ) {

                    var tempPhones = testHelper.sort( 'state', -1, testHelper.makeCopy( phones ) );

                    if (testHelper.isEquals( tempPhones.slice( 0, 2 ), data.results, ['_id', '__v'])) {
                        done();
                    } else {
                        done('Results is NOT equals');
                    }
                });
            });
        });
    });
});