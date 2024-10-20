<?php
session_start(); 
$errorMessage = isset($_SESSION['error_message']) ? addslashes($_SESSION['error_message']) : '';
unset($_SESSION['error_message']); 
echo "<script> var errorMessage = '$errorMessage';</script>";
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../assets/css/LogIn.css">
  <title>Login Page</title>
</head>
<body>
  <div class="form-wrapper">
    <div class="form-container">
      <div class="form-side">
        <img src="../assets/images/logo.png" alt="SLU Alumina Logo" class="logo-image">
        <h1 class="logo-footer">SLU ALUMINA</h1>
      </div>
      <div class="right-side">
        <h1 class="login-title">Login</h1>
        <p class="welcome-text">Welcome! Please enter your details.</p>
        <div id="validation-message"></div>

        <form action="../controller/logInController.php" method="POST">
          <div class="input-wrapper">
            <img src="../assets/images/user.png" alt="email Icon" class="input-icon" />
            <input type="text" name="email" class="input-field" placeholder="Email" required />
          </div>
          <div class="input-wrapper">
            <img src="../assets/images/password.png" alt="Password Icon" class="input-icon" />
            <input type="password" name="password" class="input-field" placeholder="Password" required />
          </div>
          <a href="#" class="forgot-password">Forgot Password</a>
          <button type="submit" class="login-button">Login Now</button>
        </form>
        <div class="signup-wrapper">
          <span class="signup-text">Don't have an account yet? <a href="register.php" class="signup-link">Sign up</a></span>
        </div>
      </div>
    </div>
  </div>
    <script src="../assets/js/authentication.js" defer></script> 
</head>
</body>
</html>
