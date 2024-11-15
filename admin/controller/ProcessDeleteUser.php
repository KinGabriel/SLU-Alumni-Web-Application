<?php
require '../../database/Configuration.php'; 
session_start();
$db = new dbConnection();
$connection = $db->getConnection();
$input = json_decode(file_get_contents('php://input'), true);
if (isset($input['email']) && !empty($input['email'])) {
    $email = $input['email'];
    // Don't allow to delete yourself
    if ($_SESSION['email'] === $email) {
        echo json_encode(['success' => false, 'error' => 'You cannot delete your own account.']);
        exit;
    }
    if (deleteUser($email, $connection)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Failed to delete user.']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Error during the deletion process']);
}

function deleteUser($email, $connection) {
    $query = "DELETE FROM user WHERE email = ?";
    $stmt = $connection->prepare($query);
    $stmt->bind_param('s', $email);
    $result = $stmt->execute();
    $stmt->close();
    return $result;
}
?>
