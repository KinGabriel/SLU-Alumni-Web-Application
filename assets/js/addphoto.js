
document.getElementById('upload-photo').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file) {
        reader.onload = function(e) {
            document.getElementById('profile-photo').src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        document.getElementById('profile-photo').src = '/assets/images/default-avatar.png';
    }
});

document.querySelector('.clear-button').addEventListener('click', function() {

    document.getElementById('profile-photo').src = '/assets/images/default-avatar.png';

    document.getElementById('upload-photo').value = ''; 
}); 
