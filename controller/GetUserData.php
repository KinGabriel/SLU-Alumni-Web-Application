<?php
function getUserDetailsById($userId) {
    require '../database/Configuration.php';
    require("../controller/HandleSession.php");
    $db = new dbConnection();
    $connection = $db->getConnection();
    $query = "SELECT CONCAT(u.fname, ' ', u.lname) AS Name, u.email, a.school_id, a.gradyear, u.is_employed, u.user_type, u.pfp, a.program, u.fname, u.lname
              FROM user u
              LEFT JOIN alumni a ON u.user_id = a.user_id
              WHERE u.user_id = ?";
    if ($stmt = $connection->prepare($query)) {
        $stmt->bind_param("i", $userId); 
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $userDetails = $result->fetch_assoc();
        } else {
            $userDetails = [];
        }
        $stmt->close();
        $connection->close();
        return $userDetails;
    } else {
        die("Query failed: " . $connection->error);
    }
}
?>
