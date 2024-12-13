let offset = 0;
let isLoading = false;
let hasMorePosts = true;

function getUserPosts() {
    if (isLoading || !hasMorePosts) return; 

    isLoading = true; 

    fetch(`/api/feed/getfeed?offset=${offset}`)
        .then(response => response.json())
        .then(data => {
            const posts = data.posts;
            const feedContainer = document.querySelector('.feed');

            if (posts.length === 0) {
                hasMorePosts = false;
                return;
            }

            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                const postHeader = createPostHeader(post); 
                const postContent = createPostContent(post); 
                const postActions = createPostActions(post);
                postElement.appendChild(postHeader);
                postElement.appendChild(postContent);
                postElement.appendChild(document.createElement('hr'));
                postElement.appendChild(postActions);

                feedContainer.appendChild(postElement);
            });

            offset += posts.length;
            isLoading = false; 
        })
        .catch(err => {
            console.error('Error fetching posts:', err);
            isLoading = false; 
        });
}

window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight; 
    const scrollTop = window.scrollY || window.pageYOffset; 
    const clientHeight = window.innerHeight; 
    if (scrollHeight - scrollTop - clientHeight <= 50 && hasMorePosts && !isLoading) {
        getUserPosts();
        getUserInfo();
    }
    
});



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
                const description = document.querySelector('#postForm textarea').value.trim();
                const post_type = 'normal'; 
                const formData = new FormData();
                console.log(description)
                formData.append('description', description);
                formData.append('post_type', post_type);
            
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

function loadComments(postId) {
    const commentsList = document.getElementById(`commentsList-${postId}`);
    commentsList.innerHTML = ''; // Clear previous comments

    fetch(`/api/feed/getComments/${postId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }
            return response.json();
        })
        .then(comments => {
            comments.forEach(comment => {
                const commentDiv = document.createElement('div');
                commentDiv.classList.add('comment');
                
                // Create the profile image element
                const profileImage = document.createElement('img');
                profileImage.src = comment.pfp || '../assets/images/default-profile.jpg'; // Default image if no profile picture
                profileImage.alt = 'Profile';
                profileImage.classList.add('comment-pic');
                
                // Create the paragraph for the comment text
                const commentText = document.createElement('p');
                commentText.classList.add('comment-text');
                
                // Create the strong tag for name
                const nameTag = document.createElement('strong');
                nameTag.textContent = comment.name;
                
                // Create the comment message text
                const commentMessageText = document.createTextNode(`: ${comment.comment_message} `);
                
                // Create the span for the date
                const dateTag = document.createElement('span');
                dateTag.classList.add('comment-date');
                const formattedDate = formatDate(comment.date);  // Assuming formatDate is defined elsewhere
                dateTag.textContent = `(${formattedDate})`;  // Adding parentheses around the date
                
                // Append name, comment, and date to the comment text
                commentText.appendChild(nameTag);
                commentText.appendChild(commentMessageText);
                commentText.appendChild(dateTag);

                // Append the profile image and comment text to the comment div
                commentDiv.appendChild(profileImage);
                commentDiv.appendChild(commentText);

                // Append the comment div to the comments list
                commentsList.appendChild(commentDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching comments:', error);
            commentsList.innerHTML = '<p>Failed to load comments. Please try again later.</p>';
        });
}


async function postComment(postId, commentText) {
    const response = await fetch('/api/feed/send-comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            post_id: postId,
            comment_message: commentText,
        })
    });

    if (!response.ok) {
        console.error('Error posting comment:', response.status, await response.text());
        return false;
    }

    const result = await response.json();
    if (result.success) {
        loadComments(postId);
    }
    return result.success;
}



getUserPosts();
handlePostSubmit();



