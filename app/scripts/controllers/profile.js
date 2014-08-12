'use strict';

app.controller('ProfileCtrl', function($routeParams, Post, User) {
  var self = this;

  self.user = User.findByUsername($routeParams.username);
});
