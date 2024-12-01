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

getUserInfo();