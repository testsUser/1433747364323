'use strict';

angular.module('taskApp').factory('patchModel', function ($http) {

  var entityId = null;
  var apiAddress = null;
  var callback = null;
  var ignoreTab = [];

  function generateJsonPatch(model, oldModel) {
    if (null == model && null == oldModel) {
      return;
    }

    angular.forEach(ignoreTab, function (item) {
      item = item.replace('/', '');
      if (model && model.hasOwnProperty(item)) {
        delete model[item];
      }
      if (oldModel && oldModel.hasOwnProperty(item)) {
        delete oldModel[item];
      }
    });

    var patch = jsonpatch.compare(oldModel, model);
    if (patch && patch.length > 0) {
      if (apiAddress) {
        var id = entityId ? entityId : model.id;
        if (null == id) {
          throw new Error('Missing model id');
        }
        $http.patch(apiAddress + '/' + id, patch).then(function () {
          console.log('Patch saved');
        });
      }
      if (callback instanceof Function) {
        callback(patch);
      }
    }
  }

  function construct(object, $scope) {
    $scope.$watch(function () {
      return object;
    }, function (newValue, oldValue) {
      if (apiAddress != null || callback != null) {
        generateJsonPatch(newValue, oldValue);
      }
    }, true);

    return patchModelPublic;
  }

  var patchModelPublic = {
    api: function (address) {
      apiAddress = address ? address : null;
      return patchModelPublic;
    },
    callback: function (cb) {
      callback = cb instanceof Function ? cb : null;
      return patchModelPublic;
    },
    ignore: function (ignore) {
      ignoreTab = ignore instanceof Array ? ignore : [];
      return patchModelPublic;
    },
    id: function (id) {
      entityId = id ? id : null;
      return patchModelPublic;
    }
  };
  return construct;
});
