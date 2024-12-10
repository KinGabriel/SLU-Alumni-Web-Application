<?php
require '../../database/Configuration.php';
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = isset($_POST["email"]) ? $_POST["email"] : '';
    $password = isset($_POST["password"]) ? $_POST["password"] : '';
    $retypePassword = isset($_POST["retypePassword"]) ? $_POST["retypePassword"] : '';
    $firstName = isset($_POST["firstName"]) ? $_POST["firstName"] : '';
    $lastName = isset($_POST["lastName"]) ? $_POST["lastName"] : '';
    $middleName = isset($_POST["middleName"]) ? $_POST["middleName"] : '';
    $school = isset($_POST["school"]) ? $_POST["school"] : '';
    $program = isset($_POST["program"]) ? $_POST["program"] : '';
    $gradYear = isset($_POST["graduationYear"]) ? $_POST["graduationYear"] : '';
    $db = new dbConnection();
    $connection = $db->getConnection(); 
      // Check if email exist
      if(isEmailExist($connection, $email)) {
        $_SESSION['formData'] = $_POST;
        $_SESSION['confirmation_message'] = "Account already exist";
        header("Location: ../view/Register.php");
        exit();
    }
    // Check if their is already an existing application
    if(checkApplicant( $connection, $email )) {
        $_SESSION['formData'] = $_POST;
        $_SESSION['confirmation_message'] = "Already have an existing application!";
        header("Location: ../view/Register.php");
        exit();
    }


    $idImage = '';
    if (isset($_FILES['schoolIdFile']) && $_FILES['schoolIdFile']['error'] === UPLOAD_ERR_OK) { 
        $fileTmpPath = $_FILES['schoolIdFile']['tmp_name'];
        $idImage = file_get_contents($fileTmpPath);
        if ($idImage === false) {
            $_SESSION['formData'] = $_POST;
            $_SESSION['confirmation_message'] = "Failed to read the uploaded file.";
            header("Location: ../view/Register.php");
            exit();
        }
    }
    
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $gradYear = isset($_POST["graduationYear"]) ? trim($_POST["graduationYear"]) : '';
    if (!ctype_digit($gradYear) || (int)$gradYear < 1900 || (int)$gradYear > date('Y')) {
        $_SESSION['confirmation_message'] = "Invalid graduation year. Please enter a valid 4-digit year.";
        header("Location: ../view/Register.php");
        exit();
    }
    $gradYear = (int)$gradYear;

    $query = "INSERT INTO applicants ( email, fname, lname, mname, pword, school, program, gradyear, school_id_pic) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $connection->prepare($query);
    if ($stmt === false) {
        $_SESSION['confirmation_message'] = "Error preparing statement: " . $connection->error;
        header("Location: ../view/Register.php");
        exit();
    }

    $stmt->bind_param("sssssssis",  $email, $firstName, $lastName, $middleName, $hashedPassword, $school, $program, $gradYear, $idImage);
    if ($stmt->execute()) {
        $_SESSION['confirmation_message'] = "Successfully sent your request! Please wait for the admin reviewal.";
    } else {
        $_SESSION['confirmation_message'] = "Error occurred! Please try again later... " . $stmt->error;
    }
    $stmt->close();
    header("Location: ../view/Register.php");
    exit();
}

function isEmailExist($connection, $email) {
    $query = "SELECT * FROM user WHERE email = ?"; 
    $stmt = $connection->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->num_rows > 0; 
}
function checkApplicant($connection, $email) {
    $query = "SELECT * FROM applicants WHERE email = ?"; 
    $stmt = $connection->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    // Check if any rows were returned
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc(); // Now safe to call fetch_assoc() since we have rows
        if ($row['is_verified']) {
            return true; 
        }
        return false;
    }
    
    return false; // Return false if no rows were found
}

function checkApplicantById($connection, $email) {
    $query = "SELECT * FROM applicants WHERE school_id = ?"; 
    $stmt = $connection->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        return true; 
    }
    $row = $result->fetch_assoc(); 
        if ($row['is_verified']) {
            return true;
        }
        return false;
}

?>
