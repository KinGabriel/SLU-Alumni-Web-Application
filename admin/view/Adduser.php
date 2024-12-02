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
                <div class="form-row">
                    <div class="form-group">
                        <label for="first-name">First Name</label>
                        <input type="text" id="first-name" name="first-name" required>
                    </div>
                    <div class="form-group">
                        <label for="last-name">Last Name</label>
                        <input type="text" id="last-name" name="last-name" required>
                    </div>
                </div>

                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" required>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" required>
                    </div>
                    <div class="form-group">
                        <label for="repeat-password">Repeat Password</label>
                        <input type="password" id="repeat-password" name="repeat-password" required>
                    </div>
                </div>

                <h3 class="section-title">Alumni Information:</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label for="school-id">School ID</label>
                        <input type="text" id="school-id" name="school-id">
                    </div>
                    <div class="form-group">
                        <label for="workplace">Workplace</label>
                        <input type="text" id="workplace" name="workplace">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="graduation-year">Graduation Year</label>
                        <select id="graduation-year" name="graduation-year">
                            <option value="" disabled selected>Select Graduation Year</option>
                            <?php
                                $currentYear = date("Y");
                                for ($year = $currentYear; $year >= $currentYear - 90; $year--) {
                                    echo "<option value=\"$year\">$year</option>";
                                }
                            ?>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="program">Degree</label>
                        <select id="program" name="program">
                            <option value="" disabled selected>Select Program</option>
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

                <div class="form-actions">
                    <button type="reset" class="clear-button">Clear</button>
                    <button type="submit" class="add-button">Add User</button>
                </div>
            </form>
        </div>
    </div>
</body>
</html>
