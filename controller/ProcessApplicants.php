<?php
require '../database/Configuration.php'; 
session_start();
$db = new dbConnection();
$connection = $db->getConnection();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (isset($input['schoolID']) && isset($input['action'])) {
        $schoolID = $input['schoolID'];
        $action = $input['action'];
        if ($action === 'accept') {
            $result = acceptUser($schoolID,$connection);
            echo json_encode(['success' => $result]);
        } elseif ($action === 'decline') {
            $result = declineUser($schoolID, $connection);
            echo json_encode(['success' => $result]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid action specified.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Missing schoolID or action.']);
    }
}

function acceptUser($schoolID,$connection) {
    
}


function declineUser($schoolID,$connection) {
    $query = "UPDATE applicants SET is_verified = '1' WHERE school_id = ?";
    $stmt = $connection->prepare($query);
    $stmt->bind_param('i', $schoolID);
    $result = $stmt->execute();  
    $stmt->close();
    return $result; 
}
?>