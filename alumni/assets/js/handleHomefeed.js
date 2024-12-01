
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


// header drop down
function toggleDropdown() {
    const dropdownMenu = document.getElementById("dropdownMenu");
    const isOpen = dropdownMenu.style.display === "block";

    if (isOpen) {
        dropdownMenu.style.display = "none";
        hideDropdown();
    } else {
        dropdownMenu.style.display = "block";
        showDropdown();
    }
}

function showDropdown() {
    function closeDropdown(event) {
        const dropdown = document.getElementById("dropdownMenu");
        const avatar = document.querySelector(".profile-avatar");

        if (!dropdown.contains(event.target) && !avatar.contains(event.target)) {
            dropdown.style.display = "none";
            removeOutsideClickListener(); 
        }
    }

    document.addEventListener("click", closeDropdown);
    document.closeDropdownListener = closeDropdown;
}

function hideDropdown() {
    if (document.closeDropdownListener) {
        document.removeEventListener("click", document.closeDropdownListener);
        delete document.closeDropdownListener;
    }
}
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

//handle log out
const logoutBtns = document.getElementsByClassName('logout-btn');
for (let i = 0; i < logoutBtns.length; i++) {
    logoutBtns[i].addEventListener('click', logOut);
}
function logOut() {
    window.location.href = '/api/logout';
}

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
            const img = document.createElement("img");
            img.src = e.target.result;
            img.classList.add("img-thumbnail", "m-1");
            img.style.maxWidth = "100px"; 
            previewContainer.appendChild(img);
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
            const video = document.createElement("video");
            video.src = e.target.result;
            video.classList.add("m-1");
            video.style.maxWidth = "200px"; 
            video.controls = true; // Enable playback controls
            previewContainer.appendChild(video);
        };
        reader.readAsDataURL(files[i]);
    }
});

//create action buttons Like and Comment
function createPostActions(post) {
    const postActions = document.createElement('div');
    postActions.classList.add('post-actions', 'card-footer', 'd-flex', 'align-items-center');
    const actionsContainer = document.createElement('div');
    actionsContainer.classList.add('d-flex');

    const likeImage = post.is_liked ? 'like.png' : 'grayLike.png';  
    const likeButton = createPostActionButton('Like', likeImage, post.like_count);
    const commentButton = createPostActionButton('Comment', 'comment.png', post.comment_count);

    likeButton.addEventListener('click', function() {
        handleLike(post.post_id, likeButton, post.is_liked);
    });

    actionsContainer.appendChild(likeButton);
    actionsContainer.appendChild(commentButton);
    postActions.appendChild(actionsContainer);

    return postActions;
}

function createPostActionButton(type, icon, count) {
    const button = document.createElement('button');
    button.classList.add('btn', `btn-outline-${type.toLowerCase()}`, 'me-2');
    const iconElement = document.createElement('img');
    iconElement.classList.add('button-icon', 'me-2');
    iconElement.src = `../assets/images/${icon}`;
    iconElement.alt = `${type} Icon`;
    button.appendChild(iconElement);
    button.appendChild(document.createTextNode(`${type} (${count})`));

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
    return date.toLocaleDateString('en-US', options) + ' at ' + date.toLocaleTimeString('en-US', { hour12: true });
}
// end of helper methods