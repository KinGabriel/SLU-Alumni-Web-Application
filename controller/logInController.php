<?php
require_once '../model/userModel.php';
require_once '../database/configuration.php';
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $password = trim($_POST["password"]);
    $db = new dbConnection();
    $connection = $db->getConnection(); 
    $userModel = new UserModel($connection); 
    $login = $userModel->login($email, $password);
    if ($login) {
        $_SESSION['user_id'] = $login['user_id']; 
        $_SESSION['first_name'] = $login['fname']; 
        $_SESSION['last_name'] = $login['lname'];
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
