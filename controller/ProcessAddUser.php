<?php
require_once '../database/Configuration.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = isset($_POST["email"]) ? $_POST["email"] : ''; 
    $password = "user123"; 
    $firstName = isset($_POST["first-name"]) ? $_POST["first-name"] : ''; 
    $lastName = isset($_POST["last-name"]) ? $_POST["last-name"] : ''; 
    $schoolID = isset($_POST["school-id"]) ? $_POST["school-id"] : ''; 
    $idImage = isset($_POST["schoolIdFile"]) ? $_POST["schoolIdFile"] : ''; 
    $program = isset($_POST["program"]) ? $_POST["program"] : ''; 
    $gradYear = isset($_POST["graduation-year"]) ? $_POST["graduation-year"] : ''; 
    $jobStatus = isset($_POST["job-status"]) ? $_POST["job-status"] : '';
    $userType = isset($_POST['user-roles']) ? $_POST['user-roles'] : '';

    $db = new dbConnection();
    $connection = $db->getConnection(); 
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $query = "INSERT INTO user (email, pword, fname, lname, pfp, user_type) VALUES (?, ?, ?, ?, ?, ?)";
    
    $stmt = $connection->prepare($query);
    if ($stmt === false) {
        $_SESSION['confirmationMessage'] = "Error preparing statement: " . $connection->error;
        header("Location: ../view/AddUser.php");
        exit();
    }

    $stmt->bind_param("ssssss", $email, $hashedPassword, $firstName, $lastName, $idImage, $userType);
    
    if ($stmt->execute()) {
        $_SESSION['confirmationMessage'] = "Successfully added an account!";

        // Check if user type is alumni and add to alumni table
        if ($userType == "alumni") {
            $id = getID($connection, $email);
            if ($id !== null) {
                addAlumni($connection, $id, $schoolID, $program, $gradYear);
            }
        }
    } else {
        $_SESSION['confirmationMessage'] = "Error occurred! Please try again later... " . $stmt->error;
    }

    $stmt->close();
    header("Location: ../view/AddUser.php");
    exit();
}

function getID($connection, $email) {
    $query = "SELECT * FROM user WHERE email = ?";
    $stmt = $connection->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($row = $result->fetch_assoc()) {
        return $row['user_id']; 
    } else {
        return null;
    }
}
function addAlumni($connection, $id, $schoolID, $program, $gradYear) {
    $query = "INSERT INTO alumni (user_id, school_id, gradyear, program) VALUES (?, ?, ?, ?)";
    $stmt = $connection->prepare($query);
    $stmt->bind_param("iiis", $id, $schoolID, $gradYear, $program);
    $stmt->execute();
    return true;
}
?>
