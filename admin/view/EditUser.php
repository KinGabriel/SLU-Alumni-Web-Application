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
    <div class="sidebar-container">  
    <!-- Sidebar Navigation -->
    <nav class="sidebar-menu">
        <ul>
            <li>
                <a href="../view/adminDashboard.php" class="<?php echo (basename($_SERVER['PHP_SELF']) == 'adminDashboard.php') ? 'active' : ''; ?>">
                    <img src="../assets/images/dashboard.png" alt="Dashboard" class="sidebar-icon">
                    <span class="menu-item-text">Dashboard</span>
                </a>
            </li>
            <li>
                <a href="../view/UserRequest.php" class="<?php echo (basename($_SERVER['PHP_SELF']) == 'UserRequest.php') ? 'active' : ''; ?>">
                    <img src="../assets/images/userRequest.png" alt="User Request" class="sidebar-icon">
                    <span class="menu-item-text">Account Requests</span>
                </a>
            </li>
            <li>
                <a href="../view/Account.php" class="<?php echo (basename($_SERVER['PHP_SELF']) == 'Account.php') ? 'active' : ''; ?>">
                    <img src="../assets/images/userAccounts.png" alt="User Accounts" class="sidebar-icon">
                    <span class="menu-item-text">Accounts</span>
                </a>
            </li>
            <li>
                <a href="../view/adminEvent.php" class="<?php echo (basename($_SERVER['PHP_SELF']) == 'events.php') ? 'active' : ''; ?>">
                    <img src="../assets/images/events.png" alt="Events" class="sidebar-icon">
                    <span class="menu-item-text">Events</span>
                </a>
            </li>
            <li>
                <a href="../view/news.php" class="<?php echo (basename($_SERVER['PHP_SELF']) == 'news.php') ? 'active' : ''; ?>">
                    <img src="../assets/images/news.png" alt="Events" class="sidebar-icon">
                    <span class="menu-item-text">News</span>
                </a>
            </li>
            <li>
                <a href="../view/jobOpportunities.php" class="<?php echo (basename($_SERVER['PHP_SELF']) == 'job-opportunities.php') ? 'active' : ''; ?>">
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
                        $school = $userDetails['school'] ?? 'N/A';
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

                    <div class="form-group" id="school">
                        <label for="school">School</label>
                        <select id="schoolDropdown" name="school">
                            <!-- Default placeholder -->
                            <option value="" disabled>School</option>
                            
                            <!-- Dynamically populated options -->
                            <?php
                            $filePath = '../assets/schools.txt';
                            if (file_exists($filePath)) {
                                $schools = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
                                foreach ($schools as $schoolOption) {
                                    // Use the 'selected' attribute if the option matches the user's current school
                                    $selected = ($school === $schoolOption) ? 'selected' : '';
                                    echo "<option value=\"$schoolOption\" $selected>$schoolOption</option>";
                                }
                            } else {
                                echo "<option value=\"\">N/A</option>";
                            }
                            ?>
                        </select>

                    </div>
                    <div class="form-group" id="program">
                        <label for="program">Program</label>
                        <select id="programDropdown" name="program">
                        <option value="" disabled>Program</option>
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

   Modal
   <div class="modal" id="modal">
        <div class="modal-content">
            <img src="../assets/images/editDetails.png" alt="Added Information" />
            <p id="modal-message"></p>
            <button class="accept" onclick="closeModal()">Got it</button>
        </div>
    </div>


    <script>
    // Current program from the database
    const currentProgram = "<?php echo htmlspecialchars($program); ?>";

    // Listen for changes on the school dropdown
    document.getElementById('schoolDropdown').addEventListener('change', function() {
        const school = this.value;
        const programDropdown = document.getElementById('programDropdown');

        // Clear current options
        programDropdown.innerHTML = '<option value="" disabled selected>Select Program</option>';

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

                    // Mark the current program from the database as selected
                    if (program === currentProgram) {
                        option.selected = true;
                    }

                    programDropdown.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching programs:', error));
    });

    // Trigger the change event on page load to populate the dropdown
    document.addEventListener('DOMContentLoaded', function () {
        const schoolDropdown = document.getElementById('schoolDropdown');
        if (schoolDropdown.value) {
            schoolDropdown.dispatchEvent(new Event('change'));
        }
    });
</script>


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
