<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create New User</title>
    <link rel="stylesheet" href="../assets/css/adduser.css">
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
                    <a href="index.php">
                    <img src="../assets/images/dashboard.png" alt="Dashboard" class="sidebar-icon">
                    <span class="menu-item-text">Dashboard</span>
                    </a>
             </li>
                <li>
                    <a href="/view/userRequest.php">
                    <img src="../assets/images/userRequest.png" alt="User Request" class="sidebar-icon">
                    <span class="menu-item-text">Account Requests</span>
                </a>
                </li>
                <li>
                    <a href="/view/account.php">
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

    <!-- Main Content -->
    <div class="main-content">
        <div class="form-container">
            <h2 class="form-title">Create New User</h2>
            <form>
                <!-- Name fields -->
               <!-- Name fields -->
                <div class="form-row">
                    <div class="form-group" id="first-name">
                        <label for="first-name">First Name</label>
                        <input type="text" id="first-name" name="first-name">
                    </div>
                    <div class="form-group" id="last-name">
                        <label for="last-name">Last Name</label>
                        <input type="text" id="last-name" name="last-name">
                    </div>
                </div>
                
                <!-- Email Address -->
                <div class="form-group email">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" required>
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
                    <div class="form-group" id="job-status">
                        <label for="job-status">Job Status</label>
                        <select id="job-status" name="job-status">
                            <option value="">Select Job Status</option>
                            <option value="employed">Employed</option>
                            <option value="unemployed">Unemployed</option>
                        </select>
                    </div>
                </div>

                <!-- User Roles -->
                <h3 class="section-title">User Roles:</h3>
                <div class="form-row">
                    <div class="form-group" id="user-roles">
                        <select id="user-roles" name="user-roles">
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                            <option value="manager">Manager</option>
                        </select>
                    </div>
                </div>

                <!-- Form buttons -->
                <div class="form-actions">
                    <button type="reset" class="clear-button">Clear</button>
                    <button type="submit" class="add-button">Add</button>
                </div>
            </form>
        </div>
    </div>

    <script src="../assets/js/filter.js"></script>
    <script src="../assets/js/adduser.js"></script>
    
</body>
</html>
