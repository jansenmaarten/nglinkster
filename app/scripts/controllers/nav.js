'use strict';

app.controller('NavCtrl', function($rootScope, $location, $timeout, Post, Auth) {
    var self = this;

    self.post = {
      url: 'http://',
      title: ''
    };

    $rootScope.$on('$firebaseSimpleLogin:login', function() {
      Auth.signedIn();
      $location.path('/');
    });

    self.submitPost = function() {
      Post.create(self.post).then(function(postId) {
        self.post = {
          url: 'http://',
          title: ''
        };

        $location.path('/posts/' + postId);
      });
    };

    self.logout = function() {
      Auth.logout();

      $timeout(function(){
        Auth.signedIn();
        $location.path('/login');
      }, 500);
    };
});
