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

    <!-- Link to compiled custom styles (CSS) -->
    <link rel="stylesheet" href="../assets/css/addJob.css">
    <!-- Author: Vergara Carlos Miguel -->
    <!-- Used References: Codepen and ChatGPT -->
</head>


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

<form id="event-form" action="../controller/saveJobOpp.php" method="POST" enctype="multipart/form-data">
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
          <div class="step-content" id="step1">
              <h1>Company Background</h1>

              <main class='wrapper'>
                  <input type='text' id="company-name" name="company-name" placeholder='' required>
                  <span>Company Name</span>
              </main>

              <main class='wrapper'>
                  <input type='text' id="country" name="country" placeholder='' required>
                  <span>Country</span>
              </main>

              <main class='wrapper'>
                <input type='text' id="zip-code" name="zip-code" placeholder='' required>
                <span id="zip-label">Zip Code</span>
                <span id="zip-error" class="error-message" style="display: none;">Please enter a valid zip code</span>
              </main>

            
            <main class='wrapper'>
              
                <input type='text' id="address" name="address" placeholder='' required>
                <span>Complete Address</span>
            </main>

            <main class='wrapper'>
          
                <input type='text' id="email-address" name="email-address" placeholder='' required>
                <span id="email-label">Email Address</span>
                <span id="email-error" class="error-message" style="display: none;">Invalid email</span> <!-- Error message -->
            </main>
            <main class='wrapper'>
              
                <input type='text' id="contact-number" name="contact-number" placeholder='' required>
                <span id="number-label">Contact Number</span>
                <span id="number-error" class="error-message" style="display: none;">Invalid Number</span> 
            </main>
          
          <main class='wrapper event-description'>
            <!-- Company Description -->
            <input type='text' id="company-description" name="company-description"placeholder='' required>
            <span>Company Description</span>
        </main>
    </div>

          <!-- Step 2 Content -->
          <div class="step-content step-2" style="display: none;">
            <h1>Upload Company Logo</h1>
            <div class="upload-container">
              <label for="image-upload" class="upload-label">Choose Image</label>
              <input type="file" name="image" id="image-upload" accept="image/jpeg, image/gif, image/png" class="upload-input"/>
              <span id="file-name">No Image chosen</span>
            </div>
            <p>Valid file formats: JPG, GIF, PNG.</p>
            <img src="" alt="Company Logo" class="company-logo" style="display: none; width: 200px; height: 200px; object-fit: cover;"/>
            <div class="form-container">
              <h2>Basic Information</h2>
              <p class="info-text">This information will be displayed publicly</p>

              <!-- Job Title Card -->
              <div class="card">
                <label for="job-title">Job Title</label>
                <input type="text" id="job-title" name="job-title" placeholder="e.g. Software Engineer" maxlength="80" required/>
              </div>
            </div>
          </div>
        
        <div class="step-content step-3" id="step3" style="display: none;">
          
          <!-- Job Description Section -->
          <div class="job-description">
            <h2>Job Description</h2>
            <!-- Skills Section -->
            <div class="input-group">
              <label for="skills">Skills:</label>
              <textarea name = "skills" id="skills" placeholder="Describe your key skills and qualifications relevant to the position." required></textarea>
            </div>
            <!-- Requirements Section -->
            <div class="input-group">
              <label for="requirements">Requirements:</label>
              <textarea name= "requirements" id="requirements" placeholder="Outline the key qualifications and requirements for the position." required></textarea>
            </div>
          </div>
        </div>

          <!-- Navigation Buttons -->
          <div class="buttons">
              <button class="btn btn-prev" id="btn-prev" disabled>Previous</button>
              <button class="btn btn-next" id="btn-next">Next</button>
          </div>
      </div>
  </main>
</form>

  <script src="../assets/js/jobOpp.js"></script>
</body>


</html>
