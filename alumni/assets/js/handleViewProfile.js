
// Post Header
function createPostHeader(post) {
    const postHeader = document.createElement('div');
    postHeader.classList.add('d-flex', 'justify-content-between', 'align-items-center');

    const profileSection = document.createElement('div');
    profileSection.classList.add('d-flex');

    const profileImg = document.createElement('img');
    profileImg.classList.add('rounded-circle', 'me-3', 'feed-profile-img');
    profileImg.src = post.pfp || '../assets/images/default-avatar-icon.jpg';
    profileImg.alt = 'User Profile';

    const userInfo = document.createElement('div');
    const userName = document.createElement('h6');
    userName.classList.add('mb-0');
    userName.textContent = post.name;

    const postTime = document.createElement('small');
    postTime.classList.add('text-muted');
    postTime.textContent = formatDate(post.datetime);

    userInfo.appendChild(userName);
    userInfo.appendChild(postTime);

    profileSection.appendChild(profileImg);
    profileSection.appendChild(userInfo);

    const optionsMenu = document.createElement('div');
    optionsMenu.classList.add('dropdown');
    optionsMenu.innerHTML = `
        <button class="btn btn-link p-0 text-dark" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="../assets/images/dots.png" alt="Options" style="width: 40px; height: 40px;">
        </button>
        <ul class="dropdown-menu dropdown-menu-end custom-dropdown">
            <li><button class="dropdown-item edit-post-btn">Edit Post</button></li>
            <li><button class="dropdown-item delete-post-btn">Delete Post</button></li>
        </ul>
    `;

    postHeader.appendChild(profileSection);
    postHeader.appendChild(optionsMenu);

    return postHeader;
}

// Post Content
function createPostContent(post) {
    const postContent = document.createElement('div');
    postContent.classList.add('post-content', 'mt-3');

    const postDescription = document.createElement('p');
    postDescription.textContent = post.description;
    postContent.appendChild(postDescription);

    if (post.banner) {
        const isVideo = /\.(mp4|mov|avi)$/i.test(post.banner) || post.banner.startsWith('data:video/');
        if (isVideo) {
            const videoElement = document.createElement('video');
            videoElement.classList.add('img-fluid', 'post-video');
            videoElement.controls = true;

            const videoSource = document.createElement('source');
            videoSource.src = post.banner;
            videoSource.type = post.banner.startsWith('data:video/')
                ? post.banner.split(';')[0].split(':')[1]
                : 'video/mp4';

            videoElement.appendChild(videoSource);
            postContent.appendChild(videoElement);
        } else {
            const imageElement = document.createElement('img');
            imageElement.classList.add('img-fluid', 'post-image');
            imageElement.src = post.banner;
            imageElement.alt = 'Post Image';
            postContent.appendChild(imageElement);
        }
    }

    return postContent;
}

// Post Actions
function createPostActions(post) {
    const postActions = document.createElement('div');
    postActions.classList.add('post-actions', 'card-footer', 'd-flex', 'align-items-center');

    const actionsContainer = document.createElement('div');
    actionsContainer.classList.add('d-flex');

    const likeImage = post.is_liked ? 'like.png' : 'grayLike.png';
    const likeButton = createPostActionButton('Like', likeImage, post.like_count);
    const commentButton = createPostActionButton('Comment', 'comment.png', post.comment_count);

    const likeCountElement = likeButton.querySelector('span');

    likeButton.addEventListener('click', function () {
        const isLiked = post.is_liked;
        post.is_liked = !isLiked;
        handleLike(post.post_id, likeButton, isLiked, likeCountElement);
    });

    actionsContainer.appendChild(likeButton);
    actionsContainer.appendChild(commentButton);

    postActions.appendChild(actionsContainer);

    return postActions;
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
function formatDate(dateTime) {
    const date = new Date(dateTime); 
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000); 
    // Less than 1 minute ago
    if (diffInSeconds < 60) {
        return 'Just now';
    }
    // Less than 1 hour ago 
    if (diffInSeconds < 3600) { 
        const diffInMinutes = Math.floor(diffInSeconds / 60); 
        return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    }
    // Less than 24 hours ago
    if (diffInSeconds < 86400) { 
        const diffInHours = Math.floor(diffInSeconds / 3600); // Convert to hours
        return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    }
    // Less than 7 days ago 
    if (diffInSeconds < 604800) { 
        const diffInDays = Math.floor(diffInSeconds / 86400); // Convert to days
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
    // More than 7 days ago 
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };
    return date.toLocaleDateString('en-US', options);
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
document.addEventListener('click', (event) => {
    let currentPostElement = null; // Tracks the post being edited or deleted

    // Handle "Edit Post" button click
    if (event.target.classList.contains('edit-post-btn')) {
        const button = event.target;
        currentPostElement = button.closest('.post');

        const postContent = currentPostElement.querySelector('.post-content p').innerText;

        // Check for image or video
        const imageElement = currentPostElement.querySelector('.post-image');
        const videoElement = currentPostElement.querySelector('.post-video');
        const mediaPreview = document.getElementById('currentEditImage');

        // Populate modal fields with content and media
        document.getElementById('editPostContent').value = postContent;

        if (imageElement) {
            mediaPreview.src = imageElement.src;
            mediaPreview.style.display = 'block'; // Show image preview
            mediaPreview.classList.remove('d-none');
        } else if (videoElement) {
            mediaPreview.src = videoElement.src;
            mediaPreview.style.display = 'block'; // Show video preview
            mediaPreview.classList.remove('d-none');
        } else {
            mediaPreview.style.display = 'none'; // Hide preview if no media
        }

        // Show the edit modal
        const editPostModal = new bootstrap.Modal(document.getElementById('editPostModal'));
        editPostModal.show();

        // Save changes when "Save" button is clicked
        document.getElementById('saveEditPost').onclick = function () {
            const updatedContent = document.getElementById('editPostContent').value;
            const updatedMedia = document.getElementById('editPostImage').files[0];

            // Update post content
            currentPostElement.querySelector('.post-content p').innerText = updatedContent;

            // Update media if a new file is uploaded
            if (updatedMedia) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    if (updatedMedia.type.startsWith('image/')) {
                        if (imageElement) {
                            imageElement.src = e.target.result;
                        } else {
                            // Add an image element if it doesn't exist
                            const newImage = document.createElement('img');
                            newImage.src = e.target.result;
                            newImage.classList.add('post-image');
                            currentPostElement.querySelector('.post-content').appendChild(newImage);
                        }
                    } else if (updatedMedia.type.startsWith('video/')) {
                        if (videoElement) {
                            videoElement.src = e.target.result;
                        } else {
                            // Add a video element if it doesn't exist
                            const newVideo = document.createElement('video');
                            newVideo.src = e.target.result;
                            newVideo.controls = true;
                            newVideo.classList.add('post-video');
                            currentPostElement.querySelector('.post-content').appendChild(newVideo);
                        }
                    }
                };
                reader.readAsDataURL(updatedMedia);
            }

            // Simulate API call to save updated data
            console.log('Updated Post:', { text: updatedContent, media: updatedMedia });

            // Close the modal
            editPostModal.hide();
        };
    }

    // Preview updated media before saving
    if (event.target.id === 'editPostImage') {
        event.target.addEventListener('change', function () {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const mediaPreview = document.getElementById('currentEditImage');
                    mediaPreview.src = e.target.result;
                    mediaPreview.style.display = 'block'; 

                    if (file.type.startsWith('image/')) {
                        mediaPreview.tagName = 'IMG'; 
                    } else if (file.type.startsWith('video/')) {
                        mediaPreview.tagName = 'VIDEO'; 
                        mediaPreview.controls = true; 
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Handle "Delete Post" button click
    if (event.target.classList.contains('delete-post-btn')) {
        const button = event.target;
        currentPostElement = button.closest('.post');

        // Show the delete modal
        const deleteModal = new bootstrap.Modal(document.getElementById('deletePostModal'));
        deleteModal.show();

        // Confirm deletion
        document.getElementById('confirmDeletePost').onclick = function () {
            if (currentPostElement) {
                currentPostElement.remove(); // Remove post from the DOM

                // Simulate API call to delete post
                console.log('Post deleted');

                // Close the delete modal
                bootstrap.Modal.getInstance(document.getElementById('deletePostModal')).hide();
            }
        };
    }
});
