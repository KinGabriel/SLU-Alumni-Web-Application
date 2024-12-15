
<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require '../../database/Configuration.php';

header('Content-Type: application/json');

try {
    // Create a new database connection
    $db = new dbConnection();
    $connection = $db->getConnection();

    // Query to fetch the news
    $query = "SELECT news_id, photo, title, description, datetime FROM news ORDER BY datetime DESC";
    $result = $connection->query($query);

    $news = [];
    
    // Fetch data row by row
    while ($row = $result->fetch_assoc()) {
        // Base64 encode the photo if it is binary data, otherwise just return the path or URL
        $photoData = $row['photo'] ? base64_encode($row['photo']) : null;

        // Append the news item to the array
        $news[] = [
            'news_id' => $row['news_id'], // News ID
            'photo' => $photoData,        // Base64 encoded image data (if any)
            'title' => htmlspecialchars($row['title'], ENT_QUOTES, 'UTF-8'), // Sanitize title
            'description' => htmlspecialchars($row['description'], ENT_QUOTES, 'UTF-8'), // Sanitize description
            'datetime' => $row['datetime'] // Date and time
        ];
    }

    // Return a success response with the news data
    echo json_encode(['status' => 'success', 'news' => $news ?: []]);

} catch (Exception $e) {
    // Handle errors and return a failure response
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>