// Post Header
function createPostHeader(post) {
    const postHeader = document.createElement('div');
    postHeader.classList.add('d-flex', 'justify-content-between', 'align-items-center');

    const profileSection = document.createElement('div');
    profileSection.classList.add('d-flex');

    const profileImg = document.createElement('img');
    profileImg.classList.add('rounded-circle', 'me-3', 'feed-profile-img');
    profileImg.src = post.pfp || '../assets/images/default-profile.jpg';
    profileImg.alt = 'User Profile';

    const userInfo = document.createElement('div');
    const userName = document.createElement('h6');
    userName.classList.add('mb-0');
    userName.textContent = post.name;

    const postTime = document.createElement('small');
    postTime.classList.add('text-muted');
    postTime.dataset.is_edited = post.is_edited || false; // Track if edited
    postTime.textContent = formatDate(post.datetime, post.is_edited);

    userInfo.appendChild(userName);
    userInfo.appendChild(postTime);

    profileSection.appendChild(profileImg);
    profileSection.appendChild(userInfo);

    const optionsMenu = document.createElement('div');
    optionsMenu.classList.add('dropdown');
    optionsMenu.innerHTML = `
        <div class="dropdown">
                        <button class="btn btn-link p-0 text-dark" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="../assets/images/dots.png" alt="Options" style="width: 40px; height: 40px;">
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end custom-dropdown" style= "width: 50px;">
                            <li><button class="dropdown-item edit-post-btn">Report Post</button></li>
                        </ul>
                    </div>
    `;

    postHeader.appendChild(profileSection);
    postHeader.appendChild(optionsMenu);

    return postHeader;
}


// Post Content
//  create post content
function createPostContent(post) {
    const postContent = document.createElement('div');
    postContent.classList.add('post-content');

    const postDescription = document.createElement('p');
    postDescription.textContent = post.description;
    postContent.appendChild(postDescription);

    let postBanner;
    if (post.banner) {
        if (post.banner.startsWith('data:video/') || post.banner.endsWith('.mp4') || post.banner.endsWith('.mov') || post.banner.endsWith('.avi')) {
            postBanner = document.createElement('video');
            postBanner.classList.add('post-video');
            postBanner.controls = true;

            const videoSource = document.createElement('source');
            videoSource.src = post.banner;

            // Set video type
            if (post.banner.startsWith('data:video/')) {
                videoSource.type = post.banner.split(';')[0].split(':')[1];
            } else {
                if (post.banner.endsWith('.mp4')) {
                    videoSource.type = 'video/mp4';
                } else if (post.banner.endsWith('.mov')) {
                    videoSource.type = 'video/quicktime';
                } else if (post.banner.endsWith('.avi')) {
                    videoSource.type = 'video/x-msvideo';
                }
            }
            postBanner.appendChild(videoSource);

            // No click event for videos
        } else {
            postBanner = document.createElement('img');
            postBanner.classList.add('post-image');
            postBanner.src = post.banner;
            postBanner.alt = 'Post Image';

            // Click event to trigger view and download option for images 
            postBanner.addEventListener('click', function () {
                openMediaModal(post.banner, `image-${post.post_id}.jpg`);
            });
        }

        postContent.appendChild(postBanner);
    }

    return postContent;
}

// Function to open the media in a modal
function openMediaModal(mediaUrl, filename) {
    const modal = document.createElement('div');
    modal.classList.add('media-modal');
    modal.style.display = 'block'; // Show modal

    // Modal content
    const modalContent = document.createElement('div');
    modalContent.classList.add('media-modal-content');

    // Determine if media is an image or video and append accordingly
    let mediaElement;
    if (mediaUrl.startsWith('data:video/') || mediaUrl.endsWith('.mp4') || mediaUrl.endsWith('.mov') || mediaUrl.endsWith('.avi')) {
        mediaElement = document.createElement('video');
        mediaElement.classList.add('modal-video');
        mediaElement.controls = true;

        const videoSource = document.createElement('source');
        videoSource.src = mediaUrl;

        // Set video type
        if (mediaUrl.startsWith('data:video/')) {
            videoSource.type = mediaUrl.split(';')[0].split(':')[1];
        } else {
            if (mediaUrl.endsWith('.mp4')) {
                videoSource.type = 'video/mp4';
            } else if (mediaUrl.endsWith('.mov')) {
                videoSource.type = 'video/quicktime';
            } else if (mediaUrl.endsWith('.avi')) {
                videoSource.type = 'video/x-msvideo';
            }
        }
        mediaElement.appendChild(videoSource);

       
    } else {
        mediaElement = document.createElement('img');
        mediaElement.classList.add('modal-image');
        mediaElement.src = mediaUrl;
        mediaElement.alt = 'Post Image';

        
        const downloadButton = document.createElement('button');
        downloadButton.classList.add('dlbutton');

        // Create an image element to be inside the button
        const img = document.createElement('img');
        img.src = '../assets/images/dl.png';
        img.alt = 'Download Icon';
        const text = document.createTextNode('Download');

        downloadButton.appendChild(img);
        downloadButton.appendChild(text);

        downloadButton.addEventListener('click', function () {
            const a = document.createElement('a');
            a.href = mediaUrl;
            a.download = filename; // Customize download filename
            a.click();
        });

        modalContent.appendChild(downloadButton);
    }

    modalContent.appendChild(mediaElement);

    // Create close button for modal with "X"
    const closeButton = document.createElement('button');
    closeButton.classList.add('close-button');

    // Create image element for the close button
    const closeImage = document.createElement('img');
    closeImage.src = '../assets/images/close.png';
    closeImage.alt = 'Close';
    closeButton.appendChild(closeImage);

    closeButton.addEventListener('click', function () {
        modal.style.display = 'none'; // Close modal
    });

    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);

    // Append modal to the body
    document.body.appendChild(modal);
}

// Function to create the post actions section
function createPostActions(post) {
    const postActions = document.createElement('div');
    postActions.classList.add('post-actions', 'card-footer', 'd-flex', 'align-items-center');

    const actionsContainer = document.createElement('div');
    actionsContainer.classList.add('d-flex');

    const likeImage = post.is_liked ? 'like.png' : 'grayLike.png';
    const likeButton = createPostActionButton('Like', likeImage, post.like_count);
    const commentButton = createPostActionButton('Comment', 'comment.png', post.comment_count);

    const likeCountElement = likeButton.querySelector('span');

    // Like button functionality
    likeButton.addEventListener('click', function() {
        const isLiked = post.is_liked;
        post.is_liked = !isLiked;
        handleLike(post.post_id, likeButton, isLiked, likeCountElement);
    });

    // Comment button functionality
    commentButton.addEventListener('click', function() {
        const postId = post.post_id;

        let commentModal = document.getElementById(`commentModal-${postId}`);
        if (!commentModal) {
            commentModal = createCommentModal(postId);
            document.body.appendChild(commentModal);
        }

        loadComments(postId); // Load existing comments for the post
        const modal = new bootstrap.Modal(commentModal);
        modal.show();

        // Ensure the submit comment handler is set only once
        setupSubmitCommentHandler(postId);
    });

    actionsContainer.appendChild(likeButton);
    actionsContainer.appendChild(commentButton);

    postActions.appendChild(actionsContainer);

    return postActions;
}

// Function to create a comment modal dynamically
function createCommentModal(postId) {
    const modal = document.createElement('div');
    modal.classList.add('modal', 'fade');
    modal.id = `commentModal-${postId}`;
    modal.setAttribute('data-post-id', postId);
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', 'commentModalLabel');
    modal.setAttribute('aria-hidden', 'true');

    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="commentModalLabel">Comments</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="commentsList-${postId}">
                        <!-- Comments will be dynamically loaded here -->
                    </div>
                    <textarea id="commentInput-${postId}" class="form-control" rows="3" placeholder="Add a comment..."></textarea>
                    <button class="btn btn-primary mt-2" id="submitComment-${postId}">Submit</button>
                </div>
            </div>
        </div>
    `;

    return modal;
}

// Function to set up the submit comment handler only once
function setupSubmitCommentHandler(postId) {
    const submitCommentButton = document.getElementById(`submitComment-${postId}`);
    if (submitCommentButton) {
        submitCommentButton.removeEventListener('click', submitCommentHandler);
        submitCommentButton.addEventListener('click', submitCommentHandler);
    }

    // Comment submission handler
    function submitCommentHandler() {
        const commentInput = document.getElementById(`commentInput-${postId}`);
        const commentText = commentInput.value.trim();
        if (commentText) {
            postComment(postId, commentText).then(success => {
                if (success) {
                    loadComments(postId);  
                    commentInput.value = ''; // Clear the comment input
                }
            });
        }
    }
}

// Utility for creating action buttons
function createPostActionButton(type, icon, count) {
    const button = document.createElement('button');
    button.classList.add('btn', `btn-outline-${type.toLowerCase()}`, 'me-2');

    const iconElement = document.createElement('img');
    iconElement.classList.add('button-icon', 'me-2');
    iconElement.src = `../assets/images/${icon}`;
    iconElement.alt = `${type} Icon`;

    const countElement = document.createElement('span');
    countElement.textContent = `${type} (${count})`;

    button.appendChild(iconElement);
    button.appendChild(countElement);

    return button;
}

// handle the date formating for the user post
function formatDate(dateTime, isEdited = false) {
    const date = new Date(dateTime);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    let timeString = '';
    // Less than 1 minute ago
    if (diffInSeconds < 60) {
        timeString = 'Just now';
     // Less than 1 hour ago 
    } else if (diffInSeconds < 3600) {
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        timeString = `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    // Less than 24 hours ago
    } else if (diffInSeconds < 86400) {
        const diffInHours = Math.floor(diffInSeconds / 3600);
        timeString = `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    // Less than 7 days ago 
    } else if (diffInSeconds < 604800) {
        const diffInDays = Math.floor(diffInSeconds / 86400);
        timeString = `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    // More than 7 days ago 
    } else {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        timeString = date.toLocaleDateString('en-US', options);
    }

    return isEdited ? `${timeString} (edited)` : timeString;
}

// Likes
//Helper to update the number of likes
function updateLikeButton(likeButton, isLiked) {
    const newIsLiked = !isLiked; 
    const newLikeImage = newIsLiked ? 'like.png' : 'grayLike.png';
    likeButton.querySelector('img').src = `../assets/images/${newLikeImage}`;
    return newIsLiked;
}

//Helper for the display of the total likes 
function updateLikeCount(likeCountElement, isLiked) {
    let currentLikeCount = parseInt(likeCountElement.textContent.replace(/[^\d]/g, ''), 10);
    if (isNaN(currentLikeCount)) {
        currentLikeCount = 0;  
    }

    const newLikeCount = isLiked ? currentLikeCount + 1 : currentLikeCount - 1;
    likeCountElement.textContent = `Like (${newLikeCount})`;
    return newLikeCount;
}


function changeTab(event, target) {
    // Prevent default anchor behavior
    event.preventDefault();

    // Remove 'active' class from all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));

    // Add 'active' class to clicked tab
    event.target.classList.add('active');

    // Hide all tab content
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.style.display = 'none');

    // Show content for the clicked tab
    const targetContent = document.getElementById(target);
    targetContent.style.display = 'block';
}
