<?php
require_once '../database/Configuration.php'; 
require("../controller/HandleSession.php");
$users = []; 
$params = [];
$types = ''; 
$query = " SELECT CONCAT(u.fname, ' ', u.lname) as Name, u.email, a.school_id, a.gradyear, u.is_employed, u.user_type 
    FROM user u  LEFT JOIN alumni a ON u.user_id = a.user_id WHERE 1=1 ";
$db = new dbConnection();
$connection = $db->getConnection();
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $searchTerm = isset($_GET['search']) ? trim($_GET['search']) : '';
    $jobStatus = isset($_GET['jobStatus']) ? $_GET['jobStatus'] : 'all';
    $role = isset($_GET['role']) ? $_GET['role'] : 'all';
    $sort = isset($_GET['sort']) ? $_GET['sort'] : 'name ASC';
    // Add search term condition
    if (!empty($searchTerm)) {
        $query .= " AND (u.fname LIKE ? OR u.lname LIKE ? OR u.email LIKE ? OR a.school_id LIKE ?)";
        $searchTerm = "%$searchTerm%";  
        $params[] = $searchTerm;
        $params[] = $searchTerm;
        $params[] = $searchTerm;
        $params[] = $searchTerm;
        $types .= 'ssss';  
    }
     // Check the job status to filter it
    if ($jobStatus !== 'all') {
        $query .= " AND u.is_employed = ?";
        $params[] = ($jobStatus === 'employed' ? 1 : 0);
        $types .= 'i'; 
    }
        // Check the role to filter it
    if ($role !== 'all') {
        $query .= " AND u.user_type = ?";
        $params[] = $role;
        $types .= 's'; 
    }
    // Chcek based if what type of sorting
    if (in_array($sort, ['name ASC', 'name DESC', 'year ASC', 'year DESC'])) {
        if ($sort === 'year ASC' || $sort === 'year DESC') {
            $query .= " ORDER BY a.gradyear " . ($sort === 'year ASC' ? 'ASC' : 'DESC');
        } else {
            $query .= " ORDER BY u.fname " . ($sort === 'name ASC' ? 'ASC' : 'DESC');
        }
    } else {
        $query .= " ORDER BY u.fname ASC";  
    }
    
    if ($stmt = $connection->prepare($query)) {
        if (!empty($params)) {
            $stmt->bind_param($types, ...$params);
        }
        if ($stmt->execute()) {
            $result = $stmt->get_result();
            while ($row = $result->fetch_assoc()) {
                $users[] = $row;
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
    if (!empty($users) && is_array($users)) { 
        $userData = array_map(function($user) {
            return [ 
                'name' => $user['Name'], 
                'email' => $user['email'], 
                'id_number' => $user['school_id'] ?? "N/A", 
                'gradyear' => $user['gradyear'] ?? "N/A", 
                'status' => $user['is_employed'] ? 'employed' : 'unemployed', 
                'role' => $user['user_type'] 
            ];
        }, $users);
        echo json_encode($userData);
    } else {
        echo json_encode([]);
    }
}
?>
