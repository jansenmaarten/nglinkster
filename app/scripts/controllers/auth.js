'use strict';

app.controller('AuthCtrl', function($location, Auth) {
  var self = this;

  if (Auth.signedIn()) {
    $location.path('/');
  }

  self.login = function() {
    Auth.login(self.user).then(function() {
      Auth.signedIn();
      $location.path('/');
    }, function(error) {
      self.error = error.toString();
    });
  };

  self.register = function() {
    console.log(self.user);
    Auth.register(self.user).then(function() {
      Auth.signedIn();
      $location.path('/');
    }, function(error) {
      self.error = error.toString();
    });
  };
});
