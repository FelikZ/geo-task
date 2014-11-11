<?php
use Cake\Cache\Cache;
use Cake\Core\Configure;
use Cake\Datasource\ConnectionManager;
use Cake\Error\Debugger;
use Cake\Network\Exception\NotFoundException;

$this->layout = false;

if (!Configure::read('debug')):
	throw new NotFoundException();
endif;

$cakeDescription = 'Search page';
?>
<!DOCTYPE html>
<html ng-app="geo">
<head>
    <?= $this->Html->charset() ?>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
        <?= $cakeDescription ?>
    </title>
    <?= $this->Html->meta('icon') ?>

    <?= $this->Html->css('bootstrap.min.css') ?>
    <?= $this->Html->css('leaflet.css') ?>
    <?= $this->Html->css('base.css') ?>
    <?= $this->Html->css('autocomplete.css') ?>

    <?= $this->Html->script('angular.min.js') ?>
    <?= $this->Html->script('angular-resource.min.js') ?>
    <?= $this->Html->script('autocomplete.js') ?>

    <?= $this->Html->script('leaflet.js') ?>
    <?= $this->Html->script('angular-leaflet-directive.min.js') ?>

    <?= $this->Html->script('app.js') ?>
</head>
<body class="container" style="min-height: 720px" ng-controller="main.geoCtrl as geoCtrl" ng-cloak>
    <div class="row clearfix">
        <div class="col-xs-12 column">
            <form role="form">
                <div class="form-group col-xs-4">
                    <label for="topic">Placename</label>
                    <autocomplete ng-model="place" data="placeSuggestions" on-type="onType" on-select="onSelect"></autocomplete>
                    <!-- <input ng&#45;model="InsertCtrl.topic" id="topic" type="text" class="form&#45;control" placeholder="Input city name in Europe..."> -->
                </div>
                <div class="form-group col-xs-1">
                    <label for="count">Radius</label>
                    <input ng-model="radius" ng-change="onChange()" type="text" class="form-control" placeholder="30" value="30"  />
                </div>
                <div class="clearfix"></div>
                <div class="form-group col-xs-1">
                    <button class="btn btn-primary">Search</button>
                </div>
                <div ng-if="total_population>0" class="col-xs-3">
                    <div>Total population: {{total_population}}</div>
                </div>
                <div class="clearfix"></div>
            </form>
        </div>
    </div>
    <div class="row">
        <div class="col-md-10 ng-scope" >
            <leaflet markers="markers" center="centerMarker"></leaflet>
        </div>
    </div>
</body>
</html>

