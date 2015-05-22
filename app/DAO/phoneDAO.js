(function ()
{
    'use strict';
    var mongoose = require('mongoose-q')();
    var phoneSchema = new mongoose.Schema({
        model: String,
        brand: String,
        stan: {type: String, enum: ['Used', 'New']}
    }, {
        collection: 'phones'
    });
    var Model = mongoose.model('phones', phoneSchema);

    function createNewOrUpdate(phone)
    {
        if (!phone._id) {
            //    create
            return new Model(phone).saveQ().then(function (result)
            {
                return {results: result};
            });
        } else {
            //update
            var id = phone._id;
            delete phone._id;
            return Model.where('_id').equals(id).findOneAndUpdateQ(phone).then(function (results)
            {
                return {results: results};
            });
        }
    }

    function search(query)
    {

    }

    function removePhone(phoneId)
    {
        return Model.findByIdAndRemoveQ(phoneId);
    }

    module.exports = {
        removePhone: removePhone,
        createNewOrUpdate: createNewOrUpdate,
        search: search
    };
})();
