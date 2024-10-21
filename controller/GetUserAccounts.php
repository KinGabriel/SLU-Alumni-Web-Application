<?php
require_once '../database/Configuration.php';
require_once '../database/DriverManager.php';
$db = new dbConnection();
$connection = $db->getConnection();
$DriverManager = new DriverManager($connection);


$searchTerm = isset($_GET['search']) ? trim($_GET['search']) : '';
$jobStatus = isset($_GET['jobStatus']) ? $_GET['jobStatus'] : 'all';
$role = isset($_GET['role']) ? $_GET['role'] : 'all';
$sort = isset($_GET['sort']) ? $_GET['sort'] : 'name ASC'; 


$users = $DriverManager->getUser($searchTerm, $jobStatus, $role, $sort);

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
