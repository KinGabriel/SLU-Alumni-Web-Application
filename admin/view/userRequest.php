<?php
require("../controller/HandleSession.php");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SLU Alumina</title>
    <link href="../assets/css/userRequest.css" rel="stylesheet">
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
            <?php if ($_SESSION['user_type'] == 'admin'): ?>
                <li>
                    <a href="../view/Account.php" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'Account.php' ? 'active' : ''; ?>" id="accountLink">
                        <img src="../assets/images/userAccounts.png" alt="User Accounts" class="sidebar-icon">
                        <span class="menu-item-text">Accounts</span>
                    </a>
                </li>
                <?php endif; ?>
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
      
    <!-- User Requests table -->
    <div class="user-content" id="userContent">
        <h1>Account Requests List</h1>
        <table class="user-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>School Id</th>
                    <th>Graduation Year</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody id="applicantTableBody">
               
            </tbody>
        </table>


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

    </div>

  <!-- Search bar -->
<div class="search">
    <form id="searchForm">
        <input type="text" name="search" placeholder="Search..">
        <button type="submit">
            <img src="../assets/images/search.png" alt="Search" class="search-icon">
        </button>
    </form>
</div>

<!-- Sort By Name, Sort by Year -->
<div class="button-container">
    <div class="dropdown">
        <button id="dropdownButtonName">Sort By Name ▼</button>
        <div class="dropdown-content" id="dropdownContentName">
            <a href="#" class="sort-option" data-sort="name-asc">A - Z</a>
            <a href="#" class="sort-option" data-sort="name-desc">Z - A</a>
        </div>
    </div>

    <div class="dropdown">
        <button id="dropdownButtonDate">Sort By Year ▼</button>
        <div class="dropdown-content" id="dropdownContentDate">
            <a href="#" class="sort-option" data-sort="year-newest">Newest to Oldest</a>
            <a href="#" class="sort-option" data-sort="year-oldest">Oldest to Newest</a>
        </div>
    </div>
</div>
    <script src="../assets/js/HandleApplicantsTable.js"></script>

<!-- Confirmation Modal -->
<div class="confirm-modal" id="confirmModal">
    <div class="confirm-modal-content">
        <img id="modalImage" src="../assets/images/addedUser.png" alt="Information message" />
        <p id="confirmMessage"></p>
        <button class="confirm-yes" id="confirmYes">Yes</button>
        <button class="confirm-no" id="confirmNo">No</button>
    </div>
</div>


    <script src="../assets/js/HandleApplicantsTable.js"></script>
    <script src="../assets\js\HandleAdminDashboard.js"></script>

    <script>
        if (message) {
            document.getElementById('confirmMessage').textContent = message;
            document.getElementById('confirm-modal').style.display = 'block';
        }
        function closeModal() {
            message = null;
            document.getElementById('confirm-modal').style.display = 'none';
        }
    </script>

</body>
</html>
