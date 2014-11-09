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
    <?= $this->Html->css('base.css') ?>

    <?= $this->Html->script('angular.min.js') ?>
    <?= $this->Html->script('app.js') ?>
</head>
<body class="home" ng-cloak>
    <div class="row" ng-controller="main.geoCtrl as geoCtrl">
        map
    </div>
</body>
</html>

