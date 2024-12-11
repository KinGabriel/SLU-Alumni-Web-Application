function updateImageName() {
    const fileInput = document.getElementById('company-logo');
    const fileName = document.getElementById('file-name');
    if (fileInput.files.length > 0) {
        fileName.textContent = fileInput.files[0].name;
    } else {
        fileName.textContent = "No Image chosen";
    }
}

function cancelForm() {
    // Reset form fields
    document.getElementById("news-title").value = "";
    document.getElementById("news-description").value = "";

    // Reset file input
    document.getElementById('company-logo').value = "";

    // Reset file name display
    document.getElementById('file-name').textContent = "No Image chosen";

    // Optionally, you can redirect the user to another page or close the form
    // window.location.href = "your-redirect-url"; // For example, to go back to another page
}
