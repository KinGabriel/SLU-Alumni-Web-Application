<?php
require("../controller/HandleSession.php");
$currentPage = basename($_SERVER['PHP_SELF']);
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Web Page</title>

    <!-- Link to Bootstrap CSS (CDN) -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Link to FontAwesome for icons (CDN) -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">

    <!-- Link to compiled custom styles (CSS) -->
    <link rel="stylesheet" href="../assets/css/jobOpp.css">
</head>

<head>

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
            <li>
                <a href="../view/Account.php" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'Account.php' ? 'active' : ''; ?>" id="accountLink">
                    <img src="../assets/images/userAccounts.png" alt="User Accounts" class="sidebar-icon">
                    <span class="menu-item-text">Accounts</span>
                </a>
            </li>
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
                <a href="#job-opportunities" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'jobOpportunities.php' ? 'active' : ''; ?>" id="jobOpportunitiesLink">
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




<!-- Jobs Section Title -->
<div class="row mb-5 pt-4">
    <div class="col">
        <h1>Job Opportunities</h1>
    </div>
</div>

<div class="filter-container">
  <span class="filter-bubble active" data-filter="full-time">Full-time</span>
  <span class="filter-bubble" data-filter="part-time">Part-time</span>
  <span class="filter-bubble" data-filter="internship">Internship</span>
</div>

<div class="row row-cols-1 row-cols-md-3 g-4">
    <!-- Card 1 -->
    <div class="col">
        <div class="card shadow-sm position-relative">
            <!-- Edit Icon -->
            <button class="edit-icon">
                <i class="fas fa-edit"></i>
            </button>
            <div class="card-body">
                <h5 class="card-title">Software Engineer</h5>
                <span class="badge bg-success mb-2">FULL TIME</span>
                <div class="d-flex align-items-center">
                    <img src="../assets/images/google-logo.png" alt="Google Logo" class="me-2" style="width: 40px; height: 40px;">
                    <p class="mb-0">Google Inc.<br><small>@ Dhaka, Bangladesh</small></p>
                </div>
            </div>
        </div>
    </div>

    <!-- Card 2 -->
    <div class="col">
        <div class="card shadow-sm position-relative">
            <!-- Edit Icon -->
            <button class="edit-icon">
                <i class="fas fa-edit"></i>
            </button>
            <div class="card-body">
                <h5 class="card-title">Visual Designer</h5>
                <span class="badge bg-success mb-2">FULL TIME</span>
                <div class="d-flex align-items-center">
                    <img src="../assets/images/google-logo.png" alt="Google Logo" class="me-2" style="width: 40px; height: 40px;">
                    <p class="mb-0">Google Inc.<br><small>@ Dhaka, Bangladesh</small></p>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Card 3 -->
    <div class="col">
        <div class="card shadow-sm position-relative">
            <!-- Edit Icon -->
            <button class="edit-icon">
                <i class="fas fa-edit"></i>
            </button>
            <div class="card-body">
                <h5 class="card-title">Marketing Manager</h5>
                <span class="badge bg-info mb-2">INTERNSHIP</span>
                <div class="d-flex align-items-center">
                    <img src="../assets/images/google-logo.png" alt="Google Logo" class="me-2" style="width: 40px; height: 40px;">
                    <p class="mb-0">Google Inc.<br><small>@ Dhaka, Bangladesh</small></p>
                </div>
            </div>
        </div>
    </div>

      <!-- Card 4 -->
      <div class="col">
        <div class="card shadow-sm position-relative">
            <!-- Edit Icon -->
            <button class="edit-icon">
                <i class="fas fa-edit"></i>
            </button>
            <div class="card-body">
                <h5 class="card-title">Marketing Manager</h5>
                <span class="badge bg-info mb-2">INTERNSHIP</span>
                <div class="d-flex align-items-center">
                    <img src="../assets/images/google-logo.png" alt="Google Logo" class="me-2" style="width: 40px; height: 40px;">
                    <p class="mb-0">Google Inc.<br><small>@ Dhaka, Bangladesh</small></p>
                </div>
            </div>
        </div>
    </div>
      <!-- Card 5 -->
      <div class="col">
        <div class="card shadow-sm position-relative">
            <!-- Edit Icon -->
            <button class="edit-icon">
                <i class="fas fa-edit"></i>
            </button>
            <div class="card-body">
                <h5 class="card-title">Marketing Manager</h5>
                <span class="badge bg-info mb-2">INTERNSHIP</span>
                <div class="d-flex align-items-center">
                    <img src="../assets/images/google-logo.png" alt="Google Logo" class="me-2" style="width: 40px; height: 40px;">
                    <p class="mb-0">Google Inc.<br><small>@ Dhaka, Bangladesh</small></p>
                </div>
            </div>
        </div>
    </div>

      <!-- Card 6 -->
      <div class="col">
        <div class="card shadow-sm position-relative">
            <!-- Edit Icon -->
            <button class="edit-icon">
                <i class="fas fa-edit"></i>
            </button>
            <div class="card-body">
                <h5 class="card-title">Marketing Manager</h5>
                <span class="badge bg-info mb-2">INTERNSHIP</span>
                <div class="d-flex align-items-center">
                    <img src="../assets/images/google-logo.png" alt="Google Logo" class="me-2" style="width: 40px; height: 40px;">
                    <p class="mb-0">Google Inc.<br><small>@ Dhaka, Bangladesh</small></p>
                </div>
            </div>
        </div>
    </div>
</div>


 <!-- Pagination -->
 <div class="pagination">
                <ul class="pagination">
                    <li class="page-item disabled">
                        <span class="page-link">&laquo;</span>
                    </li>
                    <li class="page-item active">
                        <span class="page-link">1</span>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#">2</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#">3</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#">Next &raquo;</a>
                    </li>
                </ul>
            </div>
        </div>
 

    <!-- Link to Bootstrap JS and Popper (for Bootstrap components) -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js"></script>
<!-- Link to custom JavaScript -->
<script src="../assets/js/jobopp.js"></script>
</body>

</html>
