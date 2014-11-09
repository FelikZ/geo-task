'use strict';

var app = angular.module('geo', []);

app.controller('main.geoCtrl', ['geoService', function (geo) {
    var g = new geo();
    g.search(); 
}]);

app.service('geoService', [function () {

    var geo = function () {
        
    };

    geo.prototype.search = function () {
        console.log('it works');
    }

    return geo;
}]);

