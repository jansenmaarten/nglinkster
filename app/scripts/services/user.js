'use strict';

app.factory('User', function($rootScope, $firebase, FIREBASE_URL, Auth) {
  var ref = new Firebase(FIREBASE_URL + 'users');

  var User = {
    create: function(authUser, username) {
      ref.child(username).setWithPriority({
        md5Hash: authUser.md5_hash,
        username: username
      }, authUser.uid, function() {
        setCurrentUser(username);
      });
    },
    findByUsername: function(username) {
      if (username) {
        var userRef = new Firebase(FIREBASE_URL + 'users/' + username);
        return $firebase(userRef).$asObject();
      }
    },
    getCurrent: function() {
      return $rootScope.currentUser;
    },
    signedIn: function() {
      return Auth.signedIn();
    }
  };

  function setCurrentUser(username) {
    $rootScope.currentUser = User.findByUsername(username);
  }

  $rootScope.$on('$firebaseSimpleLogin:login', function(e, authUser) {
    var userQuery = ref.startAt(authUser.uid).limit(1);
    userQuery.on('child_added', function(user) {
      setCurrentUser(user.val().username);
    });
  });

  return User;
});
