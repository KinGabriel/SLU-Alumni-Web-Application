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

    // Query to fetch the events
    $query = "SELECT event_id, event_title, start_date, end_time, event_location, event_description, image_data FROM event ORDER BY start_date DESC";
    $result = $connection->query($query);

    $events = [];

    // Fetch data row by row
    while ($row = $result->fetch_assoc()) {
        $photoData = $row['image_data'] ? base64_encode($row['image_data']) : null;

        $events[] = [
            'event_id' => $row['event_id'],
            'event_title' => htmlspecialchars($row['event_title'], ENT_QUOTES, 'UTF-8'),
            'start_date' => $row['start_date'], 
            'end_time' => $row['end_time'], 
            'event_location' => htmlspecialchars($row['event_location'], ENT_QUOTES, 'UTF-8'),
            'event_description' => htmlspecialchars($row['event_description'], ENT_QUOTES, 'UTF-8'),
            'image_data' => $photoData
        ];
    }
    

    // Return a success response with the event data
    echo json_encode(['status' => 'success', 'event' => $events]);

} catch (Exception $e) {
    // Handle errors and return a failure response
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
