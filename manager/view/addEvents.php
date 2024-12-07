<?php
require("../controller/HandleSession.php");
$currentPage = basename($_SERVER['PHP_SELF']);
?>
<!DOCTYPE html>
<html lang="en">

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

body {
  background: #F2F2F2;
}

.bg-primary {
  background: #328195 !important;
}

.bubble {
  -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px);
  border-color: rgba(255, 255, 255, 0.12) !important;
  background: rgba(255, 255, 255, 0.05) !important;
  color: #ffffff;
}

.date {
  position: absolute;
  top: 15px;
  left: 15px;
  padding: 4px 10px;
}

.cover-image {
  min-height: 180px;
}

a {
  color: #328195;
  text-decoration: none;
}

.input-icon {
  position: relative;
}

.input-icon input {
  border: none;
  border-bottom: 1px solid #ced4da;
  padding-left: 30px;
}

.input-icon i {
  position: absolute;
  left: 20px;
  top: 25px;
  opacity: .5;
}

.categories a.badge {
  color: #328195;
  border-color: #328195;
}

.categories a.badge.active {
  background: #328195;
  color: #ffffff;
}

.card {
  transition: all 0.2s;
}

.card:hover {
  background: #ffffff !important;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}

.card:hover h2 a {
  transition: all 0.2s;
  color: #328195 !important;
}

.card:hover img {
  border-bottom-right-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}

.card .has-multiple button {
  display: block;
}

.card .has-multiple-icon {
  opacity: 0.2;
}

.card .has-multiple-icon {
  position: absolute;
  top: 150px;
  right: 15px;
  color: #ffffff;
}

.has-multiple {
  position: relative;
  height: 180px;
  overflow: hidden;
  width: 100%;
}

.has-multiple img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.has-multiple button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #fff;
  display: none;
}

.has-multiple button:hover {
  color: lighten(#328195, 35);
}

.has-multiple .prev {
  left: 10px;
}

.has-multiple .next {
  right: 10px;
}

/* Start of Wrapper Section */
:root {
  --bg: rgb(245, 245, 245); /* White background */
  --white: rgb(0, 0, 0); /* Black text */
  --primary: rgb(0, 0, 0); /* Black border when focused */
  --placeholder: rgb(100, 100, 100); /* Gray for placeholder text */
}

/* Start of Wrapper Section */
.wrapper {
    margin-top: 20px;
    width: min(600px, 70vw); /* Increased max width and adjusted the percentage */
    display: grid;
  align-items: center;
  padding: 10px; /* Reduced padding to bring elements closer */
  height: auto; /* Adjusted to auto to make it more flexible */
}

.wrapper > * {
  grid-column: 1;
  grid-row: 1;
  font: 1.1rem futura, helvetica, sans-serif;
  color: var(--black); /* Black text */
  margin-bottom: 10px; /* Reduced margin to bring elements closer */
}

.wrapper input {
  position: relative;
  border: 1.5px solid var(--black); /* Black border */
  border-radius: 0.25rem;
  outline: none;
  background-color: transparent;
  color: var(--black); /* Black text */
  padding: 0.75rem;
  z-index: 0;
  transition: border-color 0.5s;
  margin-bottom: 10px; /* Reduced margin */
}

.wrapper input:focus {
  border-color: var(--primary); /* Black border when focused */
}

.wrapper input:focus ~ span,
.wrapper input:not(:placeholder-shown) ~ span {
  transform: translateY(-1.8rem) scale(0.75);
  padding: 0 0.25rem;
  color: var(--black); /* Black text */
}

.wrapper span {
  width: max-content;
  background-color: var(--bg); /* White background */
  margin-left: 1rem;
  color: var(--placeholder); /* Gray placeholder text */
  transition: transform 0.5s;
}

.event-description {
  width: 100%; /* Full width within its container */
  max-width: 1000px; /* Adjust the maximum width as needed */
  margin: 0 auto; /* Center the field horizontally */
}

.event-description input {
  height: 60px; /* Adjust the height as needed */
  padding: 1rem; /* Adjust padding to maintain the appearance */
}



/* End of Wrapper Section */
/* Start of Session Fields Section */
.session-fields {
  display: flex;
  gap: 2rem; /* Increased gap for more space between fields */
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px; /* Added extra bottom margin */
}

.input-icon {
  position: relative;
  width: 250px; /* Increased width of each input field */
}
.session-fields input {
    background-color: rgba(255, 255, 255, 0.9) !important;
    border: 1.5px solid var(--black); /* Keep the black border */
  padding: 1rem; /* Adjust padding for input */
  width: 100%; /* Make input take full width */
  border-radius: 0.25rem; /* Rounded corners */
  color: var(--black); /* Black text color */
  font-size: 1rem; /* Adjust font size if needed */
}

.session-fields input::placeholder {
  color: var(--placeholder); /* Placeholder color */
  opacity: 1; /* Ensures visibility of placeholder */
  background-color: rgba(255, 255, 255, 0.9) !important;
}


.input-icon label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.75rem; /* Increased space below labels */
  font-size: 1.3rem; /* Increased label font size */
}

.input-icon i {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #777;
  font-size: 1.5rem; /* Increased icon size */
}
/* End of Session Fields Section */

/* Step 2: Upload Image Section */
.step-content.step-2 {
  background-color: #f7f7f7;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 350px;
  margin: 20px auto;
  text-align: center;
}

.step-content.step-2 h1 {
  font-size: 24px;
  color: #333;
  font-weight: 600;
  margin-bottom: 20px;
}

.upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}

.upload-label {
  font-size: 18px;
  color: #4CAF50;
  cursor: pointer;
  background-color: #fff;
  border: 2px solid #4CAF50;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 600;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.upload-label:hover {
  background-color: #4CAF50;
  color: white;
  border-color: #45a049;
}

.upload-input {
  display: none; /* Hide the default file input */
}

#file-name {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}

.step-content.step-2 p {
  font-size: 14px;
  color: #333;
  line-height: 1.5;
}

.step-content.step-2 p:last-child {
  color: #f44336; /* Red color for the error message or warnings */
}

/* Responsive Design */
@media (max-width: 600px) {
  .step-content.step-2 {
    width: 90%;
  }

  .upload-label {
    font-size: 16px;
    padding: 8px 15px;
  }

  #file-name {
    font-size: 12px;
  }

  .step-content.step-2 p {
    font-size: 12px;
  }
}
/* Styling the card container */
.card {
  width: 700px;  /* Increased width for a bigger card */
  margin: 40px auto;  /* Increased margin for spacing */
  border-radius: 12px;  /* Slightly more rounded corners */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);  /* Stronger shadow for emphasis */
  overflow: hidden;
  background-color: #fff;
}

/* Styling the card header with image */
.card-header {
  width: 100%;
  height: 400px;  /* Increased height for the image */
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
}

.event-image {
  max-width: 90%;  /* Increased width for image */
  max-height: 90%;  /* Increased height for image */
  object-fit: contain;
}

/* Styling the card body */
.card-body {
  padding: 30px;  /* More padding for spacious content */
}

/* Styling the event title */
.event-title {
  font-size: 28px;  /* Larger font for the title */
  font-weight: bold;
  margin-bottom: 15px;  /* Increased margin for spacing */
}

/* Styling date and time */
.event-date-time {
  font-size: 18px;  /* Larger font for date and time */
  color: #555;
  margin-bottom: 20px;  /* Increased margin */
}

.event-date-time .date, .event-date-time .time {
  margin-right: 20px;  /* More space between date and time */
}

/* Styling the event location */
.event-location {
  font-size: 18px;  /* Larger font for location */
  color: #888;
  margin-bottom: 25px;  /* Increased margin */
}

.location-icon {
  margin-right: 8px;  /* More space between icon and text */
}

/* Styling the event description */
.event-description {
  font-size: 16px;  /* Larger font for description */
  color: #333;
  line-height: 1.8;  /* Increased line height for readability */
}

</style>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Web Page</title>

    <!-- Link to compiled custom styles (CSS) -->
    <link rel="stylesheet" href="../assets/css/addEvents.css">
</head>

<div class="header-seperator"></div>
<header>
    <h1>
        <img src="../assets/images/Logo.png" alt="SLU Alumina Logo">
        <span>SLU Alumina</span>
    </h1>
    <nav>
        <a href="../view/managerHome.php">Home</a>
        <a href="../view/accountsManager.php">Accounts</a>
        <a href="../view/addEvents.php" class="<?= $currentPage == 'addEvents.php' ? 'active' : '' ?>">Add Events</a>
        <a href="../view/jobOpportunity.php">Add Jobs</a>
    </nav>
    <a href="../controller/ProcessLogOut.php" target="_blank" class="btn-logout">Logout</a>
</header>
<body>  
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
              <h1>Event Description</h1>

              <main class='wrapper'>
                  <!-- Event Title -->
                  <input type='text' placeholder=''>
                  <span>Event Title</span>
              </main>

              <main class='wrapper'>
                  <!-- Location -->
                  <input type='text' placeholder=''>
                  <span>Location</span>
              </main>

              <h1>Date & Time</h1>

              <div class="session-fields">
                  <!-- Start Date -->
                  <div class="input-icon">
                      <label for="start-date">Start Date *</label>
                      <input type="date" id="start-date">
                      <i class="fa fa-calendar"></i>
                  </div>
              
                  <!-- Start Time -->
                  <div class="input-icon">
                      <label for="start-time">Start Time *</label>
                      <input type="time" id="start-time">
                      <i class="fa fa-clock"></i>
                  </div>
              
                  <!-- End Time -->
                  <div class="input-icon">
                      <label for="end-time">End Time *</label>
                      <input type="time" id="end-time">
                      <i class="fa fa-clock"></i>
                  </div>
              </div>

              <h1>Additional Information</h1>
              <main class='wrapper event-description'>
                  <!-- Event Description -->
                  <input type='text' placeholder=''>
                  <span>Event Description</span>
              </main>
          </div>

          <!-- Step 2 Content  -->
          <div class="step-content step-2" style="display: none;">
            <h1>Upload Image</h1>
            <div class="upload-container">
                <label for="image-upload" class="upload-label">Choose File</label>
                <input type="file" id="image-upload" accept="image/jpeg, image/gif, image/png" class="upload-input">
                <span id="file-name">No file chosen</span>
            </div>
            <p>Valid file formats: JPG, GIF, PNG.</p>
        </div>
        

          <!-- Step 3 Content  -->
          <div class="step-content" id="step3" style="display: none;">
            <div class="card">
              <div class="card-header">
                <img src="Logo.png" alt="Event Image" class="event-image">
              </div>
              <div class="card-body">
                <h2 class="event-title">Event Title</h2>
                <p class="event-date-time">
                  <span class="date">Date</span>
                  <span class="time">Time</span>
                </p>
                <p class="event-location">
                  <span class="location-icon">📍</span> Address
                </p>
                <p class="event-description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et ligula sit amet nulla venenatis condimentum.
                </p>
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

  <script src="../assets/js/addEvents.js"></script>
</body>


</html>
