<?php
namespace App\Controller;

use Cake\Network\Http\Client;

// Proxy method for elastic search database, so we can control access here
class SearchController extends AppController {

    public function index() {

        $this->layout = false;
        $this->autoRender = false;

        // for demo project
        $this->response->disableCache();

        $data = $this->request->input();

        $client = new Client();

        $url = 'http://elasticdb:9200/opengeodb/locality/_search';
        $response = $client->post($url, $data, ['type' => 'json']);

        $this->response->type('json');
        $this->response->body($response->body());
    }
}
