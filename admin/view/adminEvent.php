<?php
require("../controller/HandleSession.php");
$currentPage = basename($_SERVER['PHP_SELF']);
?>
<!DOCTYPE html>
<html lang="en">
<style>
    
</style>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Events</title>

    <!-- Link to Bootstrap CSS (CDN) -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Link to FontAwesome for icons (CDN) -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">

    <!-- Link to compiled custom styles (CSS) -->
    <link rel="stylesheet" href="../assets/css/event.css">
    <!-- Author: Vergara Carlos Miguel -->
    <!-- Used References: Codepen and ChatGPT -->
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
        <div class="container py-100">
            <!-- Page Title for Events -->
            <div class="row mb-2">
                <div class="col">
                </div>
            </div>

           <!-- Add Event Button (Form Method) -->
<form action="addEvents.php" method="POST">
    <button type="submit" class="custom-btn btn-3">
        <span>Add Events</span>
    </button>
</form>


            <div class="container py-5">
                <!-- Search and Categories Section Events -->
                <div class="row mb-4">
                    <div class="col">
                        <div class="form-group bg-white input-icon p-3 rounded shadow-sm mb-3">
                            <i class="fas fa-search"></i>
                            <input type="search" placeholder="Search by title or category" class="form-control mb-3" />
                            <div class="categories">
                                <a href="#" class="badge rounded-pill active me-1">All</a>
                                <a href="#" class="badge rounded-pill me-1">Upcoming</a>
                                <a href="#" class="badge rounded-pill me-1">Ended</a>
                            </div>
                        </div>
                    </div>
                </div>
                <h1>Events</h1>

        <!-- Dynamic Cards Container -->
        <div class="row row-cols-md-3 gx-3" id="cards-container">
            <!-- Cards will be inserted here via JavaScript -->
        </div>

                
            </div>
        </div>
  

    
  <!-- Pagination -->
  <div class="pagination">
            <ul class="pagination">
                <li class="page-item" id="prevPage">
                    <span class="page-link">&laquo;</span>
                </li>
                <li class="page-item active" id="page1">
                    <span class="page-link">1</span>
                </li>
                <li class="page-item" id="page2">
                    <span class="page-link">2</span>
                </li>
                <li class="page-item" id="page3">
                    <span class="page-link">3</span>
                </li>
                <li class="page-item" id="nextPage">
                    <span class="page-link">Next &raquo;</span>
                </li>
            </ul>
        </div>
 

    <!-- Link to Bootstrap JS and Popper (for Bootstrap components) -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js"></script>
    <!-- Link to custom JavaScript -->
     <script src="../assets/js/adminEvent.js"></script>
</body>

</html>
