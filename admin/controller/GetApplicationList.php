<?php
require '../../database/Configuration.php'; 
require ("../controller/HandleSession.php");
$applicant = []; 
$params = [];
$types = ''; 
$query = "SELECT app_id,CONCAT(fname, ' ', lname) as Name, email, gradyear,school_id_pic FROM applicants WHERE is_verified = '0'"; 


$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
$offset = ($page - 1) * $limit;

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $searchTerm = isset($_GET['search']) ? trim($_GET['search']) : '';
    $sort = isset($_GET['sort']) ? $_GET['sort'] : 'name ASC';

    if (!empty($searchTerm)) {
        $query .= " AND (fname LIKE ? OR lname LIKE ? OR email LIKE ?)";
        $searchTerm = "%$searchTerm%";  
        $params[] = $searchTerm;
        $params[] = $searchTerm;
        $params[] = $searchTerm;
        $types .= 'sss';  
    }

    if (in_array($sort, ['name ASC', 'name DESC', 'year ASC', 'year DESC','app_id ASC','app_id DESC'])) {
        if ($sort === 'year ASC' || $sort === 'year DESC') {
            $query .= " ORDER BY gradyear " . ($sort === 'year ASC' ? 'ASC' : 'DESC');
        } else if ($sort === 'name ASC' || $sort === 'name DESC') {
            $query .= " ORDER BY fname " . ($sort === 'name ASC' ? 'ASC' : 'DESC');
        } else 
            $query .= " ORDER BY app_id " . ($sort === 'app_id ASC' ? 'ASC':'DESC');
    } else {
        $query .= " ORDER BY app_id DESC";  
    }

    $db = new dbConnection();
    $connection = $db->getConnection();

    if ($stmt = $connection->prepare($query)) {
        if (!empty($params)) {
            $stmt->bind_param($types, ...$params);
        }
        if ($stmt->execute()) {
            $result = $stmt->get_result();
            while ($row = $result->fetch_assoc()) {
                $applicant[] = $row;
            }
            $result->free(); 
        } else {
            error_log("Execution failed: " . $stmt->error);
        }
        $stmt->close();
    } else {
        error_log("Preparation failed: " . $connection->error);
    }

    header('Content-Type: application/json');
    if (!empty($applicant) && is_array($applicant)) {
        $applicantData = array_map(function($applicant) {
            return [
                'app_id' => $applicant['app_id'],
                'name' => $applicant['Name'],
                'email' => $applicant['email'],
                'gradyear' => $applicant['gradyear'] ?? "N/A",
                'school_id_pic' => !empty($applicant['school_id_pic']) ? 'data:image/jpeg;base64,' . base64_encode($applicant['school_id_pic']) : null
            ];
        }, $applicant);
        echo json_encode($applicantData);
    } else {
        echo json_encode([]);
    }
}
?>
