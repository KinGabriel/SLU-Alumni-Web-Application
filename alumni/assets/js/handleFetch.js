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
        document.querySelector('[name="followers_count"]').innerText = data.followers_count || 0;
        document.querySelector('[name="followed_count"]').innerText = data.followed_count || 0;
    })
    .catch(error => console.error('Error fetching data:', error));
}

// handle get posts of users
function getUserPosts() {
    fetch('/api/getfeed')
        .then(response => response.json())
        .then(data => {
            const posts = data.posts;
            const feedContainer = document.querySelector('.feed');
            feedContainer.innerHTML = '';

            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                // call the helper method which are located in handleHomefeed.js
                const postHeader = createPostHeader(post); 
                const postContent = createPostContent(post); 
                const postActions = createPostActions(post);
                // append
                postElement.appendChild(postHeader);
                postElement.appendChild(postContent);
                postElement.appendChild(document.createElement('hr'));
                postElement.appendChild(postActions);

                feedContainer.appendChild(postElement);
            });
        })
        .catch(err => console.error('Error fetching posts:', err));
}



// Function to handle posting
function handlePostSubmit() {
    const postModalElement = document.getElementById("postModal");
    const successModalElement = document.getElementById("successModal");
    const errorModalElement = document.getElementById("errorModal");

    if (postModalElement && successModalElement && errorModalElement) {
        const postModal = new bootstrap.Modal(postModalElement);
        const successModal = new bootstrap.Modal(successModalElement);
        const errorModal = new bootstrap.Modal(errorModalElement);

        // Trigger modal on post content actions
        const modalTriggerElements = [
            document.querySelector(".post-content textarea"),
            document.querySelector(".post-actions .add-photo"),
            document.querySelector(".post-actions .add-video")
        ];

        modalTriggerElements.forEach(element => {
            if (element) {
                element.addEventListener("click", () => {
                    postModal.show();
                });
            }
        });


        // Handle form submission
        const submitPostButton = document.querySelector('#submitPost');
        if (submitPostButton) {
            submitPostButton.addEventListener('click', () => {
                const description = document.querySelector('.modal-body textarea').value;
                const access_type = 'public';
                const post_type = 'normal';
                const datetime = new Date().toISOString();  // Store datetime in ISO format
            
                // Create a FormData object to handle file uploads (images, videos)
                const formData = new FormData();
                formData.append('description', description);
                formData.append('access_type', access_type);
                formData.append('post_type', post_type);
                formData.append('datetime', datetime);
            
                // Handle image upload for the banner (Photo)
                const imageInput = document.getElementById('photoInput');
                if (imageInput && imageInput.files.length > 0) {
                    Array.from(imageInput.files).forEach(file => {
                        formData.append('images[]', file);  // Add the image files as an array
                    });
                }
            
                // Handle video upload for the banner (Video)
                const videoInput = document.getElementById('videoInput');
                if (videoInput && videoInput.files.length > 0) {
                    Array.from(videoInput.files).forEach(file => {
                        formData.append('videos[]', file);  // Add the video files as an array
                    });
                }
            
                // Send data via fetch
                fetch('/api/postfeed', {
                    method: 'POST',
                    body: formData,  // Send FormData object which includes files and other data
                    credentials: 'include'  // Include credentials for authentication if needed
                })
                .then(response => response.json())
                .then(data => {
                    postModal.hide();  // Hide post modal
            
                    if (data.message === 'Post created successfully') {
                        successModal.show();  // Show success modal
                    } else {
                        errorModal.show();  // Show error modal
                    }
            
                    // Optionally fetch updated user info and posts after posting
                    getUserInfo();
                    getUserPosts();
                })
                .catch(error => {
                    console.error('Error posting data:', error);
                    postModal.hide();  // Hide post modal on error
                    errorModal.show();  // Show error modal
                });
            });
        }

        // Ensure modal backdrops are cleaned up properly when modals are hidden
        const cleanUpBackdrop = () => {
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) {
                backdrop.remove();
            }
            document.body.classList.remove('modal-open');
            document.body.style = '';
        };

        // Clean up backdrop when post, success, or error modals are hidden
        postModalElement.addEventListener('hidden.bs.modal', cleanUpBackdrop);
        successModalElement.addEventListener('hidden.bs.modal', cleanUpBackdrop);
        errorModalElement.addEventListener('hidden.bs.modal', cleanUpBackdrop);

        // Reset form and hide all modals when any modal is hidden
        const resetPage = () => {
            const postTextarea = document.querySelector('.modal-body textarea');
            if (postTextarea) {
                postTextarea.value = '';  // Reset the textarea value
            }

            // Hide all modals (post, success, error)
            successModal.hide();
            errorModal.hide();
            postModal.hide();
        };

        successModalElement.addEventListener('hidden.bs.modal', resetPage);
        errorModalElement.addEventListener('hidden.bs.modal', resetPage);
    }
}



// Call the functions
getUserInfo();
getUserPosts();
handlePostSubmit();
