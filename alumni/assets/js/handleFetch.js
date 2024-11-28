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

// Handle posting
// Initialize modals
const postModalElement = document.getElementById("postModal");
const successModalElement = document.getElementById("successModal");
const errorModalElement = document.getElementById("errorModal");

if (postModalElement && successModalElement && errorModalElement) {
    const postModal = new bootstrap.Modal(postModalElement);
    const successModal = new bootstrap.Modal(successModalElement);
    const errorModal = new bootstrap.Modal(errorModalElement);

    // Add event listeners to modal trigger buttons
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

    // Submit post action
    const submitPostButton = document.querySelector('#submitPost');
    if (submitPostButton) {
        submitPostButton.addEventListener('click', () => {
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

            console.log(postData);

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
                postModal.hide();  // Hide post modal

                if (data.message === 'Post created successfully') {
                    successModal.show();  // Show success modal
                } else {
                    errorModal.show();  // Show error modal
                }
            })
            .catch(error => {
                console.error('Error posting data:', error);
                postModal.hide();  
                errorModal.show();  
            });
        });
    }

    // Ensure backdrops are cleaned up properly
    const cleanUpBackdrop = () => {
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
            backdrop.remove();
        }
        document.body.classList.remove('modal-open');
        document.body.style = ''; // Remove inline styles added by Bootstrap
    };

    // Reset modals and backdrop when postModal is closed
    postModalElement.addEventListener('hidden.bs.modal', cleanUpBackdrop);
    successModalElement.addEventListener('hidden.bs.modal', cleanUpBackdrop);
    errorModalElement.addEventListener('hidden.bs.modal', cleanUpBackdrop);

    // Reset page after modals are closed
    const resetPage = () => {
        // Clear the input field in Post Modal
        const postTextarea = document.querySelector('.modal-body textarea');
        if (postTextarea) {
            postTextarea.value = '';  // Clear textarea value
        }

        // Hide any other modals in case they're open
        successModal.hide();
        errorModal.hide();
        postModal.hide();
    };

    // Attach additional `hidden` events to reset state
    successModalElement.addEventListener('hidden.bs.modal', resetPage);
    errorModalElement.addEventListener('hidden.bs.modal', resetPage);
}
