<?php
require_once '../database/Configuration.php';
require_once '../database/DriverManager.php';

// Create a database connection
$db = new dbConnection();
$connection = $db->getConnection();
$DriverManager = new DriverManager($connection);

$applicants = $DriverManager->getApplicants();
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
