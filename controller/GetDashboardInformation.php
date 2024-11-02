<?php
require_once '../database/Configuration.php';
header('Content-Type: application/json');
session_start();
$db = new dbConnection();
$connection = $db->getConnection();
$data = [];

// Query and fetch the count of members
$sql = "SELECT COUNT(*) AS total_members FROM alumni";
$result = $connection->query($sql);
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $data['total_members'] = $row['total_members'];
} else {
    $data['total_members'] = 0;
}

// Query and fetch the count of applicants
$sql = "SELECT COUNT(*) AS total_applicants FROM applicants WHERE is_verified = '0' ";
$result = $connection->query($sql);
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $data['total_applicants'] = $row['total_applicants'];
} else {
    $data['total_applicants'] = 0;
}

// Query and fetch the count of job opportunities
$sql = "SELECT COUNT(*) AS total_job_opportunity FROM opportunity";
 $result = $connection->query($sql);
if ($result->num_rows > 0) {
   $row = $result->fetch_assoc();
   $data['total_job_opportunity'] = $row['total_job_opportunity'];
}else {
  $data['total_job_opportunity'] = 0;
 }
// Query and fetch the count of number of events
 $sql = "SELECT COUNT(*) AS total_events FROM event";
 $result = $connection->query($sql);
 if ($result->num_rows > 0) {
     $row = $result->fetch_assoc();
     $data['total_events'] = $row['total_events'];
 } else {
     $data['total_events'] = 0;
 }

// $sql = "SELECT COUNT(*) AS total_news FROM news";
// $result = $connection->query($sql);
// if ($result->num_rows > 0) {
//     $row = $result->fetch_assoc();
//     $data['total_news'] = $row['total_news'];
// } else {
//     $data['total_news'] = 0;
// }

echo json_encode($data);
?>
