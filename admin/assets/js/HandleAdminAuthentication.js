  function validateFormAdmin(event) {
      event.preventDefault(); 
      const firstName = document.querySelector('input[name="first-name"]').value.trim();
      const lastName = document.querySelector('input[name="last-name"]').value.trim();
      const email = document.querySelector('input[name="email"]').value.trim();
      const password = document.querySelector('input[name="password"]').value.trim();
      const schoolId = document.querySelector('input[name="school-id"]').value.trim();
      let errorMessage = '';
      const regex = /^\d+$/; 
      if (!firstName || !lastName || !email || !password) {
          errorMessage = 'Please fill out all required fields.';
      } else if (password.length < 6) {
          errorMessage = 'Password must be at least 6 characters long.';
      } else if(!regex.test(schoolId)) {
        errorMessage = 'Invalid School ID! School ID should only consist of digits.';
      }

      if (errorMessage) {
          document.getElementById('modal-message').textContent = errorMessage;
          document.getElementById('modal').style.display = 'block';
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
    if (!firstName || !lastName || !email || !schoolID || !currentOccupation) {
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









    
  

