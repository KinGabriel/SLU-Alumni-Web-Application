<?php
require '../../database/Configuration.php'; 
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = filter_var(trim($_POST["email"]), filter: FILTER_SANITIZE_EMAIL);
    $password = trim($_POST["password"]);

    // Create a database connection
    $db = new dbConnection();
    $connection = $db->getConnection(); 
    $query = "SELECT * FROM user WHERE email = ?";
    $stmt = $connection->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    // No email is found
    if ($result->num_rows === 0) {
        $_SESSION['error_message'] = "Invalid email or password.";
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
        $_SESSION['email'] = $user['email'];
        $_SESSION['user_type'] = $user['user_type']; // Store user type
        $_SESSION['user_name'] = $user['fname'] . ' ' . $user['lname']; // Full name
        // Convert BLOB to base64
        if (!empty($user['pfp'])) {
            // Ensure that the 'pfp' is a BLOB and can be base64 encoded
            $_SESSION['pfp'] = 'data:image/jpeg;base64,' . base64_encode($user['pfp']);
        } else {
            // Use a default placeholder image or leave it empty
            $_SESSION['pfp'] = '..assets\images\default-avatar-icon.jpg'; // Adjust this path to your default image
        }
        
        
        // Redirect based on user type
        if ($user['user_type'] == 'admin') {
            header("Location: ../../admin/view/adminDashboard.php");
        } elseif ($user['user_type'] == 'manager') {
            header("Location: ../view/homeManager.php");
        } else {
            setcookie("user_id", $user['user_id'], time() + 3600, "/", "localhost", false, true); 
            header("Location: http://localhost:8080/");
        }
        exit();
    } else {
        // Invalid password
        $_SESSION['error_message'] = "Invalid email or password.";
        header("Location: ../view/Login.php");
        exit();
    }
}
?>
