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
  font-family: Readex_Pro;
}

h1 {
  margin-top: 20px; 
}

.card {
  position: relative;
  margin-bottom: 20px;
}

.edit-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #333;
}

.edit-icon:hover {
  color: #007bff; /* Hover color */
}

.bubble {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
}

.has-multiple-icon {
  display: none;
}

.card-body a {
  color: #007bff;
  text-decoration: none;
}

.card-body a:hover {
  text-decoration: underline;
}

.cover-image {
  width: 100%;
  height: auto;
}

.categories a.active {
  font-weight: bold;
}

@font-face {
  font-family: Readex_Pro;
  src: url('../fonts/font-families/Readex_Pro/ReadexPro-Regular.ttf');
}

html {
  scroll-behavior: smooth;
}

.hidden {
  opacity: 0;
  transform: translateY(300px);
  transition: all 1s ease-in;
}

.visible {
  opacity: 1;
  transform: translateY(0);
}

.header-seperator {
  background-color: #003DA5;
  padding-bottom: 2vw;
  width: 100%;
  margin-top: -1vh;
  margin-bottom: 0.5vh;
}

/* Header Section */
header {
  position: sticky;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9); /* Slightly off-white */
  padding: 0.3vw;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  z-index: 1000;
  transition: top 0.1s ease;
}

header h1 {
  display: flex;
  align-items: center;
  margin-left: 1.2vw;
  font-size: 1.4vw;
}

header span {
  margin-left: 0.3vw;
}

header img {
  height: 50px;
  width: auto;
}

nav {
  margin-left: 27%;
  margin-top: 0.2%;
}

nav a {
  padding: 0.3vw;
  text-decoration: none;
  color: inherit;
  margin-left: 1vw; /* Adds spacing between links */
  margin-right: 1vw; /* Adds spacing between links */
  transition: color 0.2s ease;
  font-size: 20px;
}

nav a:hover {
  text-decoration: underline;
  text-decoration-color: rgba(255, 178, 0, 1);
  text-decoration-thickness: 2.5px;
}

nav a.active {
    text-decoration: underline;
    text-decoration-color: rgba(255, 178, 0, 1);
    text-decoration-thickness: 2.5px;
}

/* Log in button */
.btn-logout {
  background-color: #1D4ED8;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  margin-left: 25vw;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  text-decoration: none;
}

.btn-logout:hover {
  background-color: #3B82F6;
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

<div class="header-seperator"></div>
<header>
    <h1>
        <img src="../assets/images/Logo.png" alt="SLU Alumina Logo">
        <span>SLU Alumina</span>
    </h1>
    <nav>
        <a href="../view/managerHome.php" class="<?= $currentPage == 'managerHome.php' ? 'active' : '' ?>">Home</a>
        <a href="../view/accountsManager.php">Accounts</a>
        <a href="../view/addEvents.php">Add Events</a>
        <a href="../view/jobOpportunity.php">Add Jobs</a>
    </nav>
    <a href="../controller/ProcessLogOut.php" target="_blank" class="btn-logout">Logout</a>
</header>

<body>
  

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
