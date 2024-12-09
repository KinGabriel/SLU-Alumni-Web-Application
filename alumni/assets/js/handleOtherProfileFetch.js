

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
            })
            .catch(error => console.error('Error fetching data:', error));
    } else {
        console.error("User ID not provided in URL.");
    }
}

getOtherUserInfo()