'use strict';

app.controller('PostViewCtrl', function($routeParams, Post) {
  var self = this;

  self.post = Post.find($routeParams.postId);
});
