function getOwnPosts() {
    fetch('/api/viewProfile/getOwnFeed')
        .then(response => response.json())
        .then(data => {
            const posts = data.posts;
            const feedContainer = document.querySelector('#feed');

            feedContainer.innerHTML = ''; // Clear existing posts

            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post', 'card', 'mt-4'); 

                // Call helper methods
                const postHeader = createPostHeader(post);
                const postContent = createPostContent(post);
                const postActions = createPostActions(post);

                // Append components to the post container
                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');
                cardBody.appendChild(postHeader);
                cardBody.appendChild(postContent);

                postElement.appendChild(cardBody);
                postElement.appendChild(postActions);
                feedContainer.appendChild(postElement);
            });
        })
        .catch(err => console.error('Error fetching posts:', err));
}



function handleLike(postId, likeButton, isLiked, likeCountElement) {
    fetch(`/api/viewProfile/like/${postId}`, {
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

async function deletePost(postId) {
    try {
        const response = await fetch(`/delete/${postId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Failed to delete post with ID ${postId}.`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}
async function editPost(postId, description, mediaFile) {
    const datetime = new Date().toISOString();
    const formData = new FormData();
    formData.append('description', description);
    formData.append('datetime', datetime);

    // Check if the media file is provided
    if (mediaFile) {
        // Check if the file is an image or video
        const fileType = mediaFile.type.split('/')[0];  // 'image' or 'video'

        // Append to the correct field based on the file type
        if (fileType === 'image') {
            formData.append('images[]', mediaFile); // Append to 'images[]' for images
        } else if (fileType === 'video') {
            formData.append('videos[]', mediaFile); // Append to 'videos[]' for videos
        }
    }

    try {
        const response = await fetch(`/api/viewProfile/editPost/${postId}`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to edit the post.');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}


getOwnPosts()