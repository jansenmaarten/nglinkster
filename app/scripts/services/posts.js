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
          return posts.$remove(posts.$indexFor(postId)).then(function() {
            var postsRef = new Firebase(FIREBASE_URL + 'users/' + username + '/posts');
            var postsSync = $firebase(postsRef);
            postsSync.$remove(postId);
          });
        });
      }
    },
    addComment: function(postId, comment) {
      if (User.signedIn()) {
        var user = User.getCurrent();

        comment.username = user.username;
        comment.postId = postId;

        console.log(comment);

        var postRef = new Firebase(FIREBASE_URL + 'posts/' + postId + '/comments');
        var postSync = $firebase(postRef);
        postSync.$push(comment).then(function(ref) {
          var userCommentsRef = new Firebase(FIREBASE_URL + 'users/' + user.username + '/comments');
          var userCommentsSync = $firebase(userCommentsRef);
          userCommentsSync.$set(ref.name(), {id: ref.name(), postId: postId});
        });
      }
    },
    deleteComment: function(post, comment, commentId) {
      if (User.signedIn()) {
        var user = User.findByUsername(comment.username);
        var commentsRef = new Firebase(FIREBASE_URL + 'posts/' + post.$id + '/comments');
        var commentsSync = $firebase(commentsRef);
        commentsSync.$remove(commentId).then(function() {
          var userCommentsRef = new Firebase(FIREBASE_URL + 'users/' + user.username + '/comments');
          var userCommentsSync = $firebase(userCommentsRef);
          userCommentsSync.$remove(commentId);
        });
      }
    }
  };

  return Post;
});
