<?php
require_once '../database/Configuration.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = isset($_POST["email"]) ? $_POST["email"] : '';
    $password = isset($_POST["password"]) ? $_POST["password"] : '';
    $retypePassword = isset($_POST["retypePassword"]) ? $_POST["retypePassword"] : '';
    $firstName = isset($_POST["firstName"]) ? $_POST["firstName"] : '';
    $lastName = isset($_POST["lastName"]) ? $_POST["lastName"] : '';
    $schoolID = isset($_POST["sluSchoolId"]) ? $_POST["sluSchoolId"] : '';
    $idImage = isset($_POST["schoolIdFile"]) ? $_POST["schoolIdFile"] : ''; 
    $program = isset($_POST["program"]) ? $_POST["program"] : '';
    $gradYear = isset($_POST["graduationYear"]) ? $_POST["graduationYear"] : '';
    $db = new dbConnection();
    $connection = $db->getConnection(); 
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $query = "INSERT INTO applicants (school_id, email, fname, lname, pword, program, gradyear, school_id_pic) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $connection->prepare($query);
    if ($stmt === false) {
        $_SESSION['confirmation_message'] = "Error preparing statement: " . $connection->error;
        header("Location: ../view/Register.php");
        exit();
    }

    $stmt->bind_param("ssssssss", $schoolID, $email, $firstName, $lastName, $hashedPassword, $program, $gradYear, $idImage);
    if ($stmt->execute()) {
        $_SESSION['confirmation_message'] = "Successfully sent your request! Please wait for the admin reviewal.";
    } else {
        $_SESSION['confirmation_message'] = "Error occurred! Please try again later... " . $stmt->error;
    }
    $stmt->close();
    header("Location: ../view/Register.php");
    exit();
}
?>
