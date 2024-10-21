<?php
require_once '../database/Configuration.php';
require_once '../database/DriverManager.php';
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
    $DriverManager = new DriverManager($connection); 
    $register = $DriverManager->register($email, $password, $firstName, $lastName, $schoolID, $program, $gradYear, $idImage);
    if ($register) {
        $_SESSION['confirmation_message'] = "Successfully sent your request! Please wait for the admin reviewal.";
    } else {
        $_SESSION['confirmation_message'] = "Error occurred! Please try again later...";
    }
    header("Location: ../view/Register.php");
    exit();
}
?>
