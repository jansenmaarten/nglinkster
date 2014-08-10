'use strict';

app.controller('PostsCtrl', function($location, Post) {
    var self = this;

    self.posts = Post.all;
    
    this.deletePost = function(postIndex) {
      Post.delete(postIndex);
    };
});
