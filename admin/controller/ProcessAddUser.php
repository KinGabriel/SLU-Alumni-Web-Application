<?php
require '../../database/Configuration.php'; 
require("../controller/HandleSession.php");
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = isset($_POST["email"]) ? $_POST["email"] : ''; 
    $password = isset($_POST["password"]) ? $_POST["password"] : '';
    $retypePassword = isset($_POST["retype_password"]) ? $_POST["retype_password"] : '';
    $firstName = isset($_POST["first-name"]) ? $_POST["first-name"] : ''; 
    $lastName = isset($_POST["last-name"]) ? $_POST["last-name"] : ''; 
    $middleName = isset($_POST["middle-name"]) ? $_POST["middle-name"] : ''; 
    $pfp_path = '../assets/images/default-avatar-icon.jpg';
    $pfp = base64_encode($pfp_path);
    $schoolID = isset($_POST["school-id"]) ? $_POST["school-id"] : ''; 
    $idImage = isset($_POST["schoolIdFile"]) ? $_POST["schoolIdFile"] : '';
    $gradYear = isset($_POST["graduationYear"]) ? $_POST["graduationYear"] : ''; 
    $school = isset($_POST["school"]) ? $_POST["school"] : ''; 
    $program = isset($_POST["program"]) ? $_POST["program"] : ''; 
    $jobStatus = isset($_POST["job-status"]) ? $_POST["job-status"] : '';
    $company = isset($_POST["company"]) ? $_POST["company"] : '';
    $userType = isset($_POST['user-roles']) ? $_POST['user-roles'] : '';
    $db = new dbConnection();
    $connection = $db->getConnection();
   
    if($userType == 'alumni') {
         // check if important fields are not entered for alumni accounts
        if (empty($gradYear) || empty($jobStatus)) {
            $_SESSION['formData'] = $_POST;
            $_SESSION['confirmationMessage'] = "Please insert all fields... ";
            $_SESSION['modalImage'] = "../assets/images/declineUser.png";
            header("Location: ../view/AddUser.php");
            return;
        }    
        // check if their is an existing school id
        if(isAlumniExist($connection,$schoolID)) {
            $_SESSION['formData'] = $_POST;
            $_SESSION['confirmationMessage'] = "Alumni already exist... ";
            $_SESSION['modalImage'] = "../assets/images/declineUser.png";
            header("Location: ../view/AddUser.php");
            return;
        }
    }

    if ($jobStatus == 'employed') {
        $jobStatus = '1';
    }
    if($jobStatus == 'employed' && $userType == 'admin' || $userType == 'manager' ) {
        $company = 'SLU Alumina';
    } else if($jobStatus == 'unemployed') {
        $company = 'N/A';
    }

    if(empty($schoolID) && $userType =='alumni') {
        $schoolID = null;
    }

    // Check if email exist
    if(isEmailExist($connection, $email)) {
        $_SESSION['formData'] = $_POST;
        $_SESSION['confirmationMessage'] = "The email already exist";
        $_SESSION['modalImage'] = "../assets/images/declineUser.png";
        header("Location: ../view/AddUser.php");
        exit();
    }
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $query = "INSERT INTO user (email, pword, fname, lname, mname, pfp, user_type, is_employed, company) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $connection->prepare($query);
    if ($stmt === false) {
        $_SESSION['confirmationMessage'] = "Error preparing statement: " . $connection->error;
        header("Location: ../view/AddUser.php");
        exit();
    }

    $stmt->bind_param("sssssssis", $email, $hashedPassword, $firstName, $lastName, $middleName, $pfp, $userType, $jobStatus, $company);
    
    if ($stmt->execute()) {
        $_SESSION['confirmationMessage'] = "Successfully added an account!";


        // Check if user type is alumni and add to alumni table
        if ($userType == "alumni") {
            $id = getID($connection, $email);
            if ($id !== null) {
                addAlumni($connection, $id, $schoolID, $school, $program, $gradYear);
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
function addAlumni($connection, $id, $schoolID, $school, $program, $gradYear) {
    $query = "INSERT INTO alumni (user_id, school_id, gradyear, school, program) VALUES (?, ?, ?, ?, ?)";
    $stmt = $connection->prepare($query);
    $stmt->bind_param("iiiss", $id, $schoolID, $gradYear, $school, $program);
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
    if (empty($schoolID)) {
        // If school ID is empty, do not check for its existence
        return false;
    }
    $query = "SELECT * FROM alumni WHERE school_id = ?"; 
    $stmt = $connection->prepare($query);
    $stmt->bind_param("s", $schoolID);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->num_rows > 0; 
}

?>