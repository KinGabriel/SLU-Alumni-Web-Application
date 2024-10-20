<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SLU Alumina</title>
    <link href="../assets/css/accounts.css" rel="stylesheet">
</head>
<body>
    <!--Header separator-->
    <div class="header-seperator"></div>
    <header>
        <h1>
            <img src="../assets/images/logo.png" alt="SLU Alumina Logo">
            <span>SLU Alumina</span>
        </h1>
    </header>

    <div class="sidebar-container">  
        <!-- Sidebar Navigation -->
        <nav class="sidebar-menu">
            <ul>
                <li>
                    <a href="../index.php">
                    <img src="../assets/images/dashboard.png" alt="Dashboard" class="sidebar-icon">
                    <span class="menu-item-text">Dashboard</span>
                    </a>
             </li>
                <li>
                    <a href="../view/userRequest.php">
                    <img src="../assets/images/userRequest.png" alt="User Request" class="sidebar-icon">
                    <span class="menu-item-text">Account Requests</span>
                </a>
                </li>
                <li>
                    <a href="../view/account.php">
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
                <img src="../assets/images/logout.png" alt="Log Out" class="sidebar-icon">
                <span class="menu-item-logout">Log Out</span>
            </a>
        </div>
    </div>

    <!-- User Requests table with Filters inside table headers -->
    <div class="user-content" id="userContent">
        <h1>Accounts</h1>

        <!-- User Table -->
        <table class="user-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>ID Number</th>

                    <!-- Graduation Year Column -->
                    <th>Graduation Year</th>

                    <!-- Job Status with Dropdown -->
                    <th>
                        <div class="filter-dropdown">
                            Job Status
                            <select id="jobStatusFilter">
                                <option value="all">All</option>
                                <option value="employed">Employed</option>
                                <option value="unemployed">Unemployed</option>
                            </select>
                        </div>
                    </th>

                    <!-- Role with Dropdown -->
                    <th>
                        <div class="filter-dropdown">
                            Role
                            <select id="roleFilter">
                                <option value="all">All</option>
                                <option value="alumni">Alumni</option>
                                <option value="manager">Manager</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <th>Action</th>
                    </th>
                </tr>
            </thead>
            <tbody id="userTableBody">
                <tr>
                    <td>
                        <div class="user-name">
                            <img src="../assets/images/candy.jpg" alt="John Cruz Doe" class="profile-pic">
                            John Cruz Doe
                        </div>
                    </td>
                    <td>john.doe@slu.edu.ph</td>
                    <td>2021001</td>
                    <td>2022</td>
                    <td>Employed</td>
                    <td>Alumni</td>
                    <td>
                        <button class="edit-button">
                            <img src="../assets/images/edit.png" alt="Edit" class="action-icon">
                        </button>
                        <button class="delete-button">
                            <img src="../assets/images/delete.png" alt="Delete" class="action-icon">
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="user-name">
                            <img src="../assets/images/candy.jpg" alt="Jane Mae Smith" class="profile-pic">
                            Jane Mae Smith
                        </div>
                    </td>
                    <td>jane.smith@slu.edu.ph</td>
                    <td>2021002</td>
                    <td>2023</td>
                    <td>Unemployed</td>
                    <td>Manager</td>
                    <td>
                        <button class="edit-button">
                            <img src="../assets/images/edit.png" alt="Edit" class="action-icon">
                        </button>
                        <button class="delete-button">
                            <img src="../assets/images/delete.png" alt="Delete" class="action-icon">
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="user-name">
                            <img src="../assets/images/candy.jpg" alt="Rovic James Will" class="profile-pic">
                            Rovic James Will
                        </div>
                    </td>                    
                    <td>rovic.will@slu.edu.ph</td>
                    <td>2021003</td>
                    <td>2020</td>
                    <td>Employed</td>
                    <td>Alumni</td>
                    <td>
                        <button class="edit-button">
                            <img src="../assets/images/edit.png" alt="Edit" class="action-icon">
                        </button>
                        <button class="delete-button">
                            <img src="../assets/images/delete.png" alt="Delete" class="action-icon">
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="user-name">
                            <img src="../assets/images/candy.jpg" alt="Anna Marie Lim" class="profile-pic">
                            Anna Marie Lim
                        </div>
                    </td>
                    <td>anna.lim@slu.edu.ph</td>
                    <td>2021004</td>
                    <td>2019</td>
                    <td>Unemployed</td>
                    <td>Admin</td>
                    <td>
                        <button class="edit-button">
                            <img src="../assets/images/edit.png" alt="Edit" class="action-icon">
                        </button>
                        <button class="delete-button">
                            <img src="../assets/images/delete.png" alt="Delete" class="action-icon">
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Search bar -->
    <div class="search">
        <form>
            <input type="text" placeholder="Search..">
            <img src="../assets/images/search.png" alt="Search" class="search-icon">
        </form>    
    </div>

    <!--Add User, Sort By Name, Sort by Year ---->
    <div class="button-container">
        <button id="addUserButton">Add New User</button>

        <div class="dropdown">
            <button id="dropdownButtonName">Sort By Name ▼</button>
            <div class="dropdown-content" id="dropdownContentName">
                <a href="#" class="sort-option">A - Z</a>
                <a href="#" class="sort-option">Z - A</a>
            </div>
        </div>
    
        <div class="dropdown">
            <button id="dropdownButtonDate">Sort By Year ▼</button>
            <div class="dropdown-content" id="dropdownContentDate">
                <a href="#" class="sort-option">Newest to Oldest</a>
                <a href="#" class="sort-option">Oldest to Newest</a>
            </div>
        </div>
    </div>
    
    <script src="../assets/js/filter.js"></script>
    <script src="../assets/js/adduser.js"></script>

    
</body>
</html>
