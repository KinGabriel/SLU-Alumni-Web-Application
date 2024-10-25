<?php
require_once '../database/Configuration.php'; 
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $password = trim($_POST["password"]);

    // Create a database connection
    $db = new dbConnection();
    $connection = $db->getConnection(); 

    $query = "SELECT * FROM user WHERE email = ?";
    $stmt = $connection->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        $_SESSION['error_message'] = "Invalid username or password.";
        header("Location: ../view/Login.php");
        exit();
    }

    $user = $result->fetch_assoc();
    // Verify the password
    if (password_verify($password, $user['pword'])) {
        // Store user data in session
        $_SESSION['user_id'] = $user['user_id'];
        $_SESSION['first_name'] = $user['fname'];
        $_SESSION['last_name'] = $user['lname'];
        $_SESSION['user_type'] = $user['user_type']; // Store user type

        // Fetch additional user details for the dashboard
        $_SESSION['user_name'] = $user['fname'] . ' ' . $user['lname']; // Full name

        // Redirect based on user type
        if ($user['user_type'] == 'admin') {
            header("Location: ../view/adminDashboard.php");
        } elseif ($user['user_type'] == 'manager') {
            header("Location: ../view/homeManager.php");
        } else {
            header("Location: ../view/home.php");
        }
        exit();
    } else {
        // Invalid password
        $_SESSION['error_message'] = "Invalid username or password.";
        header("Location: ../view/Login.php");
        exit();
    }
}
?>
