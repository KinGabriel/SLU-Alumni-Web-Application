<?php
require("../controller/HandleSession.php");
$currentPage = basename($_SERVER['PHP_SELF']);
?>
<!DOCTYPE html>
<html lang="en">

<head>
   
    <!-- Author: Vergara Carlos Miguel -->
    <!-- Used References: Codepen and ChatGPT -->
    <!-- Link to compiled custom styles (CSS) -->
    <link rel="stylesheet" href="../assets/css/addevent.css">
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
            <img src="../assets\images\notification-bell.svg" alt="notification bell" class="notif-bell" >
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
                <a href="#news" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'news.php' ? 'active' : ''; ?>" id="newsLink">
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

<main class="main-wrapper">
      <div class="steps-wrapper">
          <div class="steps">
              <span class="step active" id="step1-indicator">1</span>
              <span class="step" id="step2-indicator">2</span>
              <span class="step" id="step3-indicator">3</span>
              <div class="progress-bar">
                  <span class="progress"></span>
              </div>
          </div>

          <!-- Step 1 Content -->
          <form id="event-form" action="../controller/saveEvent.php" method="POST" enctype="multipart/form-data">
          <div class="step-content step-1" id="step1">
              <h1>Event Description</h1>
                <main class='wrapper'>
                    <!-- Event Title -->
                    <input type='text' id="event-title-input" name="event_title" placeholder='' required> 
                    <span>Event Title</span>
                </main>

                <main class='wrapper'>
                    <!-- Location -->
                    <input type='text' id="event-location-input" name="location" placeholder='' required>
                    <span>Location</span>
                </main>

                <h1>Date & Time</h1>

                <div class="session-fields">
                    <!-- Start Date -->
                    <div class="input-icon">
                        <label for="start-date">Start Date *</label>
                        <input type="date" id="start-date" name="start_date" required>
                        <i class="fa fa-calendar"></i>
                    </div>
                
                    <!-- Start Time -->
                    <div class="input-icon">
                        <label for="start-time">Start Time *</label>
                        <input type="time" id="start-time" name="start_time" required>
                        <i class="fa fa-clock"></i>
                    </div>
                
                    <!-- End Time -->
                    <div class="input-icon">
                        <label for="end-time">End Time *</label>
                        <input type="time" id="end-time" name="end_time" required>
                        <i class="fa fa-clock"></i>
                    </div>
                </div>

                <h1>Additional Information</h1>
                <main class='wrapper event-description'>
                    <!-- Event Description -->
                    <input type='text' id="event-description-input" placeholder='' name="description" required>
                    <span>Event Description</span>
                </main>
            </div>

            <!-- Step 2 Content  -->
            <div class="step-content step-2" style="display: none;">
              <h1>Upload Image</h1>
              <div class="upload-container">
                  <label for="image-upload" class="upload-label">Choose File</label>
                  <input type="file" id="image-upload" name="image" accept="image/jpeg, image/gif, image/png" class="upload-input">
                  <span id="file-name">No file chosen</span>
              </div>
              <p>Valid file formats: JPG, GIF, PNG.</p>
              <img src="" alt="Event Image" class="event-image" style="display: none; width: 200px; height: 200px; object-fit: cover;">
          </div>
          

            <!-- Step 3 Content  -->
            <div class="step-content" id="step3" style="display: none;">
              <div class="card">
                <div class="card-header">
                  <img src="" alt="Event Image" class="event-image" id="event-image-preview">
                </div>
                <div class="card-body">
                  <h2 class="event-title">Event Title</h2>
                  <p class="event-date-time">
                    <span class="date">Date</span>
                    <span class="time">Time</span>
                  </p>
                  <p class="event-location">
                    <span class="location-icon">📍</span> 
                    <span class="location-text">Address</span>
                  </p>
                  <p class="event-description">
                    <span class="description"></span>
                  </p>
                </div>
              </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="buttons">
                <button class="btn btn-prev" id="btn-prev" disabled>Previous</button>
                <button class="btn btn-next" id="btn-next" type="button">Next</button>
            </div>
          </form>
      </div>
  </main>
  <script src="../assets/js/addEvents.js"></script>
</body>
</html>
