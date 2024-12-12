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
                    element.src = data.pfp || '../assets/images/default-profile.jpg';
                    element.onerror = () => {
                        element.src = '../assets/images/default-profile.jpg';
                    };
                });
                const nameElements = document.querySelectorAll('[name="otherUserName"]');
                nameElements.forEach((element) => {
                    element.innerText = data.name || 'Unknown';
                });
                document.querySelector('[name="other_bio"]').innerText = data.bio || '';
                document.querySelector('[name="other_post_count"]').innerText = data.post_count || 0;
                document.querySelector('[name="other_followers_count"]').innerText = data.follower_count || 0;
                document.querySelector('[name="other_followed_count"]').innerText = data.followed_count || 0;
                document.querySelector('[name="otherCompany"]').innerText = data.company || 'Unemployed';
                // Get the labels
                const privateLabel = document.getElementById("private-label");
                const publicLabel = document.getElementById("public-label");
                
                
                // Hide both labels initially
                privateLabel.style.display = "none";
                publicLabel.style.display = "none";

                if (data.access_type === 'private') {
                    privateLabel.classList.add("show");
                    publicLabel.classList.remove("show");
                } else if (data.access_type === 'public') {
                    publicLabel.classList.add("show");
                    privateLabel.classList.remove("show");
                }

                // Check if the user is following
                checkIfFollowing(userId); 
            })
            .catch(error => console.error('Error fetching data:', error));
    } else {
        console.error("User ID not provided in URL.");
    }
}

// Call the function when the page loads
window.onload = function() {
    getOtherUserInfo();
};

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

let offset = 0;
let isLoading = false;
let hasMorePosts = true;

function getOtherPosts() {
    const urlParams = new URLSearchParams(window.location.search);
    const targetUserId = urlParams.get('user_id');

    if (isLoading || !hasMorePosts) return;

    isLoading = true;

    fetch(`/api/profile-other/get-post?user_id=${targetUserId}&offset=${offset}`)
        .then(response => response.json())
        .then(data => {
            const posts = data.posts;
            const feedContainer = document.querySelector('#feed');

            if (!feedContainer) {
                console.error('Feed container not found in the DOM.');
                return;
            }

            if (posts.length === 0) {
                hasMorePosts = false; 
                return;
            }

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

            showMedia(data);  // Pass data to showMedia to update the media tab
            showVideos(data); // Pass data to showVideo to update the video tab
            
            offset += posts.length;
            isLoading = false;
        })
        .catch(err => {
            console.error('Error fetching posts:', err);
            isLoading = false;
        });
}

async function showMedia(data) {
    const mediaContainer = document.querySelector('#media .container .row');
    mediaContainer.innerHTML = '';  // Clear previous media content

    // Loop through the posts to check for images
    for (const post of data.posts) {
        // Check if the banner exists and is a valid image URL
        if (post.banner && await isValidImage(post.banner)) {
            console.log("Image found:", post.banner);

            // Create a new column div for the image card
            const imageCard = document.createElement('div');
            imageCard.classList.add('col-md-4', 'mb-4');  
            
            // Card element
            const card = document.createElement('div');
            card.classList.add('image-card', 'card');
            card.style.width = '100%';
            card.style.maxWidth = '350px';
            card.style.borderRadius = '8px';
            card.style.overflow = 'hidden';
            card.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            card.style.marginBottom = '1rem';
            
            card.addEventListener('mouseover', () => {
                card.style.transform = 'scale(1.05)';
                card.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
            });
            card.addEventListener('mouseout', () => {
                card.style.transform = 'scale(1)';
                card.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            });
            
            // Image element
            const img = document.createElement('img');
            img.src = post.banner;
            img.alt = 'Post Image';
            img.style.width = '100%';
            img.style.height = '350px';  
            img.style.objectFit = 'cover'; 
            img.style.borderBottom = '2px solid #ddd';  
            
            // Append the image to the card
            card.appendChild(img);
            
            // Card body
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
            cardBody.style.padding = '1rem';
            cardBody.style.backgroundColor = '#f8f8f8';
            cardBody.style.flexGrow = '1';  
            
            // Buttons container
            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('d-flex', 'justify-content-between');
            
            const likeImage = post.is_liked ? 'like.png' : 'grayLike.png';
            const likeButton = createPostActionButton('Like', likeImage, post.like_count);
            const commentButton = createPostActionButton('Comment', 'comment.png', post.comment_count);
        
            const likeCountElement = likeButton.querySelector('span');
        
            // Like button functionality
            likeButton.addEventListener('click', function() {
                const isLiked = post.is_liked;
                post.is_liked = !isLiked;
                handleLike(post.post_id, likeButton, isLiked, likeCountElement);
            });
        
            // Append buttons to the button container
            buttonContainer.appendChild(likeButton);
            buttonContainer.appendChild(commentButton);
            
            // Append the button container to the card body
            cardBody.appendChild(buttonContainer);
            
            // Append the card body to the card
            card.appendChild(cardBody);
            
            // Append the card to the column
            imageCard.appendChild(card);

            // Append the column to the media container
            mediaContainer.appendChild(imageCard);

            
           
            // Comment button functionality
            commentButton.addEventListener('click', function() {
                const postId = post.post_id;

                let commentModal = document.getElementById(`commentModal-${postId}`);
                if (!commentModal) {
                    commentModal = createCommentModal(postId);
                    document.body.appendChild(commentModal);
                }

                loadComments(postId); // Load existing comments for the post
                const modal = new bootstrap.Modal(commentModal);
                modal.show();

                // Ensure the submit comment handler is set only once
                setupSubmitCommentHandler(postId);
            });
        } else {
            console.log("No valid image found or banner is missing:", post.banner); 
        }
    }
}

// Function to validate if the URL is an actual image
function isValidImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(true);  // Image loaded successfully
        img.onerror = () => resolve(false); // Error loading image, resolve as false

        img.src = url;
    });
}

async function showVideos(data) {
    const videoContainer = document.querySelector('#videos-row'); // Updated selector
    videoContainer.innerHTML = ''; // Clear previous video content

    // Loop through the posts to check for video URLs
    for (const post of data.posts) {
        // Check if the post has a valid video URL
        if (post.banner && await isValidVideo(post.banner)) {
            console.log("Video found:", post.banner);

            // Create a new column div for the video card
            const videoCard = document.createElement('div');
            videoCard.classList.add('col-md-4', 'mb-4');

            // Card element
            const card = document.createElement('div');
            card.classList.add('video-card', 'card');
            card.style.width = '100%';
            card.style.maxWidth = '350px';
            card.style.borderRadius = '8px';
            card.style.overflow = 'hidden';
            card.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            card.style.marginBottom = '1rem';

            card.addEventListener('mouseover', () => {
                card.style.transform = 'scale(1.05)';
                card.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
            });
            card.addEventListener('mouseout', () => {
                card.style.transform = 'scale(1)';
                card.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            });

            // Video element
            const video = document.createElement('video');
            video.src = post.banner;
            video.controls = true;
            video.style.width = '100%';
            video.style.height = '350px';
            video.style.objectFit = 'cover';

            // Append the video to the card
            card.appendChild(video);

            // Card body
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
            cardBody.style.padding = '1rem';
            cardBody.style.backgroundColor = '#f8f8f8';
            cardBody.style.flexGrow = '1';

            // Buttons container
            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('d-flex', 'justify-content-between');

            const likeImage = post.is_liked ? 'like.png' : 'grayLike.png';
            const likeButton = createPostActionButton('Like', likeImage, post.like_count);
            const commentButton = createPostActionButton('Comment', 'comment.png', post.comment_count);

            const likeCountElement = likeButton.querySelector('span');

            // Like button functionality
            likeButton.addEventListener('click', function() {
                const isLiked = post.is_liked;
                post.is_liked = !isLiked;
                handleLike(post.post_id, likeButton, isLiked, likeCountElement);
            });

            // Append buttons to the button container
            buttonContainer.appendChild(likeButton);
            buttonContainer.appendChild(commentButton);

            // Append the button container to the card body
            cardBody.appendChild(buttonContainer);

            // Append the card body to the card
            card.appendChild(cardBody);

            // Append the card to the column
            videoCard.appendChild(card);

            // Append the column to the media container
            videoContainer.appendChild(videoCard);

            // Comment button functionality
            commentButton.addEventListener('click', function() {
                const postId = post.post_id;

                let commentModal = document.getElementById(`commentModal-${postId}`);
                if (!commentModal) {
                    commentModal = createCommentModal(postId);
                    document.body.appendChild(commentModal);
                }

                loadComments(postId); // Load existing comments for the post
                const modal = new bootstrap.Modal(commentModal);
                modal.show();

                // Ensure the submit comment handler is set only once
                setupSubmitCommentHandler(postId);
            });
        } else {
            console.log("No valid image found or banner is missing:", post.banner); 
        }
    }
}
// Function to validate if the URL is an actual video
function isValidVideo(url) {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.oncanplay = () => resolve(true);  // Video loaded successfully
        video.onerror = () => resolve(false); // Error loading video, resolve as false

        video.src = url;
    });
}

window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || window.pageYOffset;
    const clientHeight = window.innerHeight;

    if (scrollHeight - scrollTop - clientHeight <= 50 && hasMorePosts && !isLoading) {
        getOtherPosts();
    }
});
;



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