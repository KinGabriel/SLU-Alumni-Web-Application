// handle get posts of users
function getUserPosts() {
    fetch('/api/feed/getfeed')
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
                const post_type = 'normal';
                const datetime = new Date().toISOString();  
                const formData = new FormData();
                formData.append('description', description);
                formData.append('post_type', post_type);
                formData.append('datetime', datetime);
            
                const imageInput = document.getElementById('photoInput');
                if (imageInput && imageInput.files.length > 0) {
                    Array.from(imageInput.files).forEach(file => {
                        formData.append('images[]', file);  
                    });
                }
            
               
                const videoInput = document.getElementById('videoInput');
                if (videoInput && videoInput.files.length > 0) {
                    Array.from(videoInput.files).forEach(file => {
                        formData.append('videos[]', file); 
                    });
                }
            
                // Send data via fetch
                fetch('/api/feed/postfeed', {
                    method: 'POST',
                    body: formData,  
                    credentials: 'include'  
                })
                .then(response => response.json())
                .then(data => {
                    postModal.hide();  
            
                    if (data.message === 'Post created successfully') {
                        successModal.show(); 
                    } else {
                        errorModal.show(); 
                    }
            

                    getUserInfo();
                    getUserPosts();
                })
                .catch(error => {
                    console.error('Error posting data:', error);
                    postModal.hide(); 
                    errorModal.show();  
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
function handleLike(postId, likeButton, isLiked, likeCountElement) {
    fetch(`/api/feed/like/${postId}`, {
        method: 'POST',
        credentials: 'include',
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Like added successfully' || data.message === 'Like removed successfully') {
            // Update the like button's icon and like count
            const newIsLiked = updateLikeButton(likeButton, isLiked);  // Toggle the like state and icon
            const newLikeCount = updateLikeCount(likeCountElement, newIsLiked);  // Update the like count
        } else {
            console.error('Unexpected response message:', data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


// Call the functions

getUserPosts();
handlePostSubmit();
