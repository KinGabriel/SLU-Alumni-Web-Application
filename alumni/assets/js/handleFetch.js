//handle getting user info
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
    document.querySelector('[name="followers_count"]').innerText = data.followers_count || 0; 
    document.querySelector('[name="followed_count"]').innerText = data.followed_count || 0; 
})
.catch(error => console.error('Error fetching data:', error));

// handle posting
document.querySelector('.modal-footer .btn-primary').addEventListener('click', () => {
    const description = document.querySelector('.modal-body textarea').value;
    const banner = '';  
    const access_type = 'public';
    const post_type = 'normal';

    const postData = {
        description,
        banner,
        access_type,
        post_type
    };

    fetch('/api/postfeed', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',  
            'credentials': 'include'  
        },
        body: JSON.stringify(postData)  
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Post created successfully') {
            alert('Post created successfully!');
            $('#postModal').modal('hide');  
            window.location.reload(); 
        } else {
            alert('Error creating post');
        }
    })
    .catch(error => {
        console.error('Error posting data:', error);
        alert('There was an error while posting.');
    });
});