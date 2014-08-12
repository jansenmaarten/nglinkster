'use strict';

app.controller('PostViewCtrl', function($routeParams, Post) {
  var self = this;

  self.post = Post.find($routeParams.postId);

  self.addComment = function() {
    Post.addComment($routeParams.postId, self.comment);
    self.comment = {};
  };

  self.removeComment = function(comment, commentId) {
    Post.deleteComment(self.post, comment, commentId);
  };
});
