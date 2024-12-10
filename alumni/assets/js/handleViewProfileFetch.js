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
        const response = await fetch(`/api/viewProfile/deletePost/${postId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete the post.');
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

    if (mediaFile && mediaFile.type) {

        const fileType = mediaFile.type.split('/')[0]; 

        if (fileType === 'image') {
            formData.append('images[]', mediaFile); 
        } else if (fileType === 'video') {
            formData.append('videos[]', mediaFile); 
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
                profileImage.src = comment.pfp || '../assets/images/candy.jpg'; // Default image if no profile picture
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
    return result.success; // Assuming the response contains { success: true/false }
}



getOwnPosts()