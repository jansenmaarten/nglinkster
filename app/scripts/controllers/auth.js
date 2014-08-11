'use strict';

app.controller('AuthCtrl', function($location, Auth, User) {
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
    Auth.register(self.user).then(function(registeredUser) {
      User.create(registeredUser, self.user.username);
      Auth.login(self.user).then(function() {
        Auth.signedIn();
        $location.path('/');
      });
    }, function(error) {
      self.error = error.toString();
    });
  };
});
