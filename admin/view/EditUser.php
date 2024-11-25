<?php
require("../controller/HandleSession.php");
$message = isset($_SESSION['confirmation-message']) ? $_SESSION['confirmation-message'] : '';
echo "<script>var message = '$message';</script>";
unset($_SESSION['confirmation-message']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit User</title>
    <link rel="stylesheet" href="../assets/css/EditUser.css">
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
            <a href="../controller/ProcessLogOut.php">
                <img src="../assets/images/logout.png" alt="Log Out" class="sidebar-icon">
                <span class="menu-item-logout">Log Out</span>
            </a>
        </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
        <div class="form-container">
            <h2 class="form-title">Edit User Details</h2>
            <?php
           
                require_once '../controller/GetUserData.php';
                $userId = $_GET['user_id'] ?? null;
                if ($userId) {
                    $userDetails = getUserDetailsById($userId);
                    if (!empty($userDetails)) {
                        $firstName = $userDetails['fname'] ?? '';
                        $lastName = $userDetails['lname'] ?? '';
                        $email = $userDetails['email'] ?? '';
                        $schoolId = $userDetails['school_id'] ?? 'N/A';
                        $graduationYear = $userDetails['gradyear'] ?? 'N/A';
                        $program = $userDetails['program'] ?? 'N/A';
                        $user_type = $userDetails['user_type'] ?? '';
                        $status = $userDetails['is_employed'] ?? '';
                        $pfp = !empty($userDetails['pfp']) ? 'data:image/jpeg;base64,' . base64_encode($userDetails['pfp']) : '../assets/images/default-avatar-icon.jpg';
                    }
                }
            
            ?>

            <form action="../controller/ProcessUpdateUser.php" enctype="multipart/form-data" method="POST" onsubmit="validateEdit(event)">
            <input type="hidden" name="user_id" value="<?php echo htmlspecialchars($userId); ?>">
            <input type="hidden" name="user_type" value="<?php echo htmlspecialchars($user_type); ?>">
                <div class="form-row">
                    <!-- Name fields -->
                    <div class="form-group" id="first-name">
                        <label for="first-name">First Name</label>
                        <input type="text" id="first-name" name="first-name" value="<?php echo htmlspecialchars($firstName); ?>">
                    </div>
                
                    <div class="form-group" id="last-name">
                        <label for="last-name">Last Name</label>
                        <input type="text" id="last-name" name="last-name" value="<?php echo htmlspecialchars($lastName); ?>">
                    </div>

                  <!-- Upload Photo -->
                    <div class="form-group upload-photo-container">
                    <label for="upload-photo">
                        <div class="upload-photo">
                            <img id="profile-photo" src="<?php echo htmlspecialchars($pfp); ?>" alt="Profile Photo" class="profile-photo">
                        </div>
                        <span>Upload Photo</span>
                    </label>
                    <input type="file" id="upload-photo" name="pfp" accept="image/*">
                </div>

                </div>


                <!-- Email Address -->
                <div class="form-group" id="email">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" value="<?php echo htmlspecialchars($email); ?>">
                </div>

                <!-- Alumni Information -->
                <h3 class="section-title">Alumni Information:</h3>
                <div class="form-row">
                    <div class="form-group" id="school-id">
                        <label for="school-id">School ID</label>
                        <input type="text" id="school-id" name="school-id" value="<?php echo htmlspecialchars($schoolId); ?>">
                    </div>

                    <div class="form-group" id="graduation-year">
                        <label for="graduation-year">Graduation Year</label>
                        <input type="text" id="graduation-year" name="graduation-year" value="<?php echo htmlspecialchars($graduationYear); ?>">
                    </div>

                    <div class="form-group" id="degree">
                        <label for="degree">Degree</label>
                        <select id="degree" name="program">
                            <option value="">Program</option>
                            <?php
                                $filePath = '../assets/programs.txt'; 
                                if (file_exists($filePath)) {
                                    $programs = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
                                    foreach ($programs as $programOption) {
                                        $selected = ($program === $programOption) ? 'selected' : '';
                                        echo "<option value=\"$programOption\" $selected>$programOption</option>";
                                    }
                                } else {
                                    echo "<option value=\"\">N/A</option>"; 
                                }
                            ?>
                        </select>
                    </div>

                    <div class="form-group" id="current-occupation">
                        <label for="current-occupation">Current Occupation</label>
                        <select id="current-occupation" name="status">
                            <option value="employed" <?= isset($userDetails['is_employed']) && $userDetails['is_employed'] == '1' ? 'selected' : '' ?>>Employed</option>
                            <option value="unemployed" <?= isset($userDetails['is_employed']) && $userDetails['is_employed'] == '0' ? 'selected' : '' ?>>Unemployed</option>
                        </select>
                    </div>

                </div>

                <div class="form-actions">
                    <button type="reset" class="clear-button">Clear</button>
                    <button type="submit" class="save-button">Save</button>
                </div>
            </form>
        </div>
    </div>

   <!-- Modal -->
   <div class="modal" id="modal">
        <div class="modal-content">
            <img src="../assets/images/editDetails.png" alt="Added Information" />
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
            document.getElementById('modal').style.display = 'none';
            if(message == "User updated successfully!"){
                window.location.href = "../view/account.php";
            }
        }
    </script>

    <script src="../assets/js/addphoto.js"></script>
    <script src="../assets/js/HandleAdminAuthentication.js"></script>
</body>
</html>