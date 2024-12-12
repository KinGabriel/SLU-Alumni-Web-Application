<?php
session_start();
$errorMessage = isset($_SESSION['error_message']) ? addslashes($_SESSION['error_message']) : '';
$validMessage = isset($_SESSION['valid_message']) ? addslashes($_SESSION['valid_message']) : '';
unset($_SESSION['error_message'], $_SESSION['valid_message']); 
echo "<script> var errorMessage = '$errorMessage'; var validMessage = '$validMessage';</script>"; ?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../assets/css/LogIn.css">
  <title>Forgot Password</title>
</head>
<body>
<div class="form-wrapper">
    <div class="form-container">
      <div class="form-side">
        <img src="../assets/images/logo.png" alt="SLU Alumina Logo" class="logo-image">
        <h1 class="logo-footer">SLU ALUMINA</h1>
      </div>
      <div class="right-side">
        <h1 class="login-title">Change Password</h1>
        <p class="welcome-text">Please enter your registered email address and your new password.</p>
        <form action="../controller/ProcessForgotPassword.php" method="POST">
        <div class="input-wrapper">
            <img src="../assets/images/user.png" alt="email Icon" class="input-icon" />
            <input type="text" name="email" class="input-field" placeholder="Email" required />
          </div>
          <div class="input-wrapper">
            <img src="../assets/images/password.png" alt="Password Icon" class="input-icon" />
              <div class="password-container">
                <input type="password" id="password" name="password" class="input-field" placeholder="Password" required />
                <button type="button" class="toggle-password">
                  <img src="../assets/images/eye-icon-open.png" alt="Show Password" class="eye-icon" />
                </button>
              </div>
          </div>  
          <button type="submit" class="login-button">Reset Password</button>
        </form>

         <div id="validation-message" class="validationMessage"></div> 

          <div class="signup-wrapper">
          <span class="signup-text">Don't have an account yet? <a href="Register.php" class="signup-link">Sign up</a></span>
        </div>
        <div class="signup-wrapper">
          <span class="signup-text">Go back to logging in? <a href="logIn.php" class="signup-link">Log in</a></span>
        </div>

        <script>
            document.addEventListener('DOMContentLoaded', function() {
            if (errorMessage) {
                var errorMessageElement = document.getElementById('validation-message');
                errorMessageElement.innerText = errorMessage;
                errorMessageElement.style.color = 'red'; 
                errorMessageElement.style.textAlign = 'right';
            }

            if (validMessage) {
                var validMessageElement = document.querySelector('.validationMessage');
                validMessageElement.innerText = validMessage;
                validMessageElement.style.color = 'green'; 
                validMessageElement.style.textAlign = 'right';
                validMessageElement.style.wordBreak = 'break-word';
            }
            });
        </script>
        <script src="../assets/js/passwordToggle.js"></script>
</body>
</html>