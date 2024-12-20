<?php
require("../controller/HandleSession.php");
$currentPage = basename($_SERVER['PHP_SELF']);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Event</title>

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- FontAwesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="../assets/css/editevents.css">
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

    <!-- Sidebar -->
    <div class="sidebar-container">
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
                <li>
                    <a href="#events">
                        <img src="../assets/images/events.png" alt="Events" class="sidebar-icon">
                        <span class="menu-item-text">Events</span>
                    </a>
                </li>
                <li>
                    <a href="#news">
                        <img src="../assets/images/news.png" alt="News" class="sidebar-icon">
                        <span class="menu-item-text">News</span>
                    </a>
                </li>
                <li>
                    <a href="#job-opportunities">
                        <img src="../assets/images/job.png" alt="Job" class="sidebar-icon">
                        <span class="menu-item-text">Job Opportunities</span>
                    </a>
                </li>
            </ul>
        </nav>
        <div class="sidebar-logout">
            <a href="../controller/ProcessLogOut.php">
                <img src="../assets/images/logout.png" alt="Log Out" class="sidebar-icon">
                <span class="menu-item-logout">Log Out</span>
            </a>
        </div>
    </div>

    <!-- Edit Event Form -->
    <div class="edit-event-container">
        <h2>Edit Event</h2>
        <form>
            <label for="event-title">Event Title</label>
            <input type="text" id="event-title" name="event-title" placeholder="Enter event title" required>

            <label for="event-description">Description</label>
            <textarea id="event-description" name="event-description" rows="4" placeholder="Enter event description" required></textarea>

            <div class="date-time">
                <div>
                    <label for="event-date">Date</label>
                    <input type="date" id="event-date" name="event-date" required>
                </div>
                <div>
                    <label for="event-time">Time</label>
                    <input type="time" id="event-time" name="event-time" required>
                </div>
            </div>

            <label for="event-location">Location</label>
            <input type="text" id="event-location" name="event-location" placeholder="Enter event location" required>

            <label for="event-category">Category</label>
            <select id="event-category" name="event-category" required>
                <option value="" disabled selected>Select a category</option>
                <option value="cultural">Cultural</option>
                <option value="workshop">Workshop</option>
                <option value="seminar">Seminar</option>
                <option value="sports">Sports</option>
                <option value="others">Others</option>
            </select>

            <label for="event-media">Image/Video</label>
            <input type="file" id="event-media" name="event-media" accept="image/*, video/*" required>

            <label for="organizer-name">Organizer</label>
            <input type="text" id="organizer-name" name="organizer-name" placeholder="Organizer name" required>

            <label for="event-status">Status</label>
            <select id="event-status" name="event-status" required>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="ended">Ended</option>
            </select>

            <div class="form-buttons">
                <button type="submit" class="save-btn">Save Changes</button>
                <button type="reset" class="cancel-btn" onclick="location.href='../view/adminEvent.php'">Cancel</button>
            </div>
        </form>
    </div>

</body>
</html>
