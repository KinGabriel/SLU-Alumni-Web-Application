<?php
require '../../database/Configuration.php'; 
require("../controller/HandleSession.php");

try {
    // Create a new instance of the dbConnection class
    $conn = (new dbConnection())->getConnection();

    // Check if the form was submitted via POST
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Collect form data
        $event_title = $conn->real_escape_string($_POST['event_title']);
        $event_location = $conn->real_escape_string($_POST['location']); 
        $start_date = $conn->real_escape_string($_POST['start_date']);
        $start_time = $conn->real_escape_string($_POST['start_time']);
        $end_time = $conn->real_escape_string($_POST['end_time']);
        $event_description = $conn->real_escape_string($_POST['description']);

        // Initialize $image_data as NULL
        $image_data = NULL;

        // Check if an image was uploaded and process it
        if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
            // Get image details
            $image_tmp = $_FILES['image']['tmp_name'];
            $image_data = file_get_contents($image_tmp);
        } elseif (isset($_POST['defaultImage'])) {
            // Use the default image if no image is uploaded
            $image_data = file_get_contents($_POST['defaultImage']);
        } else {
            $image_data = null; // Set to null if no image and no default image provided
        }        

        // Prepare the SQL statement with placeholders
        $sql = "INSERT INTO event (event_title, start_date, start_time, end_time, event_location, event_description, image_data) 
                VALUES (?, ?, ?, ?, ?, ?, ?)";

        // Prepare the statement
        if ($stmt = $conn->prepare($sql)) {
            // Bind parameters to the statement
            $stmt->bind_param(
                "sssssss", 
                $event_title, 
                $start_date, 
                $start_time, 
                $end_time, 
                $event_location, 
                $event_description, 
                $image_data
            );

            // Execute the statement
            if ($stmt->execute()) {
                echo "<script>
                        alert('Event added successfully!');
                        window.location.href = '../view/addEvents.php'; 
                      </script>";
            } else {
                echo "<script>
                        alert('Error: " . $stmt->error . "');
                        window.location.href = '../view/addEvents.php'; 
                      </script>";
            }

            // Close the statement
            $stmt->close();
        } else {
            echo "<script>
                    alert('Error preparing the query');
                    window.location.href = 'addEventPage.php'; 
                  </script>";
        }
    }
} catch (Exception $e) {
    echo "<script>
            alert('Connection failed: " . $e->getMessage() . "');
            window.location.href = 'addEventPage.php'; 
          </script>";
} finally {
    $conn->close();
}
?>