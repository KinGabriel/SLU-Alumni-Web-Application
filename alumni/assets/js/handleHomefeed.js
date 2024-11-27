
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
