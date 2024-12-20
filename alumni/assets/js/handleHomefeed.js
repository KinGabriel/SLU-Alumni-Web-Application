 // Add the 'active' class based on the current URL
 document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname; // Get the current URL path
    const navLinks = document.querySelectorAll('nav li a'); // Get all navigation links

    navLinks.forEach(link => {
        // Check if the link's href matches the current path
        if (link.href.endsWith(currentPath)) {
            link.parentElement.classList.add('active');  // Add active class to the corresponding list item
        }
    });

    document.querySelectorAll('nav li a').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelectorAll('nav li').forEach(item => {
                item.classList.remove('active');  // Remove active class from all items
            });
            link.parentElement.classList.add('active');  // Add active class to the clicked item
        });
    });
});


// hanlde the scroll of the homefeed
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

// Handle the show of modal for post
document.addEventListener("DOMContentLoaded", () => {
    const modalTriggerElements = [
        document.querySelector(".post-content textarea"),
        document.querySelector(".post-actions .add-photo"),
        document.querySelector(".post-actions .add-video")
    ];

    modalTriggerElements.forEach(element => {
        if (element) {
            element.addEventListener("click", () => {
                const postModal = new bootstrap.Modal(document.getElementById("postModal"));
                postModal.show();
            });
        }
    });

    // Get the modal form elements
    const textArea = document.querySelector("#postForm textarea");
    const photoInput = document.querySelector("#photoInput");
    const videoInput = document.querySelector("#videoInput");
    const submitButton = document.getElementById("submitPost");

    // Function to check if the "Post" button should be enabled
    function checkPostButton() {
        const hasText = textArea.value.trim() !== "";
        const hasImage = photoInput.files.length > 0;
        const hasVideo = videoInput.files.length > 0;

        submitButton.disabled = !(hasText || hasImage || hasVideo);
    }

    // Add event listeners to trigger the check
    textArea.addEventListener("input", checkPostButton); // Check when text is entered
    photoInput.addEventListener("change", checkPostButton); // Check when a photo is selected
    videoInput.addEventListener("change", checkPostButton); // Check when a video is selected

    // Initially check if the button should be enabled or not
    checkPostButton();
});


// helper methods for showin the post
// create post header
function createPostHeader(post) {
    const postHeader = document.createElement('div');
    postHeader.classList.add('post-header');

    const profileImg = document.createElement('img');
    profileImg.classList.add('user-pic');
    profileImg.src = post.pfp ||  '../assets/images/default-profile.jpg';
    profileImg.alt = 'User Profile';

    const userInfo = document.createElement('div');
    const userName = document.createElement('h4');
    userName.classList.add('user-name');
    userName.textContent = post.name;

    const postTime = document.createElement('span');
    postTime.classList.add('post-time');

    // verify the time
    if (post.datetime && !isNaN(new Date(post.datetime))) {
        const formattedDate = formatDate(post.datetime);
        postTime.textContent = formattedDate;
    } else {
        postTime.textContent = 'Invalid date';
    }

    userInfo.appendChild(userName);
    userInfo.appendChild(postTime);
    postHeader.appendChild(profileImg);
    postHeader.appendChild(userInfo);

    return postHeader;
}

// TO DO: adjust the size of the image based on the image size and how many images are on it and the image is clickable and downloadable
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


// Handle image input preview
document.getElementById("photoInput").addEventListener("change", function (event) {
    const files = event.target.files;
    const previewContainer = document.getElementById("imagePreview");
    previewContainer.innerHTML = ""; // Clear previous previews

    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = function (e) {
            addPreviewMedia(e.target.result, previewContainer, "img");
        };
        reader.readAsDataURL(files[i]);
    }
});

// Handle video input preview
document.getElementById("videoInput").addEventListener("change", function (event) {
    const files = event.target.files;
    const previewContainer = document.getElementById("videoPreview");
    previewContainer.innerHTML = ""; // Clear previous previews

    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = function (e) {
            addPreviewMedia(e.target.result, previewContainer, "video");
        };
        reader.readAsDataURL(files[i]);
    }
});

// Function to add media preview (image or video) with removable X button
function addPreviewMedia(src, container, type) {
    const previewWrapper = document.createElement("div");
    previewWrapper.classList.add("position-relative", "d-inline-block", "m-1");

    let previewElement;

    // Create preview element (image or video)
    if (type === "img") {
        previewElement = document.createElement("img");
        previewElement.src = src;
        previewElement.classList.add("img-thumbnail");
        previewElement.style.maxWidth = "100px";
    } else if (type === "video") {
        previewElement = document.createElement("video");
        previewElement.src = src;
        previewElement.classList.add("rounded");
        previewElement.style.maxWidth = "200px";
        previewElement.controls = true;
    }

    // Add an X button to remove the media preview
    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.classList.add("btn-close", "position-absolute", "top-0", "end-0", "m-1");
    closeButton.setAttribute("aria-label", "Remove");
    closeButton.addEventListener("click", () => {
        container.removeChild(previewWrapper);
    });

    // Append elements to the wrapper and container
    previewWrapper.appendChild(previewElement);
    previewWrapper.appendChild(closeButton);
    container.appendChild(previewWrapper);
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
    const commentInput = document.getElementById(`commentInput-${postId}`);
    // Function to toggle the disabled state of the button
    function toggleSubmitButton() {
        const commentText = commentInput.value.trim();
        if (commentText) {
            submitCommentButton.classList.remove("disabled");
            submitCommentButton.disabled = false;
        } else {
            submitCommentButton.classList.add("disabled");
            submitCommentButton.disabled = true;
        }
    }

    // Attach the toggle function to the input event
    commentInput.addEventListener("input", toggleSubmitButton);
    // Initialize the button state when the modal is opened
    toggleSubmitButton();

    // Add an event listener to reset the button state when the modal is shown
    const modal = document.getElementById(`commentModal-${postId}`);
    if (modal) {
        modal.addEventListener("show.bs.modal", toggleSubmitButton);
    }

    // Comment submission handler
    function submitCommentHandler() {
        const commentText = commentInput.value.trim();
        if (commentText.length > 300) {
            showValidationModal("Character Limit Exceeded", "Your comment cannot exceed 300 characters.");
            return; 
        }

        if (commentText) {
            postComment(postId, commentText).then(success => {
                if (success) {
                    commentInput.value = ''; // Clear the comment input
                    toggleSubmitButton(); // Recheck the button state
                }
            });
        }
    }
    // Add event listener 
    if (submitCommentButton) {
        submitCommentButton.removeEventListener("click", submitCommentHandler);
        submitCommentButton.addEventListener("click", submitCommentHandler);
    }
}

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
// end of helper methods

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
// end of helper methods for likes

// validations
function characterValidation(textarea, charLimit) {
    const charCounter = document.createElement('div');
    charCounter.id = 'charCounter';
    charCounter.style.color = '#666';
    charCounter.style.fontSize = '0.9em';
    charCounter.style.marginTop = '5px';
    textarea.parentElement.appendChild(charCounter);

    const updateCharCounter = () => {
        const remaining = charLimit - textarea.value.length;
        charCounter.textContent = `${remaining} characters remaining`;
        charCounter.style.color = remaining < 0 ? 'red' : '#666';
    };

    textarea.addEventListener('input', updateCharCounter);
    updateCharCounter(); 
}

//validate character limit
function characterLimit(text, charLimit) {
    return text.length <= charLimit;
}

function showValidationModal(title, message) {
    const modal = document.createElement('div');
    modal.classList.add('modal', 'fade');
    modal.setAttribute('id', 'validationErrorModal');
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', 'validationErrorModalLabel');
    modal.setAttribute('aria-hidden', 'true');

    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="validationErrorModalLabel">${title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ${message}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    const validationErrorModal = new bootstrap.Modal(modal);
    validationErrorModal.show();
    modal.addEventListener('hidden.bs.modal', () => {
        modal.remove();
    });
}
