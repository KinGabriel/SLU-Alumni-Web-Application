<?php
require_once '../database/Configuration.php';
require_once '../database/DriverManager.php';
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $password = trim($_POST["password"]);
    $db = new dbConnection();
    $connection = $db->getConnection(); 
    $DriverManager = new DriverManager($connection); 
    $login = $DriverManager->login($email, $password);
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
            header("Location: ../view/Login.php"); // Redirect to the login page
            exit();
    }
}
?>
