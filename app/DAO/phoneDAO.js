(function ()
{
    'use strict';
    var q = require('q');
    var sequence = 1;
    var data = [
        {_id: sequence++, model: 'New phones', brand: 'new brand mock'}
    ];

    function createNewOrUpdate(phone)
    {
        var defer = q.defer();

        function searchToUpdate()
        {
            for (var i = 0; i < data.length; i++) {
                if (phone._id.toString() === data[i]._id.toString()) {
                    data[i] = phone;
                    defer.resolve({results: data[i]});
                } else if (i === data.length - 1) {
                    defer.reject('NOT_FOUND');
                }
            }
        }

        if (!phone._id) {
            //    create
            var phoneAdd = {_id: sequence++, model: phone.model, brand: phone.brand, stan: phone.stan};
            data.push(phoneAdd);
            defer.resolve({results: phoneAdd});
            return defer.promise;
        } else {
            //update
            searchToUpdate();
            return defer.promise;
        }
    }

    function search()
    {
        var defer = q.defer();
        defer.resolve({results: data});
        return defer.promise;
    }

    function getDetails(phoneId)
    {
        var defer = q.defer();
        for (var i = 0; i < data.length; i++) {
            if (phoneId === data[i]._id.toString()) {
                defer.resolve({results: data[i]});
            } else if (i === data.length - 1) {
                defer.reject('NOT_FOUND');
            }
        }
        return defer.promise;
    }

    function removePhone(phoneId)
    {
        phoneId = parseInt(phoneId, 10);
        data.splice(phoneId - 1, 1);
        var defer = q.defer();
        defer.resolve({results: data});
        return defer.promise;
    }

    module.exports = {
        removePhone: removePhone,
        getDetails: getDetails,
        createNewOrUpdate: createNewOrUpdate,
        search: search
    };
})();
