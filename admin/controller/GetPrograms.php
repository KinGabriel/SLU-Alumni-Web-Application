<?php
// Validate the school parameter
$school = isset($_GET['school']) ? trim($_GET['school']) : null;

if (!$school) {
    echo json_encode(['error' => 'No school selected']);
    exit;
}

// Path to the programs file
$filePath = '../assets/programs.txt';
if (!file_exists($filePath)) {
    echo json_encode(['error' => 'Programs file not found']);
    exit;
}

// Read programs for the selected school
$programs = [];
$fileContents = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
foreach ($fileContents as $line) {
    list($schoolName, $programList) = explode(':', $line);
    if (trim($schoolName) === $school) {
        $programs = array_map('trim', explode(',', $programList));
        break;
    }
}

// Output programs as JSON
echo json_encode($programs);
?>
