<?php
session_start();
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
        <!-- Navigation menu -->
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
                <li><a href="#events">
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
                <li><a href="#job-opportunities">
                    <img src="../assets/images/job.png" alt="Job" class="sidebar-icon">
                    <span class="menu-item-text">Job Opportunities</span>
                </a>
            </li>
            </ul>
        </nav>

        <!-- Sticky Log Out Button -->
        <div class="sidebar-logout">
            <a href="#logout">
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
               <!-- Name fields -->
                <div class="form-row">
                    <div class="form-group" id="first-name">
                        <label for="first-name">First Name</label>
                        <input type="text" id="first-name" name="first-name" value="<?= isset($formData['first-name']) ? htmlspecialchars($formData['first-name']) : '' ?>" required>
                    </div>
                    <div class="form-group" id="last-name">
                        <label for="last-name">Last Name</label>
                        <input type="text" id="last-name" name="last-name" value="<?= isset($formData['last-name']) ? htmlspecialchars($formData['last-name']) : '' ?>"  required>
                    </div>
                </div>
                
                <!-- Email Address -->
                <div class="form-group email">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" value="<?= isset($formData['email']) ? htmlspecialchars($formData['email']) : '' ?>" required />
                </div>

                <!-- Password field -->
                <div class="form-group password">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" value="<?= isset($formData['password']) ? htmlspecialchars($formData['password']) : '' ?>" required>
                </div>

                
                <!-- Alumni Information -->
                <h3 class="section-title">Alumni Information:</h3>
                <div class="form-row">
                    <div class="form-group" id="school-id">
                        <label for="school-id">School ID</label>
                        <input type="text" id="school-id" name="school-id"   value="<?= isset($formData['school-id']) ? htmlspecialchars($formData['school-id']) : '' ?>">
                    </div>
                    <div class="form-group" id="graduation-year">
                        <label for="graduation-year">Graduation Year</label>
                        <select id="graduation-year" name="graduation-year" class="input-field">
                                <option value="" disabled selected> Select Your Graduation Year</option>
                                <?php
                                    $currentYear = date("Y");
                                    for ($year = $currentYear; $year >= $currentYear - 90; $year--) {
                                        $selected = isset($formData['graduation-year']) && $formData['graduation-year'] == $year ? 'selected' : '';
                                        echo "<option value=\"$year\" $selected>$year</option>";
                                    }
                                    ?>
                            </select>
                    </div>
                    <div class="form-group" id="degree">
                        <label for="program">Program</label>
                        <select name="program" class="input-field"> 
                                <option value="" disabled selected> Select Program</option>
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
                    <div class="form-group" id="job-status">
                        <label for="job-status">Job Status</label>
                        <select id="job-status" name="job-status">
                        <option value="" disabled selected> Select Job Status</option>
                        <option value="employed" <?= isset($formData['job-status']) && $formData['job-status'] == 'employed' ? 'selected' : '' ?>>Employed</option>
                        <option value="unemployed" <?= isset($formData['job-status']) && $formData['job-status'] == 'unemployed' ? 'selected' : '' ?>>Unemployed</option>
                        </select>
                    </div>
                </div>

                <!-- User Roles -->
                <h3 class="section-title">User Roles:</h3>
                <div class="form-row">
                    <div class="form-group" id="user-roles">
                        <select id="user-roles" name="user-roles">
                        <option value="" disabled selected> Select Role</option>
                        <option value="alumni">Alumni</option>
                        <option value="alumni" <?= isset($formData['user-roles']) && $formData['user-roles'] == 'alumni' ? 'selected' : '' ?>>Alumni</option>
                        <option value="admin" <?= isset($formData['user-roles']) && $formData['user-roles'] == 'admin' ? 'selected' : '' ?>>Admin</option>
                        <option value="manager" <?= isset($formData['user-roles']) && $formData['user-roles'] == 'manager' ? 'selected' : '' ?>>Manager</option>
                        </select>
                    </div>
                </div>

                <!-- Form buttons -->
                <div class="form-actions">
                    <button type="reset" class="clear-button">Clear</button>
                    <button type="submit" class="add-button">Add</button>
                </div>
            </form>
        </div>
    </div>
    <div class="modal" id="modal">
        <div class="modal-content">
            <img src="../assets/images/addedUser.png"  alt="Infomation message" />
            <p id="modal-message"></p>
            <button class="accept" onclick="closeModal()">Okay!</button>
        </div>
    </div>  
    <script src="../assets/js/HandleAuthentication.js"></script>
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
  
</body>
</html>
