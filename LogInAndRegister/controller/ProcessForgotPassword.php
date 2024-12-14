<?php
require '../../database/Configuration.php'; 
session_start(); 
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate the email
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $_SESSION['error_message'] = "Invalid email format";
        header("Location: ../view/ForgotPassword.php");
        exit();
    }

    $newPassword = trim($_POST["password"]);
    // Validate password length
            if (strlen($newPassword) < 8) {
                $_SESSION['error_message'] = "Password must be at least 8 characters long.";
                header("Location: ../view/ForgotPassword.php");
                exit();
            }
        // Create database connection
        $db = new dbConnection();
        $connection = $db->getConnection();

        // Check if the email exists in the database
        $query = "SELECT * FROM user WHERE email = ?";
        $stmt = $connection->prepare($query);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 0) {
            // Email not found
            $_SESSION['error_message'] = "Email does not exist.";
            header("Location: ../view/ForgotPassword.php");
            exit();
        }


         

        // Hash the new password
        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

        // Update the password in the database
        $updateQuery = "UPDATE user SET pword = ? WHERE email = ?";
        $updateStmt = $connection->prepare($updateQuery);
        $updateStmt->bind_param("ss", $hashedPassword, $email);
        if ($updateStmt->execute()) {
            $_SESSION['valid_message'] = "Password has been successfully updated. You can now log in.";
            header("Location: ../view/ForgotPassword.php");
            exit();
        } else {
            $_SESSION['error_message'] = "Failed to update password. Please try again.";
            header("Location: ../view/ForgotPassword.php");
            exit();
        }
}
?>