function validatenewsform(event) {
    event.preventDefault();

    // Get input values
    const newsphoto = document.querySelector('input[name="newsphoto"]');
    const ntitle = document.querySelector('input[name="news-title"]').value.trim();
    const ndescription = document.querySelector('textarea[name="news-description"]').value.trim();

    const modal = document.getElementById('modal');
      const modalImage = document.getElementById('modal-image');
      const modalMessage = document.getElementById('modal-message');

    // Validate inputs
    let isValid = true;
    let errorMessage = '';

    if (!newsphoto.files || newsphoto.files.length === 0) {
        isValid = false;
        errorMessage += 'Please upload a news photo.\n';
    }

    if (ntitle === '') {
        isValid = false;
        errorMessage += 'News title is required.\n';
    }

    if (ndescription === '') {
        isValid = false;
        errorMessage += 'News description is required.\n';
    }

    // Display error or submit form
    if (!isValid) {
        showValidationModal('Error adding news',errorMessage)
        return false;
    }

    // If valid, proceed with form submission
    event.target.closest('form').submit();
}

function handleFileUpload() {
    const fileInput = document.getElementById('newsphoto');
    const uploadText = document.querySelector('.upload-label');
    const imagePreview = document.getElementById('image-preview');
    const msg = document.querySelector('#file-name');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const fileName = file.name;
        uploadText.textContent = `Uploaded: ${fileName}`;
        msg.style.display = 'none';

        // Ensure the selected file is an image
        if (file.type.startsWith('image/')) {
            const fileReader = new FileReader();

            // Load the image preview
            fileReader.onload = function (e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
                imagePreview.style.maxWidth = '100px';
                imagePreview.style.height = 'auto';
                imagePreview.style.marginTop = '10px';
                imagePreview.style.border = '1px solid #ccc';
                imagePreview.style.borderRadius = '4px';
            };

            fileReader.readAsDataURL(file);
        } else {
            showValidationModal('Upload failed','Please upload a valid image file.' )
            resetFileUpload();
        }
    } else {
        resetFileUpload();
    } return;
}

function resetFileUpload() {
    const uploadText = document.querySelector('.upload-label');
    const imagePreview = document.getElementById('image-preview');
    uploadText.textContent = 'Upload a news photo';
    imagePreview.style.display = 'none';
}


function showValidationModal(title, message) {
    const modal = document.createElement('div');
    modal.classList.add('modal', 'fade');
    modal.setAttribute('id', 'validationErrorModal');
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', 'validationErrorModalLabel');
    modal.setAttribute('aria-hidden', 'true');

    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="validationErrorModalLabel">${title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ${message}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    const validationErrorModal = new bootstrap.Modal(modal);
    validationErrorModal.show();
    modal.addEventListener('hidden.bs.modal', () => {
        modal.remove();
    });
}
