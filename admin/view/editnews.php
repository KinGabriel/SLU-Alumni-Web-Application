<?php
require("../controller/HandleSession.php");
$currentPage = basename($_SERVER['PHP_SELF']);
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Edit News Form</title>
  <link rel="stylesheet" href="../assets/css/editnews.css">
</head>
<body>

     <!-- Header separator --> 
     <div class="header-separator"></div>
     <header>
         <h1>
             <img src="../assets/images/logo.png" alt="SLU Alumina Logo" class="slu-logo">
             <span>SLU Alumina</span>
         </h1>
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
             <li>
                 <a href="../view/Account.php" class="<?php echo (basename($_SERVER['PHP_SELF']) == 'Account.php') ? 'active' : ''; ?>">
                     <img src="../assets/images/userAccounts.png" alt="User Accounts" class="sidebar-icon">
                     <span class="menu-item-text">Accounts</span>
                 </a>
             </li>
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

<div class="main-content">
  <div class="form-container">
    <h2>Edit News</h2>
    <form action="edit-news.php" method="POST" enctype="multipart/form-data">

      <label for="newsTitle">News Title:</label>
      <input type="text" id="newsTitle" name="newsTitle" placeholder="Enter news title" required>


      <label for="newsDescription">News Description:</label>
      <textarea id="newsDescription" name="newsDescription" placeholder="Enter a short description" required></textarea>


      <label for="newsContent">News Content:</label>
      <textarea id="newsContent" name="newsContent" placeholder="Enter detailed news content" required></textarea>


      <label for="newsDate">News Date:</label>
      <input type="date" id="newsDate" name="newsDate" required>


      <label for="newsTime">News Time:</label>
      <input type="time" id="newsTime" name="newsTime" required>


      <label for="newsImage">Upload Image:</label>
      <input type="file" id="newsImage" name="newsImage" accept="image/*">

      <button type="submit" name="editNews">Update News</button>
    </form>
  </div>
  </div>
</body>
</html>
