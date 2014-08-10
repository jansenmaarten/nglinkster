'use strict';

app.factory('Post', function($firebase, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL + 'posts');

  var sync = $firebase(ref);

  var posts = sync.$asArray();

  var Post = {
    all: posts,
    create: function(post) {
      return posts.$add(post);
    },
    find: function(postId) {
      return posts[posts.$indexFor(postId)];
    },
    delete: function(postIndex) {
      return posts.$remove(postIndex);
    }
  };

  return Post;
});
