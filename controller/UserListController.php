<?php
require_once '../model/userModel.php';
require_once '../database/configuration.php';

$db = new dbConnection();
$connection = $db->getConnection();

$userModel = new UserModel($connection);

$users = $userModel->getUser();
header('Content-Type: application/json');
echo json_encode($users);
?>