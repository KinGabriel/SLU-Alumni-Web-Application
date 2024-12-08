// Function to render the header
function renderHeader() {
    return `
    <div class="header-separator"></div>
    <header>
        <h1>
            <img src="../assets/images/logo.png" alt="SLU Alumina Logo" class="slu-logo">
            <div class="search">
                <form id="searchForm">
                    <input type="text" name="search" placeholder="Search..">
                    <button type="submit">
                        <img src="../assets/images/search.png" alt="Search" class="search-icon">
                    </button>
                </form>
            </div>
        </h1>
        <div class="profile-dropdown">
            <img src="../assets/images/candy.jpg" alt="Profile" class="profile-avatar" name="pfp" onclick="toggleDropdown()">
            <div class="dropdown-menu" id="dropdownMenu" style="display: none;">
                <div class="dropdown-header">
                    <img src="../assets/images/candy.jpg" name="pfp" alt="Profile" class="dropdown-avatar">
                    <div class="dropdown-info">
                        <h4 name="name"></h4>
                        <p>Web Developer at Google</p>
                    </div>
                </div>
                <ul class="dropdown-links">
                    <li><a href="/api/profile">View Profile</a></li>
                    <li><a href="#">Manage Profile</a></li>
                    <li><a href="#">Close Account</a></li>
                </ul>
                <div class="logout-btn">
                    <img src="../assets/images/logout.png" alt="Log out Icon" class="logout-icon">
                    <span>Log out</span>
                </div>
            </div>
        </div>
    </header>
    `;
}

// Function to render the sidebar
function renderSidebar() {
    return `
    <aside>
        <div class="profile">
            <div class="profile-bg">
                <img src="../assets/images/slu.jpg" alt="Background Image">
            </div>
            <div class="profile-info">
                <img src="" alt="Profile Picture" class="profile-pic" name="pfp">
                <div class="name" name="name"></div>
                <div class="bio" name="bio">How to code.</div>
                <div class="stats">
                    <div class="stat-item">
                        <strong>Posts</strong><br><p name="post_count"></p>
                    </div>
                    <div class="stat-item">
                        <strong>Followers</strong><br><p name="followers_count"></p>
                    </div>
                    <div class="stat-item">
                        <strong>Following</strong><br><p name="followed_count"></p>
                    </div>
                </div>
            </div>
        </div>
       <nav>
            <ul>
                <li id="feed-link"><img src="../assets/images/feed.png" alt="Feed Icon" class="nav-icon"><a href="/">Feed</a></li>
                <li id="connections-link"><img src="../assets/images/connection.png" alt="Connections Icon" class="nav-icon"><a href="/api/connections">Connections</a></li>
                <li id="news-link"><img src="../assets/images/latestNews.png" alt="News Icon" class="nav-icon"><a href="/api/news">Latest News</a></li>
                <li id="events-link"><img src="../assets/images/events.png" alt="Events Icon" class="nav-icon"><a href="/api/events">Events</a></li>
                <li id="jobs-link"><img src="../assets/images/job.png" alt="Job Opportunities Icon" class="nav-icon"><a href="/api/jobs">Job Opportunities</a></li>
                <li id="favorites-link"><img src="../assets/images/favorites.png" alt="Favorites Icon" class="nav-icon"><a href="../view/AlumniFavorites.html">Favorites</a></li>
            </ul>
        </nav>
    </aside>
    `;
}

// Function to highlight the active page in the navigation
function highlightActiveNav() {
    // Get the current URL path
    const currentPath = window.location.pathname;

    // Remove the 'active' class from all navigation links
    const navLinks = document.querySelectorAll('nav ul li');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    //'if-else' or 'switch' to match the path and highlight the correct nav item
    if (currentPath === "/") {
        document.getElementById('feed-link').classList.add('active');
    } else if (currentPath.includes('/api/connections')) {
        document.getElementById('connections-link').classList.add('active');
    } else if (currentPath.includes('/api/news')) {
        document.getElementById('news-link').classList.add('active');
    } else if (currentPath.includes('/api/events')) {
        document.getElementById('events-link').classList.add('active');
    } else if (currentPath.includes('/api/jobs')) {
        document.getElementById('jobs-link').classList.add('active');
    } else if (currentPath.includes('AlumniFavorites.html')) {
        document.getElementById('favorites-link').classList.add('active');
    }
}

// Ensure the highlight is applied when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    highlightActiveNav(); 
});

// Function to handle scroll behavior for header and separator
function handleScroll() {
    window.onscroll = function () {
        var scrollPosition = window.pageYOffset;
        var headerSeparator = document.getElementsByClassName("header-separator")[0];
        var header = document.getElementsByTagName("header")[0];
        if (scrollPosition === 0) {
            headerSeparator.style.top = "0";
            header.style.top = "30px";
            header.classList.remove("sticky");
        } else {
            headerSeparator.style.top = "-10px";
            header.style.top = "0";
            if (scrollPosition > 100) {
                header.classList.add("sticky");
            }
        }
    };
}

// Function to render post actions dynamically
function renderPostActions(post) {
    const postActions = document.createElement('div');
    postActions.classList.add('post-actions', 'card-footer', 'd-flex', 'align-items-center');
    
    const likeImage = post.is_liked ? 'like.png' : 'grayLike.png';
    const likeButton = createPostActionButton('Like', likeImage, post.like_count);
    const commentButton = createPostActionButton('Comment', 'comment.png', post.comment_count);

    const likeCountElement = likeButton.querySelector('span');

    likeButton.addEventListener('click', function () {
        const isLiked = post.is_liked;
        post.is_liked = !isLiked;
        handleLike(post.post_id, likeButton, isLiked, likeCountElement);
    });

    postActions.appendChild(likeButton);
    postActions.appendChild(commentButton);

    return postActions;
}

// Function to render the header, sidebar, etc.
document.addEventListener('DOMContentLoaded', () => {
    const contentContainer = document.getElementById('content-container');
    contentContainer.innerHTML = renderHeader() + renderSidebar();  // Render common sections dynamically

    handleScroll();  // Add the scroll functionality

    // Highlight the active navigation item
    highlightActiveNav();
});

