<?php
require '../../database/Configuration.php'; 
session_start();
$db = new dbConnection();
$connection = $db->getConnection();
$input = json_decode(file_get_contents('php://input'), true);
if (isset($input['opportunity_id']) && !empty($input['opportunity_id'])) {
    $opportunity_id = $input['opportunity_id'];
    if (deleteJobs($opportunity_id, $connection)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Failed to delete job opportunity.']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Error during the deletion process']);
}

function deleteJobs($opportunity_id, $connection) {
    $query = "DELETE FROM opportunity WHERE opportunity_id = ?";
    $stmt = $connection->prepare($query);
    $stmt->bind_param('s', $opportunity_id);
    $result = $stmt->execute();
    $stmt->close();
    return $result;
}
?>
