class adduser { 
    constructor(buttonId) {
        this.button = document.getElementById(buttonId);
        this.init();
    }

    // Initialize the event listener
    init() {
        this.button.addEventListener('click', this.redirectToAddUserPage);
    }

  
    redirectToAddUserPage() {
        window.location.href = "../view/Adduser.php";
    }
}
// Create an instance of adduser for the button addUserButton
new adduser('addUserButton');
