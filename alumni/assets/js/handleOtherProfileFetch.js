function getOtherUserInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('user_id');

    if (userId) {
        fetch(`/api/profile-other/get-profile?user_id=${userId}`)
            .then(response => response.json())
            .then(data => {
                // Populate user profile data
                const pfpElements = document.querySelectorAll('[name="otherPfp"]');
                pfpElements.forEach((element) => {
                    element.src = data.pfp;
                });
                const nameElements = document.querySelectorAll('[name="otherUserName"]');
                nameElements.forEach((element) => {
                    element.innerText = data.name || 'Unknown';
                });
                document.querySelector('[name="other_bio"]').innerText = data.bio || '';
                document.querySelector('[name="other_post_count"]').innerText = data.post_count || 0;
                document.querySelector('[name="other_followers_count"]').innerText = data.follower_count || 0;
                document.querySelector('[name="other_followed_count"]').innerText = data.followed_count || 0;

                checkIfFollowing(userId); // verify if is already followed or not
            })
            .catch(error => console.error('Error fetching data:', error));
    } else {
        console.error("User ID not provided in URL.");
    }
}

function checkIfFollowing(targetUserId) {
    fetch(`/api/profile-other/is-following?user_id=${targetUserId}`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        const followButton = document.getElementById("follow-btn");
        const followText = document.getElementById("follow-text");
        const followIcon = document.getElementById("follow-icon");

        if (data.isFollowing) {
            followText.textContent = "Unfollow";
            followIcon.src = "../assets/images/unfollow.png"; 
            followButton.classList.add("following");
        } else {
            followText.textContent = "Follow";
            followIcon.src = "../assets/images/follow.png"; 
            followButton.classList.remove("following");
        }
    })
    .catch(error => console.error('Error:', error));
}

function toggleFollow() {
    const followButton = document.getElementById("follow-btn");
    const followText = document.getElementById("follow-text");
    const followIcon = document.getElementById("follow-icon");

    const isFollowing = followButton.classList.contains("following");
    const urlParams = new URLSearchParams(window.location.search);
    const targetUserId = urlParams.get('user_id');

    if (isFollowing) {
        // Unfollow
        followText.textContent = "Follow";
        followIcon.src = "../assets/images/follow.png"; 
        followButton.classList.remove("following");

        fetch(`/api/profile-other/unfollow?user_id=${targetUserId}`, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ targetUserId }),
        }).then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error('Error:', error));
    } else {
        // Follow
        followText.textContent = "Unfollow";
        followIcon.src = "../assets/images/unfollow.png"; 
        followButton.classList.add("following");

        fetch(`/api/profile-other/follow?user_id=${targetUserId}`, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ targetUserId }),
        }).then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error('Error:', error));
    }
}


getOtherUserInfo()