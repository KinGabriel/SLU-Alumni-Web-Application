<?php

require_once '../database/configuration.php';

class userModel {
    private $connection;


    public function __construct($db) {
        $this->connection = $db;
    }


    public function login($email, $password) {
        $query = "SELECT * FROM user WHERE email = ?";
        $stmt = $this->connection->prepare($query);
        $stmt->bind_param("s", $email); 
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows === 0) {
            return false; 
        }
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['pword'])) {
            return $user; 
        } else {
            return false; 
        }
    }

    public function register($email, $password, $firstName, $lastName, $schoolID, $program, $gradYear, $imageID) {
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $query = "INSERT INTO applicants (school_id, email, fname, lname, pword, program, gradyear, school_id_pic) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $this->connection->prepare($query);
        $stmt->bind_param("ssssssss", $schoolID, $email, $firstName, $lastName, $hashedPassword, $program, $gradYear, $imageID);
        return $stmt->execute();
    }

    public function getUser($searchTerm = '', $jobStatus = 'all', $role = 'all', $sort = 'name ASC') {
        $users = []; 
        $params = [];
        $types = ''; 
        $query = "
            SELECT 
                CONCAT(u.fname, ' ', u.lname) as Name, 
                u.email, 
                a.school_id, 
                a.gradyear,   -- Added graduation year
                u.is_employed, 
                u.user_type 
            FROM user u 
            INNER JOIN alumni a ON u.user_id = a.user_id
            WHERE 1=1
        ";
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
        // Add job status condition
        if ($jobStatus !== 'all') {
            $query .= " AND u.is_employed = ?";
            $params[] = ($jobStatus === 'employed' ? 1 : 0);
            $types .= 'i'; 
        }
        // Add role condition
        if ($role !== 'all') {
            $query .= " AND u.user_type = ?";
            $params[] = $role;
            $types .= 's'; 
        }
    
        // Add sorting based on valid columns
        if (in_array($sort, ['name ASC', 'name DESC', 'year ASC', 'year DESC'])) {
            // Sort by gradyear if the sort type is 'year ASC' or 'year DESC'
            if ($sort === 'year ASC' || $sort === 'year DESC') {
                $query .= " ORDER BY a.gradyear " . ($sort === 'year ASC' ? 'ASC' : 'DESC');
            } else {
                // Default sorting by name
                $query .= " ORDER BY u.fname " . ($sort === 'name ASC' ? 'ASC' : 'DESC');
            }
        } else {
            // Default sorting by name if no valid sort option is provided
            $query .= " ORDER BY u.fname ASC";  
        }
        // Execute the prepared statement
        if ($stmt = $this->connection->prepare($query)) {
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
            error_log("Preparation failed: " . $this->connection->error);
        }
        
        return $users; 
    }
    
    // Method to get all applicants
    public function getApplicants() {
        $query = "SELECT CONCAT(fname, ' ', lname) as Name, email, school_id, gradyear FROM applicants";
        $stmt = $this->connection->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }
}
?>
