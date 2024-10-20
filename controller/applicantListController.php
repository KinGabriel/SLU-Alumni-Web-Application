<?php
require_once '../model/userModel.php';
require_once '../database/configuration.php';

// Create a database connection
$db = new dbConnection();
$connection = $db->getConnection();
$userModel = new userModel($connection);

$applicants = $userModel->getApplicants();
header('Content-Type: application/json');

if (!empty($applicants) && is_array($applicants)) {
    $applicantData = array_map(function($applicant) {
        return [
            'name' => $applicant['Name'],
            'email' => $applicant['email'],
            'id_number' => $applicant['school_id'],
            'gradyear' => $applicant['gradyear'] ?? "N/A"
        ];
    }, $applicants);
    echo json_encode($applicantData);
} else {
    echo json_encode([]);
}
?>
