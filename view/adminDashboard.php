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
    <title>SLU Alumina</title>
    <link rel="stylesheet" href="../assets/css/adminDashboard.css">
    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">  -->
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
    <!-- stats -->
    <div class="card-container">
    <div class="card">
        <h3>Total Members</h3>
        <div class="card-content">
            <img src="../assets/images/totalmember.svg" alt="Total Members">
            <p id="totalMembers">Loading...</p>
        </div>
    </div>
    <div class="card">
        <h3>Total Applicants</h3>
        <div class="card-content">
            <img src="../assets/images/totalrequest.svg" alt="Total Requests">
            <p id="totalApplicants">Loading...</p>
        </div>
    </div>
    <div class="card">
        <h3>Job Opportunities Available</h3>
        <div class="card-content">
            <img src="../assets/images/jobopportunities.svg" alt="Available Job Opportunities">
            <p id="totalJobOpportunity">Loading...</p>
        </div>
    </div>

 <div class="card">
        <h3>Number of Events</h3>
        <div class="card-content">
        <img src="../assets/images/numberofevents.svg" alt="Number of events">
        <p id="totalEvents">Loading...</p>
        </div>
    </div>
    <div class="card">
        <h3>Added News</h3>
        <div class="card-content">
        <img src="../assets/images/addednews.svg" alt="Number of addednews">
        <p id="totalNews">Loading...</p>
        </div>
    </div>
</div>

    <div class="second-row">
        <div class="first-div">
            <h2>Announcements</h2>
        </div>
        <div class="second-div">
            <h3>Employee Composition</h3>
            <div class="chart-container">
                <canvas id="admin-chart"></canvas>
            </div>
        </div>
    </div>
    
    <!-- commented this because it is a bootstrap -->
 <!--   <script src="https://cdn.jsdelivr.net/npm/chart.js"></script> --> 
    <script src="../assets\js\HandleAdminDashboard.js"></script>

</body>
</html>