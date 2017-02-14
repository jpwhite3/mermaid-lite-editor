'use strict';

/**
 * @ngdoc overview
 * @name LagoonApp
 * @description
 * # LagoonApp
 *
 * Main module of the application.
 */
angular
  .module('LagoonApp', ['ngSanitize', 'ab-base64'])
  .config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{%');
    $interpolateProvider.endSymbol('%}');
  })
  .config(['$compileProvider', function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|local|data):/);
  }])
  .config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
  }]);