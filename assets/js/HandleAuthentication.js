/* regitration validation */
function validateForm(event) {
    event.preventDefault();
    const firstName = document.querySelector('input[name="firstName"]').value.trim();
    const lastName = document.querySelector('input[name="lastName"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const schoolID = document.querySelector('input[name="sluSchoolId"]').value.trim();
    const password = document.querySelector('input[name="password"]').value.trim();
    const retypePassword = document.querySelector('input[name="retype_password"]').value.trim();
    const schoolIdFile = document.querySelector('input[name="schoolIdFile"]');
    const messageContainer = document.getElementById('validation-message');
    messageContainer.innerHTML = ''; 
    if(emptyField(firstName, lastName, email, schoolID, password, retypePassword,schoolIdFile)){
            return
    } 
    if (invalidPasswordLength(password)) {
        return;
    }
     if (passwordNotMatch(password,retypePassword)) {
        return
    }
        document.querySelector("form").submit();
}

function emptyField(firstName, lastName, email, schoolID, password, retypePassword, schoolIdFile) {
    const messageContainer = document.getElementById('validation-message');
    if (!firstName || !lastName || !email || !schoolID || !password || !retypePassword) {
        var createMessage = document.createElement('p');
        createMessage.innerHTML = 'All fields are required and cannot be empty or contain only whitespace.';
        createMessage.style.color = 'red';
        messageContainer.appendChild(createMessage);
        return true; 
    }
    if (!schoolIdFile.files.length) {
        var createMessage = document.createElement('p');
        createMessage.innerHTML = 'Please upload your school ID.';
        createMessage.style.color = 'red';
        messageContainer.appendChild(createMessage);
        return true; 
    }
    return false;
}


 function passwordNotMatch(password,retypePassword){
    const messageContainer = document.getElementById('validation-message');
    if (password !== retypePassword) {
        var createMessage = document.createElement('p');
        createMessage.innerHTML = 'Passwords do not match! Please try again.';
        createMessage.style.color = 'red';
        messageContainer.appendChild(createMessage);
        return true; 
    }
    return false;
 }

 function invalidPasswordLength(password){
    const messageContainer = document.getElementById('validation-message');
        if(password.length < 6){
            var createMessage = document.createElement('p');
            createMessage.innerHTML = 'Password must be at least 6 characters';
            createMessage.style.color = 'red';
            messageContainer.appendChild(createMessage);
            return true;
        }
    return false;
 }
/* Registration File handlin */
 function handleFileUpload() {
    const fileInput = document.getElementById('school_id_file');
    const uploadText = document.querySelector('.upload-text');
    const imagePreview = document.getElementById('image-preview');
  
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const fileName = file.name;
        uploadText.textContent = `Uploaded: ${fileName}`;
  
        const fileReader = new FileReader();
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
        uploadText.textContent = 'Upload your school ID';
        imagePreview.style.display = 'none';
    }
  }

  function validateFormAdmin(event) {
    event.preventDefault(); 
    const firstName = document.querySelector('input[name="first-name"]').value.trim();
    const lastName = document.querySelector('input[name="last-name"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const password = document.querySelector('input[name="password"]').value.trim();
    const schoolId = document.querySelector('input[name="school-id"]').value.trim();
    const role = document.querySelector('input[name="role"]').value.trim();

    if (!firstName || !lastName || !email || !password) {
      
        return; 
    }
 
    if (password.length < 6) {
  
        return; 
    }

    

   // event.target.submit();
}




    
  

