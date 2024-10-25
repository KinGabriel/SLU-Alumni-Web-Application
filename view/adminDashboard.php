<?php
require_once '../database/Configuration.php'; 
session_start();
$message = isset($_SESSION['confirmationMessage']) ? addslashes($_SESSION['confirmationMessage']) : '';
$formData = isset($_SESSION['formData']) ? $_SESSION['formData'] : [];
echo "<script>var message = '$message';</script>";
unset($_SESSION['confirmationMessage'], $_SESSION['formData']);
?>
<?php
// Connect to your database
$host = "localhost";
$username = "root";
$password = "";
$database = "slu_alumina-mid";

$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query to get the count of members
$sql = "SELECT COUNT(*) AS total_members FROM alumni"; 
$result = $conn->query($sql);

// Fetch the count
$totalMembers = 0;
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $totalMembers = $row['total_members'];
}

// Query to get the count of applicants
$sql = "SELECT COUNT(*) AS total_applicants FROM applicants"; 
$result = $conn->query($sql);

// Fetch the count
$totalApplicants = 0;
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $totalApplicants = $row['total_applicants'];
}

// // Query to get the count of events
// $sql = "SELECT COUNT(*) AS total_events FROM event"; 

// // Fetch the count
// $totalEvents = 0;
// if ($result->num_rows > 0) {
//     $row = $result->fetch_assoc();
//     $totalEvents = $row['total_events'];
// }

// Query to get the count of  job opporunity
$sql = "SELECT COUNT(*) AS total_job_opportunity FROM opportunity"; 
$result = $conn->query($sql);

// Fetch the count
$totalJobOpportunity = 0;
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $totalJobOpportunity = $row['total_job_opportunity'];
}

// // Query to get the count of news
// $sql = "SELECT COUNT(*) AS total_news FROM news"; 
// $result = $conn->query($sql);

// // Fetch the count
// $totalNews = 0;
// if ($result->num_rows > 0) {
//     $row = $result->fetch_assoc();
//     $totalNews = $row['total_news'];
// }

$conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
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
            <a href="#logout">
                <img src="/assets/images/logout.png" alt="Log Out" class="sidebar-icon">
                <span class="menu-item-logout">Log Out</span>
            </a>
        </div>
    </div>
    
    <div class="card-container">
        <div class="card">
            <h3>Total Member</h3>
            <div class="card-content">
                <img src="../assets/images/totalmember.svg" alt="Total Members">
                <p><?php echo $totalMembers; ?></p>
            </div>
        </div>
        <div class="card">
            <h3>Total Request</h3>
            <div class="card-content">
                <img src="../assets/images/totalrequest.svg" alt="Total Requests">
                <p><?php echo $totalApplicants; ?></p>
            </div>
        </div>
        <div class="card">
            <h3>Number of Events</h3>
            <div class="card-content">
                <img src="../assets/images/numberofevents.svg" alt="Number of Events">
                <p>0</p>
            </div>
        </div>
        <div class="card">
            <h3>Job Opportunities Available</h3>
            <div class="card-content">
                <img src="../assets/images/jobopportunities.svg" alt="Available Job Opportunities">
                <p><?php echo $totalJobOpportunity; ?></p>
            </div>
        </div>
        <div class="card">
            <h3>Added News</h3>
            <div class="card-content">
                <img src="../assets/images/addednews.svg" alt="Added News">
                <p>0</p>
            </div>
        </div>
    </div>
    <div class="second-row">
        <div class="first-div">
            <h3>Announcements</h3>
        </div>
        <div class="second-div">
            <h3>Employee Composition</h3>
            <div class="chart-container">
                <canvas id="admin-chart"></canvas>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="../assets\js\doughnut-chart-admin.js"></script>
</body>
</html>