'use strict';

app.factory('Auth', function($firebaseSimpleLogin, FIREBASE_URL, $rootScope) {
  var ref = new Firebase(FIREBASE_URL);

  var auth = $firebaseSimpleLogin(ref);

  var Auth = {
    register: function(user) {
      return auth.$createUser(user.email, user.password);
    },
    signedIn: function() {
      if (auth.user !== null) {
        $rootScope.signedIn = true;
      } else {
        $rootScope.signedIn = false;
      }
      return $rootScope.signedIn;
    },
    logout: function() {
      auth.$logout();
    },
    login: function(user) {
      return auth.$login('password', user);
    }
  };

  return Auth;
});
