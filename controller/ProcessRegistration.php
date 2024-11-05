<?php
require_once '../database/Configuration.php';
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = isset($_POST["email"]) ? $_POST["email"] : '';
    $password = isset($_POST["password"]) ? $_POST["password"] : '';
    $retypePassword = isset($_POST["retypePassword"]) ? $_POST["retypePassword"] : '';
    $firstName = isset($_POST["firstName"]) ? $_POST["firstName"] : '';
    $lastName = isset($_POST["lastName"]) ? $_POST["lastName"] : '';
    $schoolID = isset($_POST["sluSchoolId"]) ? $_POST["sluSchoolId"] : '';
    $program = isset($_POST["program"]) ? $_POST["program"] : '';
    $gradYear = isset($_POST["graduationYear"]) ? $_POST["graduationYear"] : '';
    $db = new dbConnection();
    $connection = $db->getConnection(); 
      // Check if email exist
      if(isEmailExist($connection, $email)) {
        $_SESSION['formData'] = $_POST;
        $_SESSION['confirmation_message'] = "Account already exist";
        header("Location: ../view/Register.php");
        exit();
    }
    // Check if their is already an existing application
    if(checkApplicant( $connection, $email )) {
        $_SESSION['formData'] = $_POST;
        $_SESSION['confirmation_message'] = "Already have an existing application!";
        header("Location: ../view/Register.php");
        exit();
    }
    // check if their is an existing school id
    if(isAlumniExist($connection,$schoolID)) {
        $_SESSION['formData'] = $_POST;
        $_SESSION['confirmation_message'] = "Alumni already exist... ";
        header("Location: ../view/Register.php");
        return;
    }
  // Check if their is already an existing application by school ID
    if(checkApplicantById( $connection, $schoolID )) {
        $_SESSION['formData'] = $_POST;
        $_SESSION['confirmation_message'] = "Already have an existing application!";
        header("Location: ../view/Register.php");
        exit();
    }

      // Check if a file was uploaded
      $idImage = '';
      if (isset($_FILES['schoolIdFile']) && $_FILES['schoolIdFile']['error'] === UPLOAD_ERR_OK) { 
          $fileTmpPath = $_FILES['schoolIdFile']['tmp_name'];
          $fileName = uniqid() . '-' . basename($_FILES['schoolIdFile']['name']);
          // construct the file path for the image which where it will be stored to fetch by the db in the query
          $idImage = '../assets/uploads/' . $fileName; 
          // Move the picture to the directory
          if (!move_uploaded_file($fileTmpPath, $idImage)) {
              $_SESSION['formData'] = $_POST;
              $_SESSION['confirmation_message'] = "File upload failed.";
              header("Location: ../view/Register.php");
              exit();
          }
        }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $query = "INSERT INTO applicants (school_id, email, fname, lname, pword, program, gradyear, school_id_pic) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $connection->prepare($query);
    if ($stmt === false) {
        $_SESSION['confirmation_message'] = "Error preparing statement: " . $connection->error;
        header("Location: ../view/Register.php");
        exit();
    }

    $stmt->bind_param("ssssssss", $schoolID, $email, $firstName, $lastName, $hashedPassword, $program, $gradYear, $idImage);
    if ($stmt->execute()) {
        $_SESSION['confirmation_message'] = "Successfully sent your request! Please wait for the admin reviewal.";
    } else {
        $_SESSION['confirmation_message'] = "Error occurred! Please try again later... " . $stmt->error;
    }
    $stmt->close();
    header("Location: ../view/Register.php");
    exit();
}

function isEmailExist($connection, $email) {
    $query = "SELECT * FROM user WHERE email = ?"; 
    $stmt = $connection->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->num_rows > 0; 
}
function checkApplicant($connection, $email) {
    $query = "SELECT * FROM applicants WHERE email = ?"; 
    $stmt = $connection->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        return true; 
    }
    $row = $result->fetch_assoc(); 
        if ($row['is_verified']) {
            return true;
        }
        return false;
}

function checkApplicantById($connection, $email) {
    $query = "SELECT * FROM applicants WHERE school_id = ?"; 
    $stmt = $connection->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        return true; 
    }
    $row = $result->fetch_assoc(); 
        if ($row['is_verified']) {
            return true;
        }
        return false;
}
function isAlumniExist($connection, $schoolID) {
    $query = "SELECT * FROM alumni WHERE school_id = ?"; 
    $stmt = $connection->prepare($query);
    $stmt->bind_param("s", $schoolID);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->num_rows > 0; 
}
?>
