<?php
require '../../database/Configuration.php'; 
require("../controller/HandleSession.php");

try {
    // Create a new instance of the dbConnection class
    $conn = (new dbConnection())->getConnection();

    // Check if the form was submitted via POST
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Collect form data
        $company_name = $conn->real_escape_string($_POST['company-name']);
        $country = $conn->real_escape_string($_POST['country']);
        $zip_code = $conn->real_escape_string($_POST['zip-code']);
        $address = $conn->real_escape_string($_POST['address']);
        $email = $conn->real_escape_string($_POST['email-address']);
        $contact_number = $conn->real_escape_string($_POST['contact-number']);
        $description = $conn->real_escape_string($_POST['company-description']);
        $job_title = $conn->real_escape_string($_POST['job-title']);
        $skills = $conn->real_escape_string($_POST['skills']);
        $requirements = $conn->real_escape_string($_POST['requirements']);

        $image_data = null; // Default value if no image is uploaded

        if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
            // Get image details
            $image_tmp = $_FILES['image']['tmp_name'];
            $image_data = file_get_contents($image_tmp);

            if ($image_data === false) {
                echo "<script>alert('Failed to read image data.'); window.location.href = '../view/addJobOpp.php';</script>";
                exit; // Stop further execution
            }
        } else {
            // Check for specific error codes
            if (isset($_FILES['image'])) {
                $upload_error = $_FILES['image']['error'];
                if ($upload_error != UPLOAD_ERR_OK) {
                    echo "<script>alert('Image upload error: $upload_error'); window.location.href = '../view/addJobOpp.php';</script>";
                    exit;
                }
            } else {
                echo "<script>alert('No image uploaded.'); window.location.href = '../view/addJobOpp.php';</script>";
                exit;
            }
        }

        // Prepare the SQL statement with placeholders
        $sql = "INSERT INTO opportunity (company_name, country, zip_code, address, email, contact_number, description, job_title, skills, requirements, image_data) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        // Prepare the statement
        if ($stmt = $conn->prepare($sql)) {
            // Bind parameters to the statement (s = string, b = blob)
            $stmt->bind_param("sssssssssss", $company_name, $country, $zip_code, $address, $email, $contact_number, $description, $job_title, $skills, $requirements, $image_data);

            // Execute the statement
            if ($stmt->execute()) {
                echo "<script>
                        alert('Job opportunity added successfully!');
                        window.location.href = '../view/addJobOpp.php'; 
                      </script>";
            } else {
                echo "<script>
                        alert('Error: " . $stmt->error . "');
                        window.location.href = '../view/addJobOpp.php'; 
                      </script>";
            }
            // Close the statement
            $stmt->close();
        } else {
            echo "<script>
                    alert('Error preparing the query');
                    window.location.href = '../view/addJobOpp.php'; 
                  </script>";
        }
    }
} catch (Exception $e) {
    echo "<script>
            alert('Connection failed: " . $e->getMessage() . "');
            window.location.href = '../view/addJobOpp.php'; 
          </script>";
} finally {
    $conn->close();
}
?>