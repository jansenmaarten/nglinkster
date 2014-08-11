'use strict';

app.factory('Post', function($firebase, FIREBASE_URL, User) {
  var ref = new Firebase(FIREBASE_URL + 'posts');

  var sync = $firebase(ref);

  var posts = sync.$asArray();

  var Post = {
    all: posts,
    create: function(post) {
      if (User.signedIn()) {
        var user = User.getCurrent();
        post.owner = user.username;

        return posts.$add(post).then(function(ref) {
          var postId = ref.name();

          if (!user.posts) {
            user.$inst().$set('posts', '');
          }
          var postsRef = new Firebase(FIREBASE_URL + 'users/' + user.username + '/posts');
          var postsSync = $firebase(postsRef);
          postsSync.$set(postId, postId);

          return postId;
        });
      }
    },
    find: function(postId) {
      var postRef = new Firebase(FIREBASE_URL + 'posts/' + postId);
      var sync = $firebase(postRef);
      return sync.$asObject();
    },
    delete: function(postId) {
      if (User.signedIn()) {
        var post = Post.find(postId);
        post.$loaded().then(function() {
          var username = post.owner;

          console.log('Post belongs to ' + username);

          return posts.$remove(posts.$indexFor(postId)).then(function() {
            var postsRef = new Firebase(FIREBASE_URL + 'users/' + username + '/posts');
            var postsSync = $firebase(postsRef);
            postsSync.$remove(postId);
          });
        });
      }
    }
  };

  return Post;
});
