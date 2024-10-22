<?php
require_once '../database/Configuration.php';
// set db
$db = new dbConnection();
$connection = $db->getConnection();
// prepare query
$query = "SELECT CONCAT(fname, ' ', lname) as Name, email, school_id, gradyear FROM applicants";
$stmt = $connection->prepare($query); 
$stmt->execute();
$result = $stmt->get_result();
// store results
$applicants = $result->fetch_all(MYSQLI_ASSOC);
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
