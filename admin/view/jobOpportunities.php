<?php
require("../controller/HandleSession.php");
$currentPage = basename($_SERVER['PHP_SELF']);
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job Opportunities</title>

    <!-- Link to Bootstrap CSS (CDN) -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Link to FontAwesome for icons (CDN) -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">

    <!-- Link to compiled custom styles (CSS) -->
    <link rel="stylesheet" href="../assets/css/jobOpportunity.css">

    <!-- Author: Vergara Carlos Miguel -->
    <!-- Used References: Codepen and ChatGPT -->
</head>

<body>
    <!-- Header separator -->
    <div class="header-separator"></div>
    <header>
        <h1>
            <img src="../assets/images/logo.png" alt="SLU Alumina Logo" class="slu-logo">
            <span>SLU Alumina</span>
        </h1>
        <div class="header-profile">
            <!-- <img src="../assets/images/notification-bell.svg" alt="notification bell" class="notif-bell"> -->
            <img src="<?php echo $_SESSION['pfp'] ?: '../assets/images/alumni.jpg'; ?>" alt="Admin Profile" class="profile-pic">
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
                <li><a href="../view/adminDashboard.php" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'adminDashboard.php' ? 'active' : ''; ?>" id="dashboardLink"><img src="../assets/images/dashboard.png" alt="Dashboard" class="sidebar-icon"><span class="menu-item-text">Dashboard</span></a></li>
                <li><a href="../view/UserRequest.php" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'UserRequest.php' ? 'active' : ''; ?>" id="userRequestLink"><img src="../assets/images/userRequest.png" alt="User Request" class="sidebar-icon"><span class="menu-item-text">Account Requests</span></a></li>
                <?php if ($_SESSION['user_type'] == 'admin'): ?>
                <li>
                    <a href="../view/Account.php" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'Account.php' ? 'active' : ''; ?>" id="accountLink">
                        <img src="../assets/images/userAccounts.png" alt="User Accounts" class="sidebar-icon">
                        <span class="menu-item-text">Accounts</span>
                    </a>
                </li>
                <?php endif; ?>
                <li><a href="../view/adminEvent.php" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'adminEvent.php' ? 'active' : ''; ?>" id="eventsLink"><img src="../assets/images/events.png" alt="Events" class="sidebar-icon"><span class="menu-item-text">Events</span></a></li>
                <li><a href="../view/news.php" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'news.php' ? 'active' : ''; ?>" id="newsLink"><img src="../assets/images/news.png" alt="News" class="sidebar-icon"><span class="menu-item-text">News</span></a></li>
                <li><a href="../view/jobOpportunities.php" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'jobOpportunities.php' ? 'active' : ''; ?>" id="jobOpportunitiesLink"><img src="../assets/images/job.png" alt="Job" class="sidebar-icon"><span class="menu-item-text">Job Opportunities</span></a></li>
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
    
    <h1 style="text-align: center; margin-top: 10px">Job Opportunities</h1>



    <!-- Jobs Section Title -->
    <div class="row mb-5 pt-4">
        <form action="addJobOpp.php" method="POST">
            <button type="submit" class="custom-btn btn-3">
                <span>Add Job</span>
            </button>
        </form>
      
    </div>

<!-- Filter Buttons -->
<div class="filter-container">
    <span class="filter-bubble active" data-filter="all">All</span>
    <span class="filter-bubble" data-filter="full-time">Full-time</span>
    <span class="filter-bubble" data-filter="part-time">Part-time</span>
    <span class="filter-bubble" data-filter="internship">Internship</span>
</div>

<!-- Job Cards -->
<div class="container">
    <div class="row row-cols-1 row-cols-md-3 g-4" id="job-list">
        <!-- Job opportunities will be injected here dynamically via JavaScript -->
    </div>
</div>

<div class="pagination">
    <button id="prevPage" class="pagination-button" disabled>Previous</button>
    <ul class="pagination-links"></ul>
    <button id="nextPage" class="pagination-button" disabled>Next</button>
</div>


      <!-- Confirmation Modal -->
      <div class="confirm-modal" id="confirmModal">
    <div class="confirm-modal-content">
    <img id="modalImage" src="../assets/images/addedUser.png"  alt="Information message" />
        <p id="confirmMessage"></p>
        <button class="confirm-yes" id="confirmYes">Yes</button>
        <button class="confirm-no" id="confirmNo">No</button>
    </div>
</div>

  <!-- feed back Modal -->
<div id="feedbackModal" class="feedback-modal">
    <div class="feedback-modal-content">
    <img id="modalImage" src="../assets/images/success.png"  alt="Information message" />
        <p id="feedbackMessage"></p>
        <button id="closeFeedback" onclick="closeFeedbackModal()">Close</button>
    </div>
</div>
<!-- Link to custom JavaScript -->
<script src="../assets/js/fetchJobOpps.js"></script>
<script src="../assets/js/jobOppor.js"></script> 

</body>

</html>

