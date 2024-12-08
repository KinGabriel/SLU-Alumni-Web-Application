
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
      });


// helper methods for showin the post
// create post header
function createPostHeader(post) {
    const postHeader = document.createElement('div');
    postHeader.classList.add('post-header');

    const profileImg = document.createElement('img');
    profileImg.classList.add('user-pic');
    profileImg.src = post.pfp || '../assets/images//default-avatar-icon.jpg';
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
            // vid
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
            //image
        } else {
            postBanner = document.createElement('img');
            postBanner.classList.add('post-image');
            postBanner.src = post.banner;
            postBanner.alt = 'Post Image';
        }

        postContent.appendChild(postBanner);
    }

    return postContent;
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
function createPostActions(post) {
    const postActions = document.createElement('div');
    postActions.classList.add('post-actions', 'card-footer', 'd-flex', 'align-items-center');

    const actionsContainer = document.createElement('div');
    actionsContainer.classList.add('d-flex');

    const likeImage = post.is_liked ? 'like.png' : 'grayLike.png';
    const likeButton = createPostActionButton('Like', likeImage, post.like_count);
    const commentButton = createPostActionButton('Comment', 'comment.png', post.comment_count);

    const likeCountElement = likeButton.querySelector('span');

    likeButton.addEventListener('click', function() {
        const isLiked = post.is_liked;
        post.is_liked = !isLiked;  
        handleLike(post.post_id, likeButton, isLiked, likeCountElement);
    });

    // Handle comment button click
    commentButton.addEventListener('click', function() {
        const postId = post.post_id;

        let commentModal = document.getElementById(`commentModal-${postId}`);
        if (!commentModal) {
            commentModal = createCommentModal(postId);
            document.body.appendChild(commentModal);
        }

        // Load comments for the specific post
        loadComments(postId);

        // Initialize and show the modal
        const modal = new bootstrap.Modal(commentModal);
        modal.show();
    });

    // Handle comment submission
    const submitCommentButton = document.getElementById('submitComment');
    if (submitCommentButton) {
        submitCommentButton.addEventListener('click', function() {
            const commentText = document.getElementById('commentInput').value.trim();
            if (commentText) {
                const postId = document.querySelector('.modal').getAttribute('data-post-id');
                submitComment(postId, commentText);
                document.getElementById('commentInput').value = ''; // Clear the input
            }
        });
    }

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
                    <textarea id="commentInput" class="form-control" rows="3" placeholder="Add a comment..."></textarea>
                    <button class="btn btn-primary mt-2" id="submitComment">Submit</button>
                </div>
            </div>
        </div>
    `;

    return modal;
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

// Handle Image Click to View in Modal
document.addEventListener("DOMContentLoaded", () => {
    const postImages = document.querySelectorAll('.post-image');
    
    postImages.forEach(image => {
        image.addEventListener('click', () => {
            const imageUrl = image.src;
            const modalImage = document.getElementById('modalImage');
            const downloadLink = document.getElementById('downloadLink');
            // Set the modal image source
            modalImage.src = imageUrl; 
            // Set the download link
            downloadLink.href = imageUrl; 
          
            const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
            imageModal.show();
        });
    });
});
