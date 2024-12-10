<?php
require("../controller/HandleSession.php");
$currentPage = basename($_SERVER['PHP_SELF']);
?>
<!DOCTYPE html>
<html lang="en">

<style>

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

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Readex_Pro;
}

@font-face {
    font-family: Readex_Pro;
    src: url('../fonts/font-families/Readex_Pro/ReadexPro-Regular.ttf');
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

/* Step 2 Container */
.step-content.step-2 {
  background-color: #fff;
  border-radius: 10px;
  padding: 30px; /* Increased padding for larger content area */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* More pronounced shadow */
  width: 80%; /* Increased width */
  margin: 50px auto; /* Centers the container with spacing */
  text-align: left;
  font-size: 18px; /* Larger font size */
}

/* Form Container */
.form-container {
  width: 100%; /* Expand the container to full width of Step 2 */
  padding: 25px;
  border-radius: 10px;
}

/* Card Styling */
.card {
  background: #f9f9f9; /* Slightly lighter background */
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 25px; /* Increased padding */
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Deeper shadow for emphasis */
  font-size: 16px; /* Larger text size inside cards */
}

/* Input Fields */
.card input[type="text"],
.card input[type="number"] {
  width: 100%;
  padding: 15px; /* Larger input fields */
  font-size: 16px; /* Larger font size for inputs */
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 5px;
}

/* Employment Type Styling */
.card p {
  font-size: 18px; /* Increased size for section titles */
  font-weight: bold;
}

.card label {
  font-size: 16px;
  margin-left: 10px;
}

.card input[type="radio"] {
  margin-right: 10px;
  transform: scale(1.5); /* Larger radio buttons */
}


/* Step 3 Container */
.step-content.step-3 {
  background-color: #fff;
  border-radius: 12px; /* Round corners for a more modern look */
  padding: 30px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); /* Stronger shadow for depth */
  width: 700px; /* Increased width for a more spacious form */
  margin: 50px auto; /* Center the form with more space above and below */
  text-align: left;
}

/* Job Description Section */
.job-description {
  margin-top: 40px; /* More space between sections */
}

.job-description h2 {
  font-size: 28px; /* Larger header text */
  color: #333;
  margin-bottom: 30px; /* Increased margin for spacing */
  font-weight: 600; /* Bold header */
  text-transform: uppercase; /* All caps for emphasis */
  letter-spacing: 1px; /* Slight spacing for a clean look */
}

/* Input Groups */
.input-group {
  margin-bottom: 30px; /* More space between fields */
}

/* Input Field Labels */
.input-group label {
  font-size: 18px; /* Larger font for labels */
  color: #333;
  font-weight: 600; /* Bold labels */
  display: block;
  margin-bottom: 10px; /* More spacing between label and field */
}

/* Textarea Fields */
.input-group textarea {
  width: 100%;
  height: 150px; /* Larger textareas for more input space */
  border: 2px solid #ccc; /* Thicker border for emphasis */
  border-radius: 8px; /* Rounded corners */
  padding: 15px; /* Larger padding for better spacing */
  font-size: 16px; /* Larger text inside textarea */
  resize: none; /* Prevent resizing */
  outline: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  transition: border-color 0.3s ease, box-shadow 0.3s ease; /* Smooth transition for focus */
}

.input-group textarea:focus {
  border-color: #3c07ff; /* Blue border on focus */
  box-shadow: 0 4px 12px rgba(0, 0, 255, 0.2); /* Glow effect on focus */
}
/* Upload container styling */
.upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #328195; /* Dashed border to indicate upload area */
  padding: 20px;
  width: 100%;
  max-width: 500px; /* Limit width */
  margin: 0 auto; /* Center the container */
  border-radius: 8px;
  background-color: #f9f9f9;
  text-align: center;
  transition: background-color 0.3s ease;
}

/* Hover effect for the upload container */
.upload-container:hover {
  background-color: #e0f7fa; /* Light blue background when hovered */
}

/* Styling for the label */
.upload-label {
  font-size: 16px;
  font-weight: 600;
  color: #328195;
  cursor: pointer;
  margin-bottom: 10px;
}

/* Styling for the input file element */
.upload-input {
  display: none; /* Hide the file input */
}

/* Styling for the file name text */
#file-name {
  font-size: 14px;
  color: #666;
  margin-top: 10px;
  font-style: italic;
}

/* Add a message if no file is selected */
.upload-container p {
  font-size: 12px;
  color: #777;
  margin-top: 10px;
}

.upload-container .info-text {
  font-size: 14px;
  color: #333;
  margin-top: 10px;
}

/* Navigation Buttons */
.buttons {
  text-align: center;
  margin-top: 40px; /* More space between form and buttons */
}

.buttons .btn {
  background-color: #3c07ff; /* Bold color for buttons */
  color: white;
  font-size: 18px; /* Larger text in buttons */
  padding: 12px 30px; /* Larger padding for a bolder look */
  border-radius: 30px; /* Rounded buttons */
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.buttons .btn:hover {
  background-color: #2900b6; /* Darker blue on hover */
  transform: translateY(-2px); /* Subtle hover effect */
}

.buttons .btn:disabled {
  background-color: #ddd; /* Disabled button style */
  cursor: not-allowed;
}

/* Responsive Design */
@media (max-width: 769px) {
  .step-content.step-3 {
    width: 100%; /* Full-width form on small screens */
    padding: 20px;
  }
}



</style>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Web Page</title>

    <!-- Link to compiled custom styles (CSS) -->
    <link rel="stylesheet" href="../assets/css/addEvents.css">
</head>


</head>
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
              <h1>Company Background</h1>

              <main class='wrapper'>
                  <input type='text' placeholder=''>
                  <span>Company Name</span>
              </main>

              <main class='wrapper'>
                  <input type='text' placeholder=''>
                  <span>Country</span>
              </main>

              <main class='wrapper'>
              
                <input type='text' placeholder=''>
                <span>Zip Code</span>
            </main>

            
            <main class='wrapper'>
              
                <input type='text' placeholder=''>
                <span>Complete Address</span>
            </main>

            <main class='wrapper'>
          
                <input type='text' placeholder=''>
                <span>Email Address</span>
            </main>
            <main class='wrapper'>
              
                <input type='text' placeholder=''>
                <span>Contact Number</span>
            </main>
          
          <main class='wrapper event-description'>
            <!-- Company Description -->
            <input type='text' placeholder=''>
            <span>Company Description</span>
        </main>
    </div>

          <!-- Step 2 Content  -->
          <div class="step-content step-2" style="display: none;">
            <h1>Upload Company Logo</h1>
            <div class="upload-container">
                <label for="image-upload" class="upload-label">Choose Image</label>
                <input type="file" id="image-upload" accept="image/jpeg, image/gif, image/png" class="upload-input">
                <span id="file-name">No Image chosen</span>
            </div>
            <div class="form-container">
              <h2>Basic Information</h2>
              <p class="info-text">This information will be displayed publicly</p>
          
              <!-- Job Title Card -->
              <div class="card">
                <label for="job-title">Job Title</label>
                <input
                  type="text"
                  id="job-title"
                  name="job-title"
                  placeholder="e.g. Software Engineer"
                  maxlength="80"
                  required
                />
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
              <textarea
                id="skills"
                placeholder="Describe your key skills and qualifications relevant to the position."
              ></textarea>
            </div>
            <!-- Requirements Section -->
            <div class="input-group">
              <label for="requirements">Requirements:</label>
              <textarea
                id="requirements"
                placeholder="Outline the key qualifications and requirements for the position."
              ></textarea>
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

  <script src="../assets/js/jobOpp.js"></script>
</body>


</html>
