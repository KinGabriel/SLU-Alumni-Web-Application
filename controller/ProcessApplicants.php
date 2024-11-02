<?php
require '../database/Configuration.php'; 
session_start();
$db = new dbConnection();
$connection = $db->getConnection();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
        $schoolID = $input['schoolID'];
        $action = $input['action'];
        if ($action === 'accept') {
            $result = acceptUser($schoolID, $connection);
            return;
          
        } elseif ($action === 'decline') {
            $result = updateRequest($schoolID, $connection);
           return ;
        } 
}

function acceptUser($schoolID, $connection) {
    // Check if already in alumni
    $query = "SELECT * FROM alumni WHERE school_id = ?";
    $stmt = $connection->prepare($query);
    $stmt->bind_param('i', $schoolID);
    $stmt->execute();
    $checkResult = $stmt->get_result();
    $alreadyAnAlumni = $checkResult->fetch_assoc();
    $stmt->close();
    if ($alreadyAnAlumni) {
        return false; 
    }

    // Fetch applicant data from the db
    $applicantData = getApplicantData($schoolID, $connection);

    // Add user to tables if applicant data exists
    if ($applicantData && addUser($schoolID, $connection, $applicantData)) {
        if (addAlumni($schoolID, $connection, $applicantData)) {
            return updateRequest($schoolID, $connection); 
        }  
    }
    return false;
}

function addUser($schoolID, $connection, $applicantData) {
    // check if the data is not empty
    if ($applicantData) {
        $query = "INSERT INTO user (email,lname, fname, pword, pfp, user_type, is_employed)
                  VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $connection->prepare($query);
        // default values
        $userType = 'alumni';
        $isEmployed = 0;     
        $stmt->bind_param(
            'ssssssi',
            $applicantData['email'],
            $applicantData['lname'],
            $applicantData['fname'],
            $applicantData['pword'],
            $applicantData['school_id_pic'],
            $userType,
            $isEmployed
        );

        $result = $stmt->execute();
        $stmt->close();
        return $result;
    } else {
        return false;
    }
}

function addAlumni($schoolID, $connection, $applicantData) {
     // check if the data is not empty
    if ($applicantData) {
        $userID = getID($connection, $applicantData['email']); // get id from the user table
        if ($userID) {
            $query = "INSERT INTO alumni (user_id, school_id, gradyear, program) VALUES (?, ?, ?, ?)";
            $stmt = $connection->prepare($query);
            if (!$stmt) {
                error_log("Failed to prepare statement in addAlumni: " . $connection->error);
                return false;
            }
            $stmt->bind_param('ssis', $userID, $applicantData['school_id'], $applicantData['gradyear'], $applicantData['program']);
            $result = $stmt->execute();
            if (!$result) {
                error_log("Execute failed in addAlumni: " . $stmt->error);
            }
            $stmt->close();
            return $result;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function getApplicantData($schoolID, $connection) {
    $query = "SELECT lname, fname, email, program, gradyear, school_id, pword, school_id_pic 
              FROM applicants 
              WHERE school_id = ? AND is_verified = '0'";
    $stmt = $connection->prepare($query);
    $stmt->bind_param('s', $schoolID);
    $stmt->execute();
    $result = $stmt->get_result();
    $applicantData = $result->fetch_assoc();
    $stmt->close();
    return $applicantData;
}

function getID($connection, $email) {
    $query = "SELECT user_id FROM user WHERE email = ?";
    $stmt = $connection->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($data = $result->fetch_assoc()) {
        return $data['user_id']; 
    } else {
        return null;
    }
}

function updateRequest($schoolID, $connection) {
    $query = "UPDATE applicants SET is_verified = '1' WHERE school_id = ?";
    $stmt = $connection->prepare($query);
    $stmt->bind_param('s', $schoolID);
    $result = $stmt->execute();  
    $stmt->close();
    return $result; 
}
?>
