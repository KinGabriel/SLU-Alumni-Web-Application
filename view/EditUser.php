<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit User</title>
    <link rel="stylesheet" href="../assets/css/EditUser.css">
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
                        <img src="../assets/images/news.png" alt="News" class="sidebar-icon">
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

    <!-- Main Content -->
    <div class="main-content">
        <div class="form-container">
            <h2 class="form-title">Edit User Details</h2>
            <form>
            
                <div class="form-row">
                    <!-- Name fields -->
                    <div class="form-group"  id="first-name">
                        <label for="first-name">First Name</label>
                        <input type="text" id="first-name" name="first-name">
                    </div>
                
                    <div class="form-group" id="last-name">
                        <label for="last-name">Last Name</label>
                        <input type="text" id="last-name" name="last-name">
                    </div>

                    <!--Upload photo-->
                    <div class="form-group upload-photo-container">
                        <label for="upload-photo">
                            <div class="upload-photo">
                                <img id="profile-photo" src="../assets/images/default-avatar.png" alt="">
                            </div>
                            <span>Upload Photo</span>
                        </label>
                        <input type="file" id="upload-photo" accept="image/*">
                    </div>
                </div>

                    <!-- Email Address -->
                <div class="form-group" id="email" >
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email">
                </div>

                  <!-- Alumni Information -->
                <h3 class="section-title">Alumni Information:</h3>
                <div class="form-row">
                    <div class="form-group" id="school-id">
                        <label for="school-id">School ID</label>
                        <input type="text" id="school-id" name="school-id">
                    </div>

                    <div class="form-group" id="graduation-year">
                        <label for="graduation-year">Graduation Year</label>
                        <input type="text" id="graduation-year" name="graduation-year">
                    </div>

                    <div class="form-group" id="degree">
                        <label for="degree">Degree</label>
                        <select id="degree" name="degree">
                            <option value="">Select Degree</option>
                            <option value="BSCS">Bachelor of Science in Computer Science (BSCS)</option>
                            <option value="BSIT">Bachelor of Science in Information Technology (BSIT)</option>
                            <option value="PolSci">Bachelor of Arts in Political Science (PolSci)</option>
                            <option value="BSN">Bachelor of Science in Nursing (BSN)</option>
                        </select>
                    </div>

                    <div class="form-group" id="current-occupation">
                        <label for="current-occupation">Current Occupation</label>
                        <select id="current-occupation" name="current-occupation">
                            <option value="">Select Occupation</option>
                            <option value="employed">Employed</option>
                            <option value="unemployed">Unemployed</option>
                        </select>
                    </div>
                </div>

                <div class="form-actions">
                    <button type="reset" class="clear-button">Clear</button>
                    <button type="submit" class="save-button">Save</button>
                </div>
            </form>
        </div>
    </div>

    <script src="../assets/js/addphoto.js"></script>

    <!--TO DO: Need modifications-->
    <div class="modal" id="modal">
        <div class="modal-content">
            <img src="../assets/images/editDetails.png"  alt="Infomation message" />
            <p id="modal-message"></p>
            <button class="accept" onclick="closeModal()">Okay!</button>
        </div>
    </div>  
    <script src="../assets/js/HandleAuthentication.js"></script>
    <script>
        if (message) {
            document.getElementById('modal-message').textContent = message;
            document.getElementById('modal').style.display = 'block';
        }
        function closeModal() {
            message = null;
            document.getElementById('modal').style.display = 'none';
        }
    </script>

</body>
</html>
