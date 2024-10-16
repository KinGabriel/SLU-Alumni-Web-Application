<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../assets/css/Registration.css">
    <title>Registration Page</title>
      
    </script>
</head>
<body>
    <div class="form-wrapper">
        <div class="form-container">
            <div class="right-side">
                <h1 class="login-title">Welcome Back Louisian!</h1>
                <p class="welcome-text">Please fill in your details to create an account</p>
                <div class="validation-message"></div>
                <form action="registration_process.php" method="POST" enctype="multipart/form-data" onsubmit="validateForm(event)">
                    <div class="input-inline-wrapper">
                        <div class="input-wrapper half-width">
                            <img src="../assets/images/VectorUsername.png" alt="First Name Icon" class="input-icon">
                            <input type="text" name="firstName" class="input-field" placeholder="First Name" required />
                        </div>
                        <div class="input-wrapper half-width">
                            <img src="../assets/images/VectorUsername.png" alt="Last Name Icon" class="input-icon">
                            <input type="text" name="lastName" class="input-field" placeholder="Last Name" required />
                        </div>
                    </div>
                    <div class="input-wrapper">
                        <img src="../assets/images/VectorUsername.png" alt="Email Icon" class="input-icon" />
                        <input type="email" name="email" class="input-field" placeholder="Email" required />
                    </div>
                    <div class="input-wrapper">
                        <img src="../assets/images/VectorUsername.png" alt="SLU ID Icon" class="input-icon" />
                        <input type="text" name="sluSchoolId" class="input-field" placeholder="SLU School ID" required />
                    </div>
                    <div class="input-wrapper">
                        <img src="../assets/images/VectorLock.png" alt="Password Icon" class="input-icon" />
                        <input type="password" name="password" class="input-field" placeholder="Password" required />
                    </div>
                    <div class="input-wrapper">
                        <img src="../assets/images/VectorLock.png" alt="Retype Password Icon" class="input-icon" />
                        <input type="password" name="retype_password" class="input-field" placeholder="Retype Password" required />
                    </div>
                    <div class="input-wrapper">
                    <div class="input-wrapper">
                    <label for="school_id_file" class="custom-upload">
                      <img src="../assets/images/upload file.jpg" alt="Upload Icon" class="upload-icon" />
                      <span class="upload-text">Upload your school ID</span>
                      <input type="file" id="school_id_file" name="schoolIdFile" class="upload-button" accept="image/*" required onchange="handleFileUpload()" />
                      <img id="image-preview" class="image-preview"  >
                  </label>
                    </div>
                    </div>
                    <button type="submit" class="login-button">Register</button>
                    <div class="signup-wrapper">
                        <span class="signup-text">Already have an account? <a href="login.html" class="signup-link">Log in</a></span>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script src="../assets/js/authentication.js"></script>
    <script src="../assets/js/utility.js"></script>
</body>
</html>