'use strict';

app.controller('NavCtrl', function($scope, $location, $timeout, Post, Auth) {
    var self = this;

    self.post = {
      url: 'http://',
      title: ''
    };

    $scope.$on('$firebaseSimpleLogin:login', function() {
      Auth.signedIn();
      $location.path('/');
    });

    self.submitPost = function() {
      Post.create(self.post).then(function(ref) {
        self.post = {
          url: 'http://',
          title: ''
        };

        $location.path('/posts/' + ref.name());
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
