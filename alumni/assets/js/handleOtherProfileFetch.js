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

                 // Toggle "Private Account" visibility
                 const privateLabel = document.getElementById("private-label");
                 if (data.isPrivate) {
                     privateLabel.style.display = "flex"; 
                 } else {
                     privateLabel.style.display = "none"; 
                 }
                 
                checkIfFollowing(userId); 
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
            followButton.classList.remove("requested");
        } else if (data.isRequested) {
            followText.textContent = "Requested";
            followIcon.src = "../assets/images/requested.png"; 
            followButton.classList.add("requested");
            followButton.classList.remove("following");
        } else {
            followText.textContent = "Follow";
            followIcon.src = "../assets/images/follow.png"; 
            followButton.classList.remove("following");
            followButton.classList.remove("requested");
        }
    })
    .catch(error => console.error('Error:', error));
}
function toggleFollow() {
    const followButton = document.getElementById("follow-btn");
    const followText = document.getElementById("follow-text");
    const followIcon = document.getElementById("follow-icon");

    // Element for followers count
    const followersCountElement = document.querySelector('p[name="other_followers_count"]');
    let followersCount = parseInt(followersCountElement.textContent, 10);

    const isFollowing = followButton.classList.contains("following");
    const urlParams = new URLSearchParams(window.location.search);
    const targetUserId = urlParams.get('user_id');

    // Fetch the current follow status to check if the request is pending
    fetch(`/api/profile-other/is-following?user_id=${targetUserId}`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        if (data.isRequested) {
            // If the follow request is pending, treat it like "unfollow" action
            followText.textContent = "Follow";
            followIcon.src = "../assets/images/follow.png"; 
            followButton.classList.remove("requested");
            followButton.classList.remove("following");

            followersCount = Math.max(0, followersCount - 1); 
            followersCountElement.textContent = followersCount;

            fetch(`/api/profile-other/unfollow?user_id=${targetUserId}`, {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ targetUserId }),
            }).then(response => response.json())
              .then(data => console.log(data))
              .catch(error => {
                  console.error('Error:', error);
                  followersCountElement.textContent = followersCount + 1;
              });

            return; 
        }

        if (data.isPrivate) {
            followText.textContent = "Requested";
            followIcon.src = "../assets/images/requested.png"; 
            followButton.classList.add("requested");
            followButton.classList.remove("following");
            followersCountElement.textContent = followersCount;
            fetch(`/api/profile-other/follow?user_id=${targetUserId}`, {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ targetUserId }),
            }).then(response => response.json())
              .then(data => console.log(data))
              .catch(error => {
                  console.error('Error:', error);
              });

        } else if (isFollowing) {
            followText.textContent = "Follow";
            followIcon.src = "../assets/images/follow.png"; 
            followButton.classList.remove("following");
            followersCount = Math.max(0, followersCount - 1); 
            followersCountElement.textContent = followersCount;

            fetch(`/api/profile-other/unfollow?user_id=${targetUserId}`, {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ targetUserId }),
            }).then(response => response.json())
              .then(data => console.log(data))
              .catch(error => {
                  console.error('Error:', error);
                  followersCountElement.textContent = followersCount + 1;
              });
        } else {
            followText.textContent = "Unfollow";
            followIcon.src = "../assets/images/unfollow.png"; 
            followButton.classList.add("following");

            followersCount += 1;
            followersCountElement.textContent = followersCount;

            fetch(`/api/profile-other/follow?user_id=${targetUserId}`, {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ targetUserId }),
            }).then(response => response.json())
              .then(data => console.log(data))
              .catch(error => {
                  console.error('Error:', error);
                  followersCountElement.textContent = followersCount - 1;
              });
        }
    })
    .catch(error => {
        console.error('Error checking follow status:', error);
    });
}





function getOtherPosts() {
    const urlParams = new URLSearchParams(window.location.search);
    const targetUserId = urlParams.get('user_id');

    fetch(`/api/profile-other/get-post?user_id=${targetUserId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const feedContainer = document.querySelector('#feed');

            if (!feedContainer) {
                console.error('Feed container not found in the DOM.');
                return;
            }

            feedContainer.innerHTML = ''; // Clear existing posts

            const posts = data.posts;
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post', 'card', 'mt-4');

                const postHeader = createPostHeader(post);
                const postContent = createPostContent(post);
                const postActions = createPostActions(post);

                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');
                cardBody.appendChild(postHeader);
                cardBody.appendChild(postContent);

                postElement.appendChild(cardBody);
                postElement.appendChild(postActions);
                feedContainer.appendChild(postElement);
            });
        })
        .catch(err => {
            console.error('Error fetching posts:', err);
        });
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




getOtherUserInfo()
getOtherPosts()