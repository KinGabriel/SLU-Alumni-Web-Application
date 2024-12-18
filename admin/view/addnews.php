<?php
require("../controller/HandleSession.php");
$message = isset($_SESSION['confirmationMessage']) ? addslashes($_SESSION['confirmationMessage']) : '';
$formData = isset($_SESSION['formData']) ? $_SESSION['formData'] : [];

$uploadedImagePath = '';
$idImage = '';  // Variable to hold image binary data

// Check if the file is uploaded and not empty
if (isset($formData['newsphoto']) && !empty($formData['newsphoto'])) {
    // Assuming the file is stored in the 'uploads' directory
    $uploadDir = '../uploads/';
    $uploadFile = $uploadDir . basename($formData['newsphoto']['name']);
    
    // Move the uploaded file to the directory
    if (move_uploaded_file($formData['newsphoto']['tmp_name'], $uploadFile)) {
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
    <title>Add News</title>
    <link rel="stylesheet" href="../assets\css\addnews.css">
    <link href="../../node_modules/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js" defer></script>
  
</head>
<body>
    <!-- Header separator -->
    <div class="header-separator"> </div>
    <header>
        <h1>
            <img src="../assets/images/logo.png" alt="SLU Alumina Logo" class="slu-logo">
            <span>SLU Alumina</span>
        </h1>
        <div class="header-profile">
            <!-- <i class="fa-regular fa-bell"></i> -->
            <!-- <img src="../assets\images\notification-bell.svg" alt="notification bell" class="notif-bell" > -->
            <img src="<?php echo $_SESSION['pfp'] ?: '../assets\images\alumni.jpg'; ?>" alt="Admin Profile" class="profile-pic">
            <div class="account-details">
                <span class="user-name"><?php echo $_SESSION['user_name']; ?></span>
                <span class="account-type"><?php echo $_SESSION['user_type']; ?></span>
            </div>
        </div>
    </header>

<!-- Sidebar -->
<div class="sidebar-container">
    <nav class="sidebar-menu">
        <ul>
            <li>
                <a href="../view/adminDashboard.php" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'adminDashboard.php' ? 'active' : ''; ?>" id="dashboardLink">
                    <img src="../assets/images/dashboard.png" alt="Dashboard" class="sidebar-icon">
                    <span class="menu-item-text">Dashboard</span>
                </a>
            </li>
            <li>
                <a href="../view/UserRequest.php" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'UserRequest.php' ? 'active' : ''; ?>" id="userRequestLink">
                    <img src="../assets/images/userRequest.png" alt="User Request" class="sidebar-icon">
                    <span class="menu-item-text">Account Requests</span>
                </a>
            </li>
            <?php if ($_SESSION['user_type'] == 'admin'): ?>
                <li>
                    <a href="../view/Account.php" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'Account.php' ? 'active' : ''; ?>" id="accountLink">
                        <img src="../assets/images/userAccounts.png" alt="User Accounts" class="sidebar-icon">
                        <span class="menu-item-text">Accounts</span>
                    </a>
                </li>
                <?php endif; ?>
            <li>
            <li>
                <a href="../view/adminEvent.php" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'adminEvent.php' ? 'active' : ''; ?>" id="eventsLink">
                    <img src="../assets/images/events.png" alt="Events" class="sidebar-icon">
                    <span class="menu-item-text">Events</span>
                </a>
            </li>
            <li>
                <a href="../view/news.php" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'news.php' ? 'active' : ''; ?>" id="newsLink">
                    <img src="../assets/images/news.png" alt="News" class="sidebar-icon">
                    <span class="menu-item-text">News</span>
                </a>
            </li>
            <li>
            <a href="../view/jobOpportunities.php" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'jobOpportunities.php' ? 'active' : ''; ?>" id="jobOpportunitiesLink">
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


<form action ="../controller/ProcessAddNews.php" method="POST" enctype="multipart/form-data" onsubmit="validatenewsform(event)">
<div class="upload-container">
    <h2>Upload News Photo</h2>
    <div class="upload-box">
        <label for="newsphoto" class="upload-label">Choose Image</label>
        <input type="file" id="newsphoto" name="newsphoto" class="upload-input" accept="image/*" onchange="handleFileUpload()" />
        <span id="file-name">No Image chosen</span>
        <img id="image-preview" class="image-preview" alt="Preview will appear here" />
    </div>
</div>
<div class="basic-info-container">
    <h3>Basic Information</h3>
    <p class="info-text">This information will be displayed publicly</p>
    <div class="input-group">
        <label for="news-title">News Title</label>
        <input type="text" name="news-title" id="news-title" placeholder="e.g. SLU News" value="<?= isset($formData['news-title']) ? htmlspecialchars($formData['news-title']) : '' ?>" required/>
    </div>
    <div class="input-group">
        <label for="news-description">News Description</label>
        <textarea id="news-description" name="news-description" placeholder="Write a detailed description of the news..." rows="4" value="<?= isset($formData['news-description']) ? htmlspecialchars($formData['news-description']) : '' ?>" required></textarea>
    </div>

    <!-- Buttons -->
    <div class="form-actions">
        <button type="button" class="btn-cancel" onclick="cancelForm()">Cancel</button>
        <button type="submit" id="addNewsButton" class="btn-submit">Add News</button>
    </div>
</div>
</form>>

<div class="modal" id="modal">
        <div class="modal-content">
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
<script src="../assets/js/handleAddnews.js"></script>
</body>
</html>