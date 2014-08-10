'use strict';

/**
 * @ngdoc overview
 * @name ngLinksterApp
 * @description
 * # ngLinksterApp
 *
 * Main module of the application.
 */
 /* global app:true */
 var app = angular.module('ngLinksterApp', [
     'ngAnimate',
     'ngCookies',
     'ngResource',
     'ngRoute',
     'ngSanitize',
     'ngTouch',
     'firebase'
   ]);

app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/posts.html',
        controller: 'PostsCtrl',
        controllerAs: 'postsCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthCtrl',
        controllerAs: 'authCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl',
        controllerAs: 'authCtrl'
      })
      .when('/posts/:postId', {
        templateUrl: 'views/postview.html',
        controller: 'PostViewCtrl',
        controllerAs: 'postViewCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
.constant('FIREBASE_URL', 'https://wappla.firebaseio.com/');
