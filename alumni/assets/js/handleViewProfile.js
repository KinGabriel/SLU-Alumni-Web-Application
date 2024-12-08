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
    postTime.dataset.isEdited = post.isEdited || false; // Track if edited
    postTime.textContent = formatDate(post.datetime, post.isEdited);

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
            <li><button class="dropdown-item edit-post-btn" data-post-id="${post.post_id}">Edit Post</button></li>
            <li><button class="dropdown-item delete-post-btn" data-post-id="${post.post_id}">Delete Post</button></li>
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

// handles edit and delete
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("edit-post-btn")) {
        const postId = event.target.getAttribute("data-post-id");
        if (!postId) {
            console.error("Post ID is missing");
            return;
        }

        currentPostElement = event.target.closest(".post");

        const postContent = currentPostElement.querySelector(".post-content p").innerText;
        const mediaElement = currentPostElement.querySelector(".post-content img, .post-content video");
        const mediaPreviewContainer = document.getElementById("editMediaPreview");

        // Set initial values in the modal
        document.getElementById("editPostContent").value = postContent;
        mediaPreviewContainer.innerHTML = "";

        // Display current media in the preview
        if (mediaElement) {
            const previewWrapper = document.createElement("div");
            previewWrapper.classList.add("position-relative", "d-inline-block", "me-2");

            let previewElement;
            if (mediaElement.tagName === "IMG") {
                previewElement = document.createElement("img");
                previewElement.src = mediaElement.src;
            } else if (mediaElement.tagName === "VIDEO") {
                previewElement = document.createElement("video");
                previewElement.src = mediaElement.src;
                previewElement.controls = true;
            }
            previewElement.classList.add("img-fluid", "rounded");
            previewElement.style.maxHeight = "200px";

            // Add an "X" button to remove the media preview
            const closeButton = document.createElement("button");
            closeButton.type = "button";
            closeButton.classList.add("btn-close", "position-absolute", "top-0", "end-0", "m-1");
            closeButton.setAttribute("aria-label", "Remove");
            closeButton.addEventListener("click", () => {
                mediaPreviewContainer.removeChild(previewWrapper);
            });

            previewWrapper.appendChild(previewElement);
            previewWrapper.appendChild(closeButton);
            mediaPreviewContainer.appendChild(previewWrapper);
        }

        const editPostModal = new bootstrap.Modal(document.getElementById("editPostModal"));
        editPostModal.show();

        // Handle the save logic 
        const saveButton = document.getElementById("saveEditPost");
        const clonedSaveButton = saveButton.cloneNode(true);
        saveButton.parentNode.replaceChild(clonedSaveButton, saveButton);

        clonedSaveButton.addEventListener("click", () => {
            const updatedText = document.getElementById("editPostContent").value.trim();
            const fileInput = document.getElementById("editPostMedia");
            const file = fileInput.files[0];

            const postTextElement = currentPostElement.querySelector(".post-content p");
            postTextElement.textContent = updatedText;

            const mediaContainer = currentPostElement.querySelector(".post-content");
            const existingMedia = mediaContainer.querySelector("img, video");

            if (file) { // Remove existing media if a new file is provided
                if (existingMedia) mediaContainer.removeChild(existingMedia);
        
                const reader = new FileReader();
                reader.onload = function (e) {
                    let newMediaElement;
                    if (file.type.startsWith("image/")) {
                        newMediaElement = document.createElement("img");
                        newMediaElement.src = e.target.result;
                    } else if (file.type.startsWith("video/")) {
                        newMediaElement = document.createElement("video");
                        newMediaElement.src = e.target.result;
                        newMediaElement.controls = true;
                    }
                    newMediaElement.classList.add("img-fluid", "rounded");
                    mediaContainer.appendChild(newMediaElement);
                };
                reader.readAsDataURL(file);
            } else if (!updatedText && existingMedia) {
                // If no text or file is updated, retain the existing media
                if (!mediaContainer.contains(existingMedia)) {
                    mediaContainer.appendChild(existingMedia);
                }
            }
        
            // Update the post time with the (edited) label
            const postTimeElement = currentPostElement.querySelector("small.text-muted");
            postTimeElement.dataset.isEdited = true;
            postTimeElement.textContent = formatDate(new Date(), true);
        
            const editPostModalInstance = bootstrap.Modal.getInstance(document.getElementById("editPostModal"));
            editPostModalInstance.hide();

            try {
                const result = editPost(postId, updatedText, file || mediaElement);
                console.log("Post updated successfully:", result); // TODO Modal
                // Show success modal
                const successModal = new bootstrap.Modal(document.getElementById("successModal"));
                successModal.show();
            } catch (error) {
                console.error("Failed to update the post:", error); // TODO Modal
                // Show error modal
                const errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
                errorModal.show();
            }
            // Clear file input to avoid duplicated uploads
            fileInput.value = "";   
            });
         }
    });

// Handle Delete Post button click
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-post-btn")) {
            const button = event.target;
            currentPostElement = button.closest(".post");
            // Show the delete modal
            const deleteModal = new bootstrap.Modal(document.getElementById("deletePostModal"));
            deleteModal.show();
        }
    });

// Confirm Delete Post
    document.getElementById("confirmDeletePost").addEventListener("click", () => {
        if (currentPostElement) {
            currentPostElement.remove(); // Remove post from the DOM
            // Simulate API call to delete post
            console.log("Post deleted");
            // Close the delete modal
            const deleteModal = bootstrap.Modal.getInstance(document.getElementById("deletePostModal"));
            deleteModal.hide();
        }
    });
