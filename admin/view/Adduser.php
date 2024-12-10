<?php 
require("../controller/HandleSession.php");
$message = isset($_SESSION['confirmationMessage']) ? addslashes($_SESSION['confirmationMessage']) : '';
$formData = isset($_SESSION['formData']) ? $_SESSION['formData'] : [];
echo "<script>var message = '$message';</script>";
unset($_SESSION['confirmationMessage'], $_SESSION['formData']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create New User</title>
    <link rel="stylesheet" href="../assets/css/adduser.css">
</head>
<body>
    <!-- Header separator -->
    <div class="header-separator"></div>
    <header>
        <h1>
            <img src="../assets/images/logo.png" alt="SLU Alumina Logo" class="slu-logo">
            <span>SLU Alumina</span>
        </h1>
    </header>

    <!-- Sidebar -->
    <div class="sidebar-container">
        <nav class="sidebar-menu">
            <ul>
                <li>
                    <a href="../view/adminDashboard.php">
                        <img src="../assets/images/dashboard.png" alt="Dashboard" class="sidebar-icon">
                        <span class="menu-item-text">Dashboard</span>
                    </a>
                </li>
                <li>
                    <a href="../view/UserRequest.php">
                        <img src="../assets/images/userRequest.png" alt="User Request" class="sidebar-icon">
                        <span class="menu-item-text">Account Requests</span>
                    </a>
                </li>
                <li>
                    <a href="../view/Account.php">
                        <img src="../assets/images/userAccounts.png" alt="User Accounts" class="sidebar-icon">
                        <span class="menu-item-text">Accounts</span>
                    </a>
                </li>
                <li>
                    <a href="#events">
                        <img src="../assets/images/events.png" alt="Events" class="sidebar-icon">
                        <span class="menu-item-text">Events</span>
                    </a>
                </li>
                <li>
                    <a href="#news">
                        <img src="../assets/images/news.png" alt="Events" class="sidebar-icon">
                        <span class="menu-item-text">News</span>
                    </a>
                </li>
                <li>
                    <a href="#job-opportunities">
                        <img src="../assets/images/job.png" alt="Job" class="sidebar-icon">
                        <span class="menu-item-text">Job Opportunities</span>
                    </a>
                </li>
            </ul>
        </nav>
        <div class="sidebar-logout">
            <a href="../controller/ProcessLogOut.php">
                <img src="../assets/images/logout.png" alt="Log Out" class="sidebar-icon">
                <span class="menu-item-logout">Log Out</span>
            </a>
        </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
        <div class="form-container">
            <h2 class="form-title">Create New User</h2>
            <form action="../controller/ProcessAddUser.php" method="POST" enctype="multipart/form-data" onsubmit="validateFormAdmin(event)">
                <!-- flexbox for the subtitles Personal Information and Alumni Information -->
                <div class="info-titles">
                    <h3 class="section-title">Personal Information:</h3>
                    <h3 class="section-title">Alumni Information:</h3>
                </div>
                    
                <div class="form-grid">
                    <div class="first-name-grid">
                        <label for="first-name">First Name</label>
                        <input type="text" id="first-name" name="first-name" value="<?= isset($formData['first-name']) ? htmlspecialchars($formData['first-name']) : '' ?>" required>
                    </div>

                    <div class="last-name-grid">
                        <label for="last-name">Last Name</label>
                        <input type="text" id="last-name" name="last-name" value="<?= isset($formData['last-name']) ? htmlspecialchars($formData['last-name']) : '' ?>"  required>
                    </div>
                    
                    <div class="middle-name-grid">
                        <label for="middle-name"> Middle Name <span>(optional)</span> </label>
                        <input type="text" id="middle-name" name="middle-name" value="<?= isset($formData['middle-name']) ? htmlspecialchars($formData['middle-name']) : '' ?>" >
                    </div>
                    <div class="email-add-grid">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" name="email" value="<?= isset($formData['email']) ? htmlspecialchars($formData['email']) : '' ?>" required />
                    </div>

                    <div class="password-grid">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" value="<?= isset($formData['password']) ? htmlspecialchars($formData['password']) : '' ?>" required>
                    </div>

                    <div class="retype-pw-grid">
                        <label for="password">Confirm Password</label>
                        <input type="password" id="retype_password" name="retype_password" value="<?= isset($formData['retype_password']) ? htmlspecialchars($formData['retype_password']) : '' ?>" required>
                    </div>

                    <div class="id-grid">
                        <label for="school-id">School ID</label>
                        <input type="text" id="school-id" name="school-id" value="<?= isset($formData['school-id']) ? htmlspecialchars($formData['school-id']) : '' ?>" >
                    </div>

                    <div class="gradyear-grid">
                        <label for="graduationYear">Graduation Year</label>
                        <input type="text" id="graduationYearInput" name="graduationYear" class="input-field" list="graduationYearList" required>
                                    <datalist id ="graduationYearList">
                                    <?php
                                        $currentYear = date("Y");
                                        for ($year = $currentYear; $year >= $currentYear - 90; $year--) {
                                            $selected = isset($formData['graduationYear']) && $formData['graduationYear'] == $year ? 'selected' : '';
                                            $yearValue = htmlspecialchars($year);

                                            echo "<option value=\"$yearValue\" $selected>$yearValue</option>";
                                        }
                                        ?>
                                    </datalist>
                    </div>

                    <div class="school-grid">
                        <label for="school">School</label>
                        <select name="school" class="input-field" id="schoolDropdown"> 
                        <option value="" disabled selected> Select School</option>
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

                    <div class="program-grid">
                        <label for="program">Program</label>
                        <select name="program" class="input field" id="programDropdown">
                        <option value="" disabled selected> Select Program</option>
                        </select>
                    </div>    

                    <div class="jobstatus-grid">
                        <label for="job-status">Job Status</label>
                            <select id="job-status" name="job-status">
                                <option value="" disabled selected> Select Job Status</option>
                                <option value="employed" <?= isset($formData['job-status']) && $formData['job-status'] == 'employed' ? 'selected' : '' ?>>Employed</option>
                                <option value="unemployed" <?= isset($formData['job-status']) && $formData['job-status'] == 'unemployed' ? 'selected' : '' ?>>Unemployed</option>
                            </select>
                    </div>
                    
                    <div class="company-grid" id="companyGrid">
                        <label for="company">Company</label>
                        <input type="text" id="company" name="company" value="<?= isset($formData['company']) ? htmlspecialchars($formData['company']) : '' ?>" >
                    </div>   

                <!-- User Roles -->
                <div class="user-roles-grid">
                    <h3 class="section-title">User Roles:</h3>
                    <div class="form-row">
                        <div class="form-group" id="user-roles">
                            <select id="user-roles" name="user-roles">
                            <option value="" disabled selected> Select Role</option>
                            <option value="alumni" <?= isset($formData['user-roles']) && $formData['user-roles'] == 'alumni' ? 'selected' : '' ?>>Alumni</option>
                            <option value="admin" <?= isset($formData['user-roles']) && $formData['user-roles'] == 'admin' ? 'selected' : '' ?>>Admin</option>
                            <option value="manager" <?= isset($formData['user-roles']) && $formData['user-roles'] == 'manager' ? 'selected' : '' ?>>Manager</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="form-actions">
                    <button type="reset" class="clear-button">Clear</button>
                    <button type="submit" class="add-button">Add User</button>
                </div>
            </form>
        </div>
    </div>
    <script>
        document.getElementById('schoolDropdown').addEventListener('change', function() {
            const school = this.value;
            const programDropdown = document.getElementById('programDropdown');

            // Clear current options
            programDropdown.innerHTML = '<option value="" disabled selected> Select Program</option>';

            if (!school) return;

            // Fetch programs for the selected school
            fetch(`../controller/getPrograms.php?school=${encodeURIComponent(school)}`)
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

    <script src="../../LogInAndRegister/assets/js/graduationYear.js"></script>
    <script src="../assets/js/toggleCompanyGrid.js"></script>
</body>
</html>
