//  get user info
function getUserInfo() {
    fetch('/api/homefeed', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'credentials': 'include'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const pfpElements = document.querySelectorAll('[name="pfp"]');
        pfpElements.forEach((element) => {
            element.src = data.pfp;
        });
        const nameElements = document.querySelectorAll('[name="name"]');
        for (let i = 0; i < nameElements.length; i++) {
            nameElements[i].innerText = data.name || 'Unknown';
        }
        document.querySelector('[name="bio"]').innerText = data.bio || '';
        document.querySelector('[name="post_count"]').innerText = data.post_count || 0;
        document.querySelector('[name="followers_count"]').innerText = data.follower_count || 0;
        document.querySelector('[name="followed_count"]').innerText = data.followed_count || 0;
    })
    .catch(error => console.error('Error fetching data:', error));
}

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

//handle log out
const logoutBtns = document.getElementsByClassName('logout-btn');
for (let i = 0; i < logoutBtns.length; i++) {
    logoutBtns[i].addEventListener('click', logOut);
}
function logOut() {
    window.location.href = '/api/logout';
}

getUserInfo();