<?php
$background_url = "assets/images/SLU front.png"; 
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="assets/css/LogIn.css">
  <title>Login Page</title>
</head>
<style>
  /* Di ko mashoot bg sa css */
        .form-wrapper::before {
            content: "";
            background-image: url('<?php echo $background_url; ?>');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            height: 100%;
            width: 100%;
            position: absolute; 
            top: 0;
            left: 0;
            opacity: 0.77; 
            z-index: -1; 
        }
    </style>
<body>
  <div class="form-wrapper">
    <div class="form-container">
      <div class="form-side">
      <img src="assets/images/logo.png" alt="SLU Alumina Logo" class="logo-image">
      <h1 class="logo-footer">SLU ALUMINA</h1>
      </div>
      <div class="right-side">
        <h1 class="login-title">Login</h1>
        <p class="welcome-text">Welcome back! Please enter your details.</p>
        <div class="input-wrapper">
          <img src="assets/images/VectorUsername.png" alt="Username Icon" class="input-icon" />
          <input type="text" id="username" class="input-field" placeholder="Username" />
        </div>
        <div class="input-wrapper">
          <img src="assets/images/VectorLock.png" alt="Password Icon" class="input-icon" />
          <input type="password" id="password" class="input-field" placeholder="Password" />
        </div>
        <a href="#" class="forgot-password">Forgot Password</a>
        <button class="login-button">Login Now</button>
        <div class="signup-wrapper">
          <span class="signup-text">Don't have an account yet? <a href="register.php" class="signup-link">Sign up</a></span>
        </div>
      </div>
    </div>
  </div>

  </script>
</body>
</html>
