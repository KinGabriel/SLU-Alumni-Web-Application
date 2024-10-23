<?php
require_once '../database/Configuration.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = isset($_POST["email"]) ? $_POST["email"] : ''; 
    $password = isset($_POST["password"]) ? $_POST["password"] : '';
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
   
    if($userType == 'alumni') {
         // check if important fields are not entered for alumni accounts
        if (empty($schoolID) || empty($gradYear) || empty($jobStatus)) {
            $_SESSION['confirmationMessage'] = "Please insert all fields... ";
            header("Location: ../view/AddUser.php");
            return;
        }    
        // check if their is an existing school id
        if(isAlumniExist($connection,$schoolID)) {
            $_SESSION['confirmationMessage'] = "Alumni already exist... ";
            header("Location: ../view/AddUser.php");
            return;
        }
         // check if the school id length is 7
         if (strlen($schoolID) != 7) {
            $_SESSION['confirmationMessage'] = "School ID number should be 7 digits long... ";
            header("Location: ../view/AddUser.php");
            return;
        }
    }
    // set the admin automatically into employed and also set the employed and unemployed to 1 as employed and 0 as unemployed
    if($jobStatus == 'employed' || $userType == 'admin' ) {
        $jobStatus = '1';
    }else if($jobStatus == 'unemployed') {
    $jobStatus = '0';
    }

    
    // Check if email exist
    if(isEmailExist($connection, $email)) {
        $_SESSION['confirmationMessage'] = "The email already exist";
        header("Location: ../view/AddUser.php");
        exit();
    }
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $query = "INSERT INTO user (email, pword, fname, lname, pfp, user_type,is_employed) VALUES (?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $connection->prepare($query);
    if ($stmt === false) {
        $_SESSION['confirmationMessage'] = "Error preparing statement: " . $connection->error;
        header("Location: ../view/AddUser.php");
        exit();
    }

    $stmt->bind_param("ssssssi", $email, $hashedPassword, $firstName, $lastName, $idImage, $userType,$jobStatus);
    
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

function isEmailExist($connection, $email) {
    $query = "SELECT * FROM user WHERE email = ?"; 
    $stmt = $connection->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->num_rows > 0; 
}

function isAlumniExist($connection, $schoolID) {
    $query = "SELECT * FROM alumni WHERE school_id = ?"; 
    $stmt = $connection->prepare($query);
    $stmt->bind_param("s", $schoolID);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->num_rows > 0; 
}

?>