// passwordToggle.js
document.addEventListener("DOMContentLoaded", function () {
    const togglePasswordButtons = document.querySelectorAll(".toggle-password");
  
    togglePasswordButtons.forEach(button => {
      button.addEventListener("click", function () {
        const passwordInput = this.previousElementSibling; // The input element
        const eyeIcon = this.querySelector(".eye-icon"); // The eye icon
  
        if (passwordInput.type === "password") {
          passwordInput.type = "text"; // Show password
          eyeIcon.src = "../assets/images/eye-icon-open.png"; // Change to open-eye icon
          eyeIcon.alt = "Hide Password";
        } else {
          passwordInput.type = "password"; // Hide password
          eyeIcon.src = "../assets/images/eye-icon-closed.png"; // Change to closed-eye icon
          eyeIcon.alt = "Show Password";
        }
      });
    });
  });
  