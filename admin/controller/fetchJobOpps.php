/**
 * PhP class for fetching the Job Opportunity information.
 * 
 * Author: [Carino, Mark]
 */
<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require '../../database/Configuration.php';

header('Content-Type: application/json');

// Get the current page from the query parameters
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$itemsPerPage = 6;  // Limit of jobs per page
$offset = ($page - 1) * $itemsPerPage;  // Calculate offset for pagination

// Get the selected filter from the query parameters
$filter = isset($_GET['filter']) ? $_GET['filter'] : 'all';  // Default filter is 'all'

try {
    // Create a new database connection
    $db = new dbConnection();
    $connection = $db->getConnection();

    // Build the query based on the selected filter
    if ($filter === 'all') {
        $query = "SELECT job_title, employment_type, company_name, address, image_data 
                  FROM opportunity 
                  ORDER BY created_at DESC 
                  LIMIT $itemsPerPage OFFSET $offset";
    } else {
        $query = "SELECT job_title, employment_type, company_name, address, image_data 
                  FROM opportunity 
                  WHERE employment_type = '$filter' 
                  ORDER BY created_at DESC 
                  LIMIT $itemsPerPage OFFSET $offset";
    }

    $result = $connection->query($query);

    $opportunity = [];  // Correct array for storing job opportunities
    
    // Fetch data row by row
    while ($row = $result->fetch_assoc()) {
        $imageData = $row['image_data'] ? base64_encode($row['image_data']) : null;
        $opportunity[] = [
            'job_title' => $row['job_title'], 
            'image_data' => $imageData,        
            'employment_type' => htmlspecialchars($row['employment_type'], ENT_QUOTES, 'UTF-8'), 
            'company_name' => htmlspecialchars($row['company_name'], ENT_QUOTES, 'UTF-8'), 
            'address' => htmlspecialchars($row['address'], ENT_QUOTES, 'UTF-8')
        ];
    }

    echo json_encode(['status' => 'success', 'opportunity' => $opportunity ?: []]);

} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>