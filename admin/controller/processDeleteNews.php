<?php
require '../../database/Configuration.php'; 
session_start();
$db = new dbConnection();
$connection = $db->getConnection();
$input = json_decode(file_get_contents('php://input'), true);
if (isset($input['news_id']) && !empty($input['news_id'])) {
    $news_id = $input['news_id'];
    if (deleteNews($news_id, $connection)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Failed to delete news.']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Error during the deletion process']);
}

function deleteNews($news_id, $connection) {
    $query = "DELETE FROM news WHERE news_id = ?";
    $stmt = $connection->prepare($query);
    $stmt->bind_param('s', $news_id);
    $result = $stmt->execute();
    $stmt->close();
    return $result;
}
?>
