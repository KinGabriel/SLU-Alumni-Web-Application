  function validateFormAdmin(event) {
      event.preventDefault(); 
      const firstName = document.querySelector('input[name="first-name"]').value.trim();
      const lastName = document.querySelector('input[name="last-name"]').value.trim();
      const middleName = document.querySelector('input[name="middle-name"]').value.trim();
      const email = document.querySelector('input[name="email"]').value.trim();
      const password = document.querySelector('input[name="password"]').value.trim();
      const rpassword = document.querySelector('input[name="retype_password"]').value.trim();
      const schoolId = document.querySelector('input[name="school-id"]').value.trim();
      const gradyear = document.querySelector('input[name="graduationYear"]').value.trim();
      const school = document.querySelector('select[name="school"]').value.trim();
      const program = document.querySelector('select[name="program"]').value.trim();
      
      const modal = document.getElementById('modal');
      const modalImage = document.getElementById('modal-image');
      const modalMessage = document.getElementById('modal-message');

      const regex = /^\d+$/; 
      let errorMessages = []; // Collect all error messages

        // Validation logic
        if (!firstName) errorMessages.push('First name is required.');
        if (!lastName) errorMessages.push('Last name is required.');
        if (!email) errorMessages.push('Email is required.');
        if (!password) errorMessages.push('Password is required.');
        if (password.length < 6) errorMessages.push('Password must be at least 6 characters long.');
        if (password !== rpassword) errorMessages.push('Passwords should match each other.');
        if (schoolId && !regex.test(schoolId)) errorMessages.push('Invalid School ID! School ID should only consist of digits.');
        if (!school) errorMessages.push('Please select a school.');
        if (!program) errorMessages.push('Please select a program.');

        // Display error messages
        if (errorMessages.length > 0) {
            modalImage.src ="../assets/images/declineUser.png";
            const errorList = document.createElement('ul');
                errorMessages.forEach(msg => {
                    const listItem = document.createElement('li');
                    listItem.textContent = msg;
                    errorList.appendChild(listItem);
                });

            // Update modal message with the list
            modalMessage.innerHTML = ''; // Clear previous content
            modalMessage.appendChild(errorList);

            errorList.style.textAlign = 'center';
            errorList.style.listStyle = 'none';
            errorList.style.fontSize = 'calc(50% + 1vw)';
            modal.style.display = 'block';
            return;
        }

      event.target.submit();
  }
  function validateEdit(event) {
    event.preventDefault();
    
    const firstName = document.querySelector('input[name="first-name"]').value.trim();
    const lastName = document.querySelector('input[name="last-name"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const schoolID = document.querySelector('input[name="school-id"]').value.trim();
    const currentOccupation = document.querySelector('select[name="status"]').value;
    const messageContainer = document.getElementById('modal-message'); 
    const modal = document.getElementById('modal');  // Reference to the modal
    messageContainer.innerHTML = '';  // Clear previous messages
    
    // Check for empty fields
    if (!firstName || !lastName || !email || !currentOccupation) {
        const createMessage = document.createElement('p');
        createMessage.innerHTML = 'Please fill out all required fields.';
        messageContainer.appendChild(createMessage);
        modal.style.display = 'block';  // Show the modal
        return;
    }

    // Check if School ID is 7 digits
    if (schoolID.length !== 7) { 
        var createMessage = document.createElement('p');
        createMessage.innerHTML = 'School ID should be 7 digits long';
        messageContainer.appendChild(createMessage);
        modal.style.display = 'block';  
        return;
    }

    // Check if School ID consists of digits
    const regex = /^\d+$/; 
    if (!regex.test(schoolID)) {
        const createMessage = document.createElement('p');
        createMessage.innerHTML = 'Invalid School ID! School ID should only consist of digits.';
        messageContainer.appendChild(createMessage);
        modal.style.display = 'block';  
        return;
    }

    // If validation passed, submit the form
    document.querySelector("form").submit();
}









    
  

