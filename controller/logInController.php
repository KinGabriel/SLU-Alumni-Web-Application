<?php

require_once '../model/userModel.php';
require_once '../database/configuration.php';
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];
    $db = new dbConnection();
    $connection = $db->getConnection(); 
    $userModel = new UserModel($connection); 
    $login = $userModel->login($email, $password);

    if ($login) {
        $_SESSION['user_id'] = $login['id']; 
        $_SESSION['username'] = $login['username']; 
        if ($login['user_type'] == 'admin') {
            header("Location: ../view/adminDashboard.php");
        } elseif ($login['user_type'] == 'manager') { 
            header("Location: ../view/homeManager.php");
        } else {
            header("Location: ../view/home.php");
        }
        exit(); 
    } else {
        
            // Set an error message in the session
            $_SESSION['error_message'] = "Invalid username or password.";
            header("Location: ../view/login.php"); // Redirect to the login page
            exit();
        
      
    }
}
?>
