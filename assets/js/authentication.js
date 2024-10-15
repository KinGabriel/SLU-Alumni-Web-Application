function validateForm(event) {
    event.preventDefault();
    const firstName = document.querySelector('input[name="firstName"]').value.trim();
    const lastName = document.querySelector('input[name="lastName"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const schoolID = document.querySelector('input[name="sluSchoolId"]').value.trim();
    const password = document.querySelector('input[name="password"]').value.trim();
    const retypePassword = document.querySelector('input[name="retype_password"]').value.trim();
    const messageContainer = document.querySelector('.validation-message');
    messageContainer.innerHTML = ''; 
    if (!firstName || !lastName || !email || !schoolID || !password || !retypePassword) {
        messageContainer.innerHTML = '<p style="color: red;">All fields are required and cannot be empty or contain only whitespace.</p>';
        return;
    }
    if (password !== retypePassword) {
        messageContainer.innerHTML = '<p style="color: red;">Passwords do not match! Please try again.</p>';
        return;
    }
    document.querySelector("form").submit();
}