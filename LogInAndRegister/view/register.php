<?php
session_start();
$message = isset($_SESSION['confirmation_message']) ? addslashes($_SESSION['confirmation_message']) : '';
$formData = isset($_SESSION['formData']) ? $_SESSION['formData'] : [];

$uploadedImagePath = '';
$idImage = '';  // Variable to hold image binary data

// Check if the file is uploaded and not empty
if (isset($formData['schoolIdFile']) && !empty($formData['schoolIdFile'])) {
    // Assuming the file is stored in the 'uploads' directory
    $uploadDir = '../uploads/';
    $uploadFile = $uploadDir . basename($formData['schoolIdFile']['name']);
    
    // Move the uploaded file to the directory
    if (move_uploaded_file($formData['schoolIdFile']['tmp_name'], $uploadFile)) {
        // Read the file contents as binary data
        $imageData = file_get_contents($uploadFile);
    }
}

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
                            <input type="text" name="middleName" class="input-field" placeholder="Middle Name" value="<?= isset($formData['middleName']) ? htmlspecialchars($formData['middleName']) : '' ?>"/>
                        </div>
                        <div class="input-wrapper half-width">
                            <input type="text" name="lastName" class="input-field" placeholder="Last Name" value="<?= isset($formData['lastName']) ? htmlspecialchars($formData['lastName']) : '' ?>" required />
                        </div>
                    </div>
                    <div class="input-wrapper">
                        <img src="../assets/images/email.png" alt="Email Icon" class="input-icon" />
                        <input type="email" name="email" class="input-field" placeholder="Email" value="<?= isset($formData['email']) ? htmlspecialchars($formData['email']) : '' ?>"   required />
                    </div>
                    <div class="input-inline-wrapper">
                        <div class="input-wrapper half-width">
                            <img src="../assets/images/graduation.png" alt="Graduation Year Icon" class="input-icon">
                            <!-- <select id="graduationYearSelect" name="graduationYear" class="input-field" required> -->
                                <input type="text" id="graduationYearInput" name="graduationYear" class="input-field" placeholder="Type Graduation Year" list="graduationYearList" required>
                                <!-- <option value="" disabled selected> Graduation Year</option> -->
                                <datalist id ="graduationYearList">
                                <?php
                                    $currentYear = date("Y");
                                    for ($year = $currentYear; $year >= $currentYear - 90; $year--) {
                                        $selected = isset($formData['graduationYear']) && $formData['graduationYear'] == $year ? 'selected' : '';
                                        echo "<option value=\"$year\" $selected>$year</option>";
                                    }
                                    ?>
                            <!-- </select> -->
                                </datalist>
                        </div>
                        <div class="input-wrapper half-width">
                            <select name="school" class="input-field" required id="schoolDropdown"> 
                                <option value="" disabled selected> Schools</option>
                                <?php
                                    $filePath = '../assets/schools.txt'; 
                                    if (file_exists($filePath)) {
                                        $schools = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
                                        foreach ($schools as $school) {
                                            $selected = isset($formData['school']) && $formData['school'] == $school ? 'selected' : '';
                                            echo "<option value=\"$school\" $selected>$school</option>";
                                        }
                                    } else {
                                        echo "<option value=\"\">N/A</option>"; 
                                    }
                               ?>
                            </select>
                        </div>
                        <div class="input-wrapper half-width">
                            <select name="program" class="input-field" id="programDropdown" required> 
                                <option value="" disabled selected> Programs</option>
                            </select>
                        </div>
                    </div>
                    <div class="input-wrapper">
                        <img src="../assets/images/password.png" alt="Password Icon" class="input-icon" />
                        <div class="password-container">
                            <input type="password" id="password" name="password" class="input-field" placeholder="Password" value="<?= isset($formData['password']) ? htmlspecialchars($formData['password']) : '' ?>" required />
                            <button type="button" class="toggle-password">
                                <img src="../assets/images/eye-icon-open.png" alt="Show Password" class="eye-icon" />
                            </button>
                        </div>
                    </div>    
                    <div class="input-wrapper">
                        <img src="../assets/images/password.png" alt="Retype Password Icon" class="input-icon" />
                        <div class="password-container">
                            <input type="password" id="retype_password" name="retype_password" class="input-field" placeholder="Retype Password" value="<?= isset($formData['retype_password']) ? htmlspecialchars($formData['retype_password']) : '' ?>" required />
                            <button type="button" class="toggle-password">
                                <img src="../assets/images/eye-icon-open.png" alt="Show Password" class="eye-icon" />
                            </button>
                        </div>
                    </div>    
                    <div class="input-wrapper">
                     <label for="school_id_file" class="custom-upload">
                            <img src="../assets/images/upload file.png" alt="Upload Icon" class="upload-icon" />
                            <span class="upload-text">Upload your alumni proof (e.g. school ID, diploma, TOR)</span>
                            <input type="file" id="school_id_file" name="schoolIdFile" class="upload-button" accept="image/*" onchange="handleFileUpload()" />
                            <img id="image-preview" class="image-preview">
                        </label>
                    </div>
                    <div class="input-wrapper">
                        <label>
                            <input type="checkbox" id="termsCheckbox" onclick="toggleRegisterButton()"> 
                            I agree to the 
                            <a href="#" onclick="openTermsModal(event)">Terms and Conditions</a>.
                        </label>
                    </div>
                    <button type="submit" id="registerButton" class="login-button" disabled>Register</button>
                    <div class="signup-wrapper">
                        <span class="signup-text">Already have an account? <a href="Login.php" class="signup-link">Log in</a></span>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Modal for Terms and Conditions -->
    <div class="modal-overlay" id="modalOverlay"></div>
    <div class="modal-terms" id="termsModal">
        <div class="modal-header">Terms and Conditions</div>
        <div class="modal-body">
            <p>Please read and agree to the Terms and Conditions before proceeding.</p>
            <ul>
                <li>You must be at least 18 years old.</li>
                <li>Your information must be accurate.</li>
                <li>You must not use the services provided to promote wrongdoings.</li>
            </ul>
        </div>
        <button class="close-modal" onclick="closeTermsModal()">Close</button>
    </div>

    <div class="modal" id="modal">
        <div class="modal-content">
            <img src="../assets/images/addedUser.png" alt="Added Information" />
            <p id="modal-message"></p>
            <button class="accept" onclick="closeModal()">Got it</button>
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

    <script>
        document.getElementById('schoolDropdown').addEventListener('change', function() {
            const school = this.value;
            const programDropdown = document.getElementById('programDropdown');

            // Clear current options
            programDropdown.innerHTML = '<option value="" disabled selected> Select Program</option>';

            if (!school) return;

            // Fetch programs for the selected school
            fetch(`../../admin/controller/getPrograms.php?school=${encodeURIComponent(school)}`)
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        console.error(data.error);
                        return;
                    }

                    // Populate the programDropdown with fetched programs
                    data.forEach(program => {
                        const option = document.createElement('option');
                        option.value = program;
                        option.textContent = program;
                        programDropdown.appendChild(option);
                    });
                })
                .catch(error => console.error('Error fetching programs:', error));
        });
    </script>

    <script>
        // Disable/Enable Register Button
        function toggleRegisterButton() {
            const checkbox = document.getElementById('termsCheckbox');
            const button = document.getElementById('registerButton');
            button.disabled = !checkbox.checked;
        }

        // Open Terms Modal
        function openTermsModal(event) {
            event.preventDefault();
            document.getElementById('termsModal').classList.add('active');
            document.getElementById('modalOverlay').classList.add('active');
        }

        // Close Terms Modal
        function closeTermsModal() {
            document.getElementById('termsModal').classList.remove('active');
            document.getElementById('modalOverlay').classList.remove('active');
        }
    </script>

    <script src="../assets/js/passwordToggle.js"></script>
    <script src="../assets/js/graduationYear.js"></script>
    <script src="../assets/js/HandleAuthentication.js"></script>
</body>
</html>
