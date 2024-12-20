<?php
require '../../database/Configuration.php'; 
session_start();
$db = new dbConnection();
$connection = $db->getConnection();
$input = json_decode(file_get_contents('php://input'), true);
if (isset($input['event_id']) && !empty($input['event_id'])) {
    $event_id = $input['event_id'];
    if (deleteUser($event_id, $connection)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Failed to delete event.']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Error during the deletion process']);
}

function deleteUser($event_id, $connection) {
    $query = "DELETE FROM event WHERE event_id = ?";
    $stmt = $connection->prepare($query);
    $stmt->bind_param('s', $event_id);
    $result = $stmt->execute();
    $stmt->close();
    return $result;
}
?>
