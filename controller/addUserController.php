<?php
require_once '../model/userModel.php';
require_once '../database/configuration.php';
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
    $userModel = new UserModel($connection); 
    $addUSer = $userModel->addUser($email , $password, $firstName, $lastName,$schoolID,$idImage,$program,$userType,$gradYear );
    if($addUSer){
        $_SESSION['confirmationMessage'] = "Successfully added an account!";
    } else {
        $_SESSION['confirmationMessage'] = "Error occurred! Please try again later...";
    }
    header("Location: ../view/AddUser.php");
    exit();
}