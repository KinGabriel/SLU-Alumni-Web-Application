
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
    profileImg.src = post.pfp || 'default.jpg';
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

    if (post.banner) {
        const postBanner = document.createElement('img');
        postBanner.classList.add('post-image');
        postBanner.src = post.banner;
        postBanner.alt = 'Post Image';
        postContent.appendChild(postBanner);
    }

    return postContent;
}

//  create post actions
function createPostActions(post) {
    const postActions = document.createElement('div');
    postActions.classList.add('post-actions', 'card-footer', 'd-flex', 'align-items-center');
    const actionsContainer = document.createElement('div');
    actionsContainer.classList.add('d-flex');

    const likeButton = createPostActionButton('Like', 'like.png', post.like_count);
    const commentButton = createPostActionButton('Comment', 'comment.png', post.comment_count);

    actionsContainer.appendChild(likeButton);
    actionsContainer.appendChild(commentButton);
    postActions.appendChild(actionsContainer);

    return postActions;
}

//create action buttons Like and Comment
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