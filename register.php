<?php
$background_url = "assets/images/SLU front.png"; 
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="assets/css/Registration.css">
  <title>Registration Page</title>
</head>
<style>
  /* Background setup */
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
<body>
  <div class="form-wrapper">
    <div class="form-container">
      <div class="right-side">
        <h1 class="login-title">Welcome Back Louisian!</h1>
        <p class="welcome-text">Please fill in your details to create an account.</p>
        <form action="registration_process.php" method="POST" enctype="multipart/form-data">
          <div class="input-wrapper">
            <img src="assets/images/VectorUsername.png" alt="Email Icon" class="input-icon" />
            <input type="email" name="email" class="input-field" placeholder="Email" required />
          </div>
          <div class="input-wrapper">
            <img src="assets/images/VectorUsername.png" alt="SLU ID Icon" class="input-icon" />
            <input type="text" name="slu_school_id" class="input-field" placeholder="SLU School ID" required />
          </div>
          <div class="input-wrapper">
            <img src="assets/images/VectorLock.png" alt="Password Icon" class="input-icon" />
            <input type="password" name="password" class="input-field" placeholder="Password" required />
          </div>
          <div class="input-wrapper">
            <img src="assets/images/VectorLock.png" alt="Retype Password Icon" class="input-icon" />
            <input type="password" name="retype_password" class="input-field" placeholder="Retype Password" required />
          </div>
          <div class="input-wrapper">
            <label for="school_id_file" class="custom-upload">
              <img src="assets/images/upload file.jpg" alt="Upload Icon" class="upload-icon" />
              <span class="upload-text">Upload your school ID</span>
              <input type="file" id="school_id_file" name="school_id_file" class="upload-button" accept="image/*" required />
            </label>
          </div>
          <button type="submit" class="login-button">Register</button>
          <div class="signup-wrapper">
            <span class="signup-text">Already have an account? <a href="index.php" class="signup-link">Log in</a></span>
          </div>
        </form>
      </div>
    </div>
  </div>
</body>
</html>
