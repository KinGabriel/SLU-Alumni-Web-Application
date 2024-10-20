<?php
require_once '../model/userModel.php';
require_once '../database/configuration.php';

// Create a database connection
$db = new dbConnection();
$connection = $db->getConnection();
$userModel = new userModel($connection);

// Fetch user data from the model
$users = $userModel->getUser();
header('Content-Type: application/json');

// Check if users data is not empty and is an array
if (!empty($users) && is_array($users)) { 
    $userData = array_map(function($user) {
        return [ 
            'name' => $user['Name'], 
            'email' => $user['email'], 
            'id_number' => $user['school_id'], 
            'gradyear' => $user['gradyear'] ?? "N/A", 
            'status' => $user['is_employed'] ? 'employed' : 'unemployed', 
            'role' => $user['user_type'] 
        ];
    }, $users);
    echo json_encode($userData);
} else {
    echo json_encode([]);
}
?>
