<?php
require '../../database/Configuration.php';
require '../controller/HandleSession.php';
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data with proper handling for potential empty fields
    $user_id = isset($_POST["user_id"]) ? $_POST["user_id"] : "";
    $email = isset($_POST["email"]) ? $_POST["email"] : '';
    $firstName = isset($_POST["first-name"]) ? $_POST["first-name"] : '';
    $lastName = isset($_POST["last-name"]) ? $_POST["last-name"] : '';
    $school = isset($_POST["school"]) ? $_POST["school"] : '';
    $program = isset($_POST["program"]) ? $_POST["program"] : ''; 
    $schoolID = isset($_POST["school-id"]) ? $_POST["school-id"] : ''; 
    $gradYear = isset($_POST["graduation-year"]) ? $_POST["graduation-year"] : '';    
    $jobStatus = isset($_POST['status']) ? $_POST['status'] : '';
    $userType = isset($_POST['user_type']) ? $_POST['user_type'] : '';
    $pfp = '';

    // Handle file upload if it exists
    if (isset($_FILES['pfp']) && $_FILES['pfp']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['pfp']['tmp_name'];
        $pfp = file_get_contents($fileTmpPath); 
        if ($pfp === false) {
            $_SESSION['confirmation-message'] = "Failed to read the uploaded file.";
            header("Location: ../view/EditUser.php?user_id=" . $user_id);
            exit();
        }        
    }

    $db = new dbConnection();
    $connection = $db->getConnection(); 

    // Handle alumni-specific validation
    if ($userType == 'alumni') {
        if (empty($schoolID) || empty($gradYear) || empty($jobStatus)) {
            $_SESSION['confirmation-message'] = "Please insert all fields...";
            header("Location: ../view/EditUser.php?user_id=" . $user_id);
            return;
        }

        if (isAlumniExist($connection, $schoolID,$user_id)) {
            $_SESSION['confirmation-message'] = "Alumni already exists...";
            header("Location: ../view/EditUser.php?user_id=" . $user_id);
            return;
        }

        if (strlen($schoolID) != 7) {
            $_SESSION['confirmation-message'] = "School ID should be 7 digits long...";
            header("Location: ../view/EditUser.php?user_id=" . $user_id);
            return;
        }
    }

    // Handle job status logic
    if ($jobStatus == 'employed' || $userType == 'admin') {
        $jobStatus = '1';
    } elseif ($jobStatus == 'unemployed' || $jobStatus == 'N/A') {
        $jobStatus = '0';
    } else {
        $jobStatus = '0'; 
    }

    // Update user table
    $queryUser = "UPDATE user SET email = ?, fname = ?, lname = ?, pfp = ?, is_employed = ? WHERE user_id = ?";
    $stmt = $connection->prepare($queryUser);

    if ($stmt === false) {
        $_SESSION['confirmation-message'] = "Database error: " . $connection->error;
        header("Location: ../view/AddUser.php");
        exit();
    }

    $stmt->bind_param('ssssii', $email, $firstName, $lastName, $pfp, $jobStatus, $user_id);

    // Execute the user update query first
    if (!$stmt->execute()) {
        $_SESSION['confirmation-message'] = "Error updating user: " . $stmt->error;
        header("Location: ../view/EditUser.php?user_id=" . $user_id);
        exit();
    }

    // Check if the user is an alumni and update the alumni table
    if ($userType == 'alumni') {
    $queryAlumni = "UPDATE alumni SET school_id = ?, gradyear = ?, school= ?, program = ? WHERE user_id = ?";
    $stmtAlumni = $connection->prepare($queryAlumni);

    if ($stmtAlumni === false) {
        $_SESSION['confirmation-message'] = "Error preparing alumni update query: " . $connection->error;
        header("Location: ../view/EditUser.php?user_id=" . $user_id);
        exit();
    }

    $stmtAlumni->bind_param('ssssi', $schoolID, $gradYear, $school, $program, $user_id);

    if (!$stmtAlumni->execute()) {
        $_SESSION['confirmation-message'] = "Error updating alumni information: " . $stmtAlumni->error;
        header("Location: ../view/EditUser.php?user_id=" . $user_id);
        exit();
    }
}

$_SESSION['confirmation-message'] = "User updated successfully!";
header("Location: ../view/EditUser.php?user_id=" . $user_id);

// Close statement and connection
$stmt->close();
if (isset($stmtAlumni)) {
    $stmtAlumni->close();
}
$connection->close();
}
function isAlumniExist($connection, $schoolID, $user_id) {
    $stmt = $connection->prepare("SELECT * FROM alumni WHERE school_id = ? AND user_id != ?");
    $stmt->bind_param("si", $schoolID,$user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->num_rows > 0;
}

?>
