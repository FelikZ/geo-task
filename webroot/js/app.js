'use strict';

var app = angular.module('geo', [
    'ngResource',
    'leaflet-directive',
    'autocomplete'
]);

app.controller('main.geoCtrl', ['$scope', '$timeout', 'geoService', 'leafletData', function ($scope, $timeout, geoService, leafletData) {

    var g = new geoService();

    angular.extend($scope, {
        radius: 30,
        centerMarker: {
            lat: 52.3702157,
            lng: 4.8951679,
            zoom: 10,
            message: "Beautiful city is hosted here",
            focus: true,
            draggable: false
        },
        circle: null,
        markers: [],
        defaults: {
            scrollWheelZoom: false
        },
        place: '',
        placeSuggestions: [],
        total_population: 0, 
        searchParam: ''
    });

    $scope.display = function (marker) {

        $scope.markers = [];
        $scope.markers.push(
            angular.extend(marker, {
                message: marker.message + ' [' + $scope.total_population + ']',
                zoom: 10,
                focus: true,
                draggable: false
            })
        );

        $scope.centerMarker = marker;

        leafletData.getMap().then(function(map) {

            if ($scope.circle) {
                map.removeLayer($scope.circle);
                delete $scope.circle;
            }

            $scope.circle = L.circle([$scope.centerMarker.lat, $scope.centerMarker.lng], $scope.radius * 1000).addTo(map);
        });
    }

    $scope.display($scope.centerMarker);

    $scope.onSelect = function () {
    }

    $scope.onChange = function () {

        $scope.onType($scope.searchParam);
    }

    var timeout = null;
    $scope.onType = function (text) {

        $scope.searchParam = text;

        if (timeout) {
            $timeout.cancel(timeout);
        }

        timeout = $timeout(function () {

            g.search(text).then(
                function (resp) {

                    $scope.placeSuggestions = [];
                    if (resp.suggest.my.length) {

                        for (var i in resp.suggest.my[0].options) {
                            $scope.placeSuggestions.push(resp.suggest.my[0].options[i].text);
                        }
                    }

                    if (!resp.hits.total) {
                        return;
                    }

                    if (resp.hits.hits[0]._source.name == text) {

                        var source = resp.hits.hits[0]._source;
                        g.population([resp.hits.hits[0]._source.location.lat, resp.hits.hits[0]._source.location.lon], $scope.radius)
                        .then(
                            function (resp) {

                                if (resp && resp.aggregations && resp.aggregations.total_population) {

                                    $scope.total_population = resp.aggregations.total_population.value;

                                    $scope.display({
                                        lat: source.location.lat,
                                        lng: source.location.lon,
                                        message: source.name
                                    });
                                }
                            }
                        );
                        return;
                    }

                    for (var i in resp.hits.hits) {
                        $scope.placeSuggestions.push(resp.hits.hits[i]._source.name);
                    }
                }
            );
        }, 350);
    }

}]);

app.factory('/search',
    ['$resource',
    function ($resource) {

    return $resource('/search', {}, {
        'save': { method: 'POST'/* , isArray: true */ }
    });
}]);

app.service('geoService', ['$q', '/search', function ($q, searchAPI) {

    var geo = function () {
    };

    geo.prototype.population = function (latLng, radius) {

        var defer = $q.defer();

        searchAPI.save({
                "query":
                {
                    "filtered":
                    {
                        "query":
                        {
                            "match_all" : {}
                        },
                        "filter":
                        {
                            "geo_distance" : {
                                "distance" : radius.toString() + "km",
                                "locality.location" : {
                                "lat": latLng[0],
                                "lon": latLng[1]
                                }
                            }
                        }
                    }
                },
                "aggs" : {
                    "total_population" : { "sum" : { "field" : "population" } }
                },
                "fields": ["_id"],
                "size": 10
            },
            defer.resolve,
            defer.reject
        );

        return defer.promise;
    }

    geo.prototype.search = function (phrase) {

        var defer = $q.defer();

        searchAPI.save({
            "query":
                {
                    "match": {
                        "name": phrase
                    }
                },
                "suggest" : {
                    "my": {
                        "text" : phrase,
                        "phrase" : {

                            "field" : "name",
                            "size" : 1,
                            "real_word_error_likelihood" : 0.95,
                            "max_errors" : 0.5,
                            "gram_size" : 2
                        }
                    }
                },
                "_source": ["name", "location", "population"],
                "size": 10
            },
            defer.resolve,
            defer.reject
        );

        return defer.promise;
    }

    return geo;
}]);

app.run();
