<?php
require 'database/configuration.php';

$request = parse_url($_SERVER['request'], PHP_URL_PATH);

switch($request){
    case '/login':
       
}