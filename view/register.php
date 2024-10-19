<?php
session_start();
$message = isset($_SESSION['confirmation_message']) ? addslashes($_SESSION['confirmation_message']) : '';
echo "<script>var message = '$message';</script>";
unset($_SESSION['confirmation_message']);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../assets/css/Registration.css">
    <title>Registration Page</title>
</head>
<body>
    <div class="form-wrapper">
        <div class="form-container">
            <div class="right-side">
                <h1 class="login-title">Welcome Back Louisian!</h1>
                <p class="welcome-text">Please fill in your details to create an account</p>
                <div id="validation-message"></div>
                <form action="../controller/registrationController.php" method="POST" enctype="multipart/form-data" onsubmit="validateForm(event)">
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
                    <div class="input-inline-wrapper">
                        <div class="input-wrapper half-width">
                            <img src="../assets/images/VectorUsername.png" alt="Graduation Year Icon" class="input-icon">
                            <select name="graduationYear" class="input-field" required>
                                <option value="" disabled selected> Graduation Year</option>
                                <?php
                                    $currentYear = date("Y");
                                    for ($year = $currentYear; $year >= $currentYear - 90; $year--) {
                                        echo "<option value=\"$year\">$year</option>";
                                    }
                                ?>
                            </select>
                        </div>
                        <div class="input-wrapper half-width">
                            <img src="../assets/images/VectorUsername.png" alt="Program Icon" class="input-icon">
                            <select name="program" class="input-field" required> 
                                <option value="" disabled selected> Programs</option>
                                <?php
                                $filePath = '../assets/programs.txt'; 
                                if (file_exists($filePath)) {
                                    $programs = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
                                    foreach ($programs as $program) {
                                        echo "<option value=\"$program\">$program</option>";
                                    }
                                } else {
                                    echo "<option value=\"\">N/A</option>"; 
                                }
                                ?>
                            </select>
                        </div>
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
                        <label for="school_id_file" class="custom-upload">
                            <img src="../assets/images/upload file.png" alt="Upload Icon" class="upload-icon" />
                            <span class="upload-text">Upload your school ID</span>
                            <input type="file" id="school_id_file" name="schoolIdFile" class="upload-button" accept="image/*" required onchange="handleFileUpload()" />
                            <img id="image-preview" class="image-preview">
                        </label>
                    </div>
                    <button type="submit" class="login-button">Register</button>
                    <div class="signup-wrapper">
                        <span class="signup-text">Already have an account? <a href="login.php" class="signup-link">Log in</a></span>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="modal" id="modal">
        <div class="modal-content">
            <img src="" alt="" />
            <p id="modal-message"></p>
            <button class="accept" onclick="closeModal()">Thank you!</button>
        </div>
    </div>

    <script>
        if (message) {
            document.getElementById('modal-message').textContent = message;
            document.getElementById('modal').style.display = 'block';
        }

        function closeModal() {
            message = null;
            document.getElementById('modal').style.display = 'none';
        }
    </script>
    <script src="../assets/js/authentication.js"></script>
    <script src="../assets/js/utility.js"></script>
</body>
</html>
