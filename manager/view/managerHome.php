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
    <link rel="stylesheet" href="../assets/css/style.css">
</head>

<style>
 * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Readex_Pro;
}



/* Header */
header {
    display: flex;
    justify-content: space-between; /* Space between the logo and profile */
    align-items: center; /* Center items vertically */
    background-color: white;
    padding: 0.1vw;
    /* padding-right: 3vw; */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000; 
    height: 4vw; 
}
@font-face {
    font-family: Readex_Pro;
    src: url('../fonts/font-families/Readex_Pro/ReadexPro-Regular.ttf');
  }
header h1 {
    display: flex;
    align-items: center;
    margin-left: 0.8vw;
    font-size: 1.2vw;
}

header span {
    margin-left: 0.2vw; 
}

header img.slu-logo {
    height: 50px;
    width: auto; 
    margin-right: 10px;
}

.header-separator {
    background-color: #003DA5;
    padding-bottom: 2vw;
    width: 100%;
    margin-top: -1vh;
    /* margin-bottom: 0.5vh; */
}

.notif-bell {
    margin-right: 10px; /* Adjust the value as needed */
}

.profile-pic {
    border-radius: 40px;
    height: 40px;
    width: 40px;
    margin-right: 0.8rem;
    display: inline-block; /* Ensure the image is displayed as a block */
    border: 1px solid #ccc; /* Add a border to visualize it */
}

.header-profile {
    display: flex;
    /* flex-direction: column;  */
    align-items: center; /* Align items to the left */
}

.header-profile i {
    margin-right: 1vw;
}

.header-profile .user-name {
    margin: 0; /* Reset any default margin */
    font-size: small;
}

.header-profile .account-type {
    margin: 0;
    margin-top: 0.2rem; /* Optional: space between user name and account type */
    font-size: 0.9rem; /* Adjust font size if needed */
    color: gray; /* Optional: Change the text color */
    display: block; /* Ensure account type appears below username */
    font-size: small;
}

.account-details {
    display: flex; /* Enable flexbox for the details */
    flex-direction: column; /* Stack username and account type vertically */
    align-items: left; /* Align items to the left */
}

/* Sidebar active link styling */
.nav-link.active {
    background-color: rgba(0, 61, 165, 0.4);
    color: #cf1b1b;
    border-radius: 5px;
    transition: background-color 0.3s ease, color 0.3s ease;
}

/* Side Navigation Bar */
.sidebar-container {
    background: rgba(244, 244, 244, 1);
    border-right: 1px solid #e5e5e5;
    position: fixed;
    top: 3.9vw; 
    bottom: 0;
    height: 100%;
    width: 60px;
    transition: width 0.3s ease;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    z-index: 100; 
}

.sidebar-container {
    width: 250px; 
}

.user-content {
    position: relative; 
    left: 70px; 
    padding: 20px;
    transition: left 0.3s ease; 
    z-index: 0; 
}

/* Move the user-content to the right when the sidebar is hovered */
/* .sidebar-container:hover + .user-content {
    left: 250px; 
} */

.sidebar-menu {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-top: 25px;
}

.sidebar-menu ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    flex-grow: 1;
}

.sidebar-menu li {
    display: block;
    margin-top: 10px; 
}

.sidebar-menu li a {
    display: flex;
    align-items: center;
    padding: 10px;
    color: #999;
    text-decoration: none;
    /* transition: background-color 0.2s ease, color 0.2s ease; */
}

.sidebar-menu li a {
    min-width: 60px;
    text-align: center;
}

.sidebar-menu li a .menu-item-text {
    flex: 1;
    font-size: 1.9vh;
    color: #000;
}

/* Sidebar Icon */
.sidebar-icon {
    width: 30px; 
    height: 30px; 
    margin-right: 20px; 
    margin-left: 5px;
}

/* Hover effect on sidebar items */
/* .sidebar-menu li:hover a {
    color: #fff;
    background-color: rgba(0, 61, 165, 0.4);
} */

/* Sticky Log Out Section */
.sidebar-logout {
    position: absolute;
    bottom: 15vh;
    width: 100%;
    display: flex;
    justify-content: flex-start;  
    align-items: center;
    padding: 10px;
}

.sidebar-logout a {
    display: flex;
    align-items: center;
    text-decoration: none;
    width: 100%; 
    padding: 10px; 
    /* transition: background-color 0.2s ease, color 0.2s ease; */
}

/* .sidebar-logout a:hover {
    background-color:rgba(255, 178, 0, 1);;
} */

.menu-item-logout {
    color: black;
    font-size: 1.9vh;  
    flex: 1;
    font-weight: bold;
}

/* Edit Icon Styling */
.edit-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: none;
    font-size: 18px;
    color: #333;
    cursor: pointer;
}

.edit-icon:hover {
    color: #007bff; /* Change color on hover */
}


</style>

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
                <a href="../view/managerHome.php" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'managerHome.php' ? 'active' : ''; ?>" id="homeLink">
                    <img src="../assets/images/dashboard.png" alt="Home" class="sidebar-icon">
                    <span class="menu-item-text">Home</span>
                </a>
            </li>
  
            <li>
            <a href="../view/accountsManager.php" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'Account.php' ? 'active' : ''; ?>" id="accountLink">
                    <img src="../assets/images/userAccounts.png" alt="User Accounts" class="sidebar-icon">
                    <span class="menu-item-text">Accounts</span>
                </a>
            </li>

            <li>
            <a href="../view/addEvents.php" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'adminEvent.php' ? 'active' : ''; ?>" id="eventsLink">
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
            <a href="../view/jobOpportunity.php" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'jobOpportunities.php' ? 'active' : ''; ?>" id="jobOpportunitiesLink">
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


<!-- Jobs Section Title -->
<div class="row mb-5 pt-4">
    <div class="col">
        <h1>Jobs</h1>
    </div>
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


    </div>

    <!-- Link to Bootstrap JS and Popper (for Bootstrap components) -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js"></script>

    <!-- Link to custom JavaScript -->
    <script src="../assets/js/javascript.js"></script>
</body>

</html>
