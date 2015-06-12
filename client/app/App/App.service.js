'use strict';

angular.module('solumApp')
  .factory('App', function (Auth, $http) {
    //var apps = [];

    // Public API here
    return {
      getAppsAsync: function (cb) {
        var authToken = Auth.getToken();
        console.log('get some apps', authToken);
        $http.get('/api/apps', {
          authToken: authToken
        }).
        success(function(data){
          console.log('apps', data);
          return cb(data);
        }).
        error(function(err){
          return cb(err);
        });
      }
    };
  });
