<?php
require '../../database/Configuration.php';
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $newsTitle = isset($_POST["news-title"]) ? $_POST["news-title"] : '';
    $newsDescription = isset($_POST["news-description"]) ? $_POST["news-description"] : '';

    $db = new dbConnection();
    $connection = $db->getConnection(); 

    $idImage = '';
    if (isset($_FILES['newsphoto']) && $_FILES['newsphoto']['error'] === UPLOAD_ERR_OK) { 
        $fileTmpPath = $_FILES['newsphoto']['tmp_name'];
        $idImage = file_get_contents($fileTmpPath);
        if ($idImage === false) {
            $_SESSION['formData'] = $_POST;
            $_SESSION['confirmation_message'] = "Failed to read the uploaded file.";
            header("Location: ../view/addnews.php");
            exit();
        }
    }

    $currentDatetime = date('Y-m-d H:i:s');

    $query ="INSERT into news (photo, title, description, datetime) VALUES (?, ?, ?, ?)";

    $stmt = $connection->prepare($query);
    if ($stmt === false) {
        $_SESSION['confirmation_message'] = "Error preparing statement: " . $connection->error;
        header("Location: ../view/addnews.php");
        exit();
    }

    $stmt->bind_param("ssss", $idImage, $newsTitle, $newsDescription, $currentDatetime);
    if ($stmt->execute()) {
        $_SESSION['confirmation_message'] = "Successfully added a news.";
    } else {
        $_SESSION['confirmation_message'] = "Error occurred! Please try again later... " . $stmt->error;
    }
    $stmt->close();
    header("Location: ../view/news.php");
    exit();
}
?>