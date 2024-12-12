<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require '../../database/Configuration.php';

header('Content-Type: application/json');

// Get the page number from the query string, default to 1 if not provided
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$itemsPerPage = 6; // Number of job opportunities per page
$offset = ($page - 1) * $itemsPerPage;

try {
    // Create a new database connection
    $db = new dbConnection();
    $connection = $db->getConnection();

    // Query to fetch the job opportunities with limit and offset for pagination
    $query = "SELECT job_title, employment_type, company_name, address, image_data FROM opportunity ORDER BY created_at DESC LIMIT $itemsPerPage OFFSET $offset";
    $result = $connection->query($query);

    $opportunity = [];  // Correct array for storing job opportunities
    
    // Fetch data row by row
    while ($row = $result->fetch_assoc()) {
        // Base64 encode the photo if it is binary data, otherwise just return the path or URL
        $imageData = $row['image_data'] ? base64_encode($row['image_data']) : null;

        // Append the job opportunity to the array
        $opportunity[] = [
            'job_title' => $row['job_title'], // Job title
            'image_data' => $imageData,        // Base64 encoded image data (if any)
            'employment_type' => htmlspecialchars($row['employment_type'], ENT_QUOTES, 'UTF-8'), // Employment type
            'company_name' => htmlspecialchars($row['company_name'], ENT_QUOTES, 'UTF-8'), // Company name
            'address' => htmlspecialchars($row['address'], ENT_QUOTES, 'UTF-8') // Address
        ];
    }

    // Return a success response with the job opportunities data
    echo json_encode(['status' => 'success', 'opportunity' => $opportunity ?: []]);

} catch (Exception $e) {
    // Handle errors and return a failure response
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>