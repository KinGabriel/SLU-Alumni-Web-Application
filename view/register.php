<?php
session_start();
$message = isset($_SESSION['confirmation_message']) ? addslashes($_SESSION['confirmation_message']) : '';
$formData = isset($_SESSION['formData']) ? $_SESSION['formData'] : [];
echo "<script>var message = '$message';</script>";
unset($_SESSION['confirmation_message'], $_SESSION['formData']);;
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
                <h1 class="login-title">Welcome back, Louisian!</h1>
                <p class="welcome-text">Please fill in your details to create an account</p>
                <div id="validation-message"></div>
                <form action="../controller/ProcessRegistration.php" method="POST" enctype="multipart/form-data" onsubmit="validateForm(event)">
                    <div class="input-inline-wrapper">
                        <div class="input-wrapper half-width">
                            <img src="../assets/images/user.png" alt="First Name Icon" class="input-icon">
                            <input type="text" name="firstName" class="input-field" placeholder="First Name" value="<?= isset($formData['firstName']) ? htmlspecialchars($formData['firstName']) : '' ?>"required />
                        </div>
                        <div class="input-wrapper half-width">
                            <input type="text" name="lastName" class="input-field" placeholder="Last Name" value="<?= isset($formData['lastName']) ? htmlspecialchars($formData['lastName']) : '' ?>" required />
                        </div>
                    </div>
                    <div class="input-wrapper">
                        <img src="../assets/images/email.png" alt="Email Icon" class="input-icon" />
                        <input type="email" name="email" class="input-field" placeholder="Email" value="<?= isset($formData['email']) ? htmlspecialchars($formData['email']) : '' ?>"   required />
                    </div>
                    <div class="input-wrapper">
                        <img src="../assets/images/id.png" alt="SLU ID Icon" class="input-icon" />
                        <input type="text" name="sluSchoolId" class="input-field" placeholder="SLU School ID"  value="<?= isset($formData['sluSchoolId']) ? htmlspecialchars($formData['sluSchoolId']) : '' ?>" required />
                    </div>
                    <div class="input-inline-wrapper">
                        <div class="input-wrapper half-width">
                            <img src="../assets/images/graduation.png" alt="Graduation Year Icon" class="input-icon">
                            <select name="graduationYear" class="input-field" required>
                                <option value="" disabled selected> Graduation Year</option>
                                <?php
                                    $currentYear = date("Y");
                                    for ($year = $currentYear; $year >= $currentYear - 90; $year--) {
                                        $selected = isset($formData['graduationYear']) && $formData['graduationYear'] == $year ? 'selected' : '';
                                        echo "<option value=\"$year\" $selected>$year</option>";
                                    }
                                    ?>
                            </select>
                        </div>
                        <div class="input-wrapper half-width">
                            <select name="program" class="input-field" required> 
                                <option value="" disabled selected> Programs</option>
                                <?php
                                    $filePath = '../assets/programs.txt'; 
                                    if (file_exists($filePath)) {
                                        $programs = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
                                        foreach ($programs as $program) {
                                            $selected = isset($formData['program']) && $formData['program'] == $program ? 'selected' : '';
                                            echo "<option value=\"$program\" $selected>$program</option>";
                                        }
                                    } else {
                                        echo "<option value=\"\">N/A</option>"; 
                                    }
                               ?>
                            </select>
                        </div>
                    </div>
                    <div class="input-wrapper">
                        <img src="../assets/images/password.png" alt="Password Icon" class="input-icon" />
                        <input type="password" name="password" class="input-field" placeholder="Password" value="<?= isset($formData['password']) ? htmlspecialchars($formData['password']) : '' ?>" required />
                    </div>
                    <div class="input-wrapper">
                        <img src="../assets/images/password.png" alt="Retype Password Icon" class="input-icon" />
                        <input type="password" name="retype_password" class="input-field" placeholder="Retype Password" value="<?= isset($formData['retype_password']) ? htmlspecialchars($formData['retype_password']) : '' ?>" required />
                    </div>
                    <div class="input-wrapper">
                     <label for="school_id_file" class="custom-upload">
                            <img src="../assets/images/upload file.png" alt="Upload Icon" class="upload-icon" />
                            <span class="upload-text">Upload your school ID</span>
                            <input type="file" id="school_id_file" name="schoolIdFile" class="upload-button" accept="image/*" onchange="handleFileUpload()" />
                            <img id="image-preview" class="image-preview" style="display: <?php echo $uploadedImagePath ? 'block' : 'none'; ?>;" src="<?php echo $uploadedImagePath; ?>" />
                        </label>
                    </div>
                    <button type="submit" class="login-button">Register</button>
                    <div class="signup-wrapper">
                        <span class="signup-text">Already have an account? <a href="Login.php" class="signup-link">Log in</a></span>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="modal" id="modal">
        <div class="modal-content">
            <img src="../assets/images/addedUser.png" alt="Added Information" />
            <p id="modal-message"></p>
            <button class="accept" onclick="closeModal()">Okay</button>
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
    <script src="../assets/js/HandleAuthentication.js"></script>
</body>
</html>
