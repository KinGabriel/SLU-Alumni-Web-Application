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
    <title>Document</title>
    <link rel="stylesheet" href="../assets\css\adminEvent.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
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
                <li><a href="/view\adminDashboard.html"><img src="/assets/images/dashboard.png" alt="Dashboard" class="sidebar-icon"><span class="menu-item-text">Dashboard</span></a></li>
                <li><a href="/view\adminUserRequest.html"><img src="/assets/images/userRequest.png" alt="User Requests" class="sidebar-icon"><span class="menu-item-text">User Requests</span></a></li>
                <li><a href="#user-accounts"><img src="/assets/images/userAccounts.png" alt="User Accounts" class="sidebar-icon"><span class="menu-item-text">User Accounts</span></a></li>
                <li><a href="/view\adminEvent.html"><img src="/assets/images/events.png" alt="Events" class="sidebar-icon"><span class="menu-item-text">Events</span></a></li>
                <li><a href="#news"><img src="/assets/images/news.png" alt="News" class="sidebar-icon"><span class="menu-item-text">News</span></a></li>
                <li><a href="#job-opportunities"><img src="/assets/images/job.png" alt="Job" class="sidebar-icon"><span class="menu-item-text">Job Opportunities</span></a></li>
            </ul>
        </nav>

        <!-- Sticky Log Out Button -->
        <div class="sidebar-logout">
            <a href="#logout">
                <img src="/assets/images/logout.png" alt="Log Out" class="sidebar-icon">
                <span class="menu-item-logout">Log Out</span>
            </a>
        </div>
    </div>   
    
    <div class="event-header">
        <h3>SLU Events</h3>
        <div class="searchbar">
            <input type="text" placeholder="Search...">
            <i class="fa-solid fa-magnifying-glass"></i>
        </div>
    </div>
    <div class="events">
        <div class="event-tabs">
            <button class="upcoming">Upcoming</button>
            <button class="ongoing">Ongoing</button>
            <button class="past">Past</button>
            <button class="button-add">Add New Event</button>
        </div>
        <div class="event-cards">
            <div class="cards">
                <img src="/assets\images\alumni.png" alt="">
                <h4>Title</h4>
                <h4>Time & Date</h4>
                <i class="fa-solid fa-pen"></i>
            </div>
            <div class="cards">
                <img src="/assets\images\alumni.png" alt="">
                <h4>Title</h4>
                <h4>Time & Date</h4>
                <i class="fa-solid fa-pen"></i>
            </div>
            <div class="cards">
                <img src="/assets\images\alumni.png" alt="">
                <h4>Title</h4>
                <h4>Time & Date</h4>
                <i class="fa-solid fa-pen"></i>
            </div>
            <div class="cards">
                <img src="/assets\images\alumni.png" alt="">
                <h4>Title</h4>
                <h4>Time & Date</h4>
                <i class="fa-solid fa-pen"></i>
            </div>
        </div>
    </div>
    <script src="../assets\js\HandleAdminDashboard.js"></script>
</body>
</html>