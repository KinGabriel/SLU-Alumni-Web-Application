<?php
require '../../database/Configuration.php';
require '../../vendor/autoload.php'; 

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$db = new dbConnection();
$connection = $db->getConnection();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $app_id = $input['app_id'];
    $action = $input['action'];
    if ($action === 'accept') {
        $result = acceptUser($app_id, $connection);
        echo json_encode(['success' => $result]);
    } elseif ($action === 'decline') {
        $result = deleteApplicant($app_id, $connection);
        echo json_encode(['success' => $result]);
    }
}

function acceptUser($app_id, $connection) {
    $applicantData = getApplicantData($app_id, $connection);
    if (!$applicantData) {
        error_log("No applicant data found for app_id: $app_id");
        return false;
    }
    if (addUser($connection, $applicantData)) {
        if (addAlumni($connection, $applicantData)) {
            $updateResult = updateRequest($app_id, $connection);
            if ($updateResult) {
                sendEmail($applicantData['email'], 'Application Accepted', "Congratulations! Your application has been accepted.");
            }
            return $updateResult;
        }
    }

    return false;
}

function deleteApplicant($app_id, $connection) {
    $applicantData = getApplicantData($app_id, $connection);
    if (!$applicantData) {
        error_log("No applicant data found for app_id: $app_id");
        return false;
    }

    // Delete the application entry from the database
    $query = "DELETE FROM applicants WHERE app_id = ?";
    $stmt = $connection->prepare($query);
    $stmt->bind_param('i', $app_id);
    $result = $stmt->execute();

    if ($result) {
        sendEmail($applicantData['email'], 'Application Rejected', "We regret to inform you that your application has been rejected.");
    }

    return $result;
}

function sendEmail($recipient, $subject, $body) {
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = getenv('GMAIL_EMAIL'); // Email from .htaccess
        $mail->Password = getenv('GMAIL_PASSWORD'); // Password from .htaccess
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Recipients
        $mail->setFrom(getenv('GMAIL_EMAIL'), 'Your Application Team');
        $mail->addAddress($recipient);

        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $body;

        $mail->send();
    } catch (Exception $e) {
        error_log("Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
    }
}

function updateRequest($app_id, $connection) {
    $query = "UPDATE applicants SET is_verified = '1' WHERE app_id = ?";
    $stmt = $connection->prepare($query);
    if (!$stmt) {
        error_log("Failed to prepare updateRequest query: " . $connection->error);
        return false;
    }
    $stmt->bind_param('s', $app_id);
    if (!$stmt->execute()) {
        error_log("Failed to execute updateRequest query: " . $stmt->error);
        $stmt->close();
        return false;
    }
    $stmt->close();
    return true;
}

function addUser($connection, $applicantData) {
    $query = "INSERT INTO user (email, lname, fname, pword, user_type, mname, pfp)
              VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $connection->prepare($query);
    if (!$stmt) {
        error_log("Failed to prepare addUser query: " . $connection->error);
        return false;
    }
    $userType = 'alumni';
    $pfp_path = '../assets/images/default-avatar-icon.jpg';
    $pfp = base64_encode($pfp_path);
    $stmt->bind_param(
        'sssssss',
        $applicantData['email'],
        $applicantData['lname'],
        $applicantData['fname'],
        $applicantData['pword'],
        $userType,
        $applicantData['mname'],
        $pfp
    );
    if (!$stmt->execute()) {
        error_log("Failed to execute addUser query: " . $stmt->error);
        $stmt->close();
        return false;
    }

    $stmt->close();
    return true;
}

function addAlumni($connection, $applicantData) {
    $userID = getID($connection, $applicantData['email']);

    if (!$userID) {
        error_log("Failed to fetch user_id for email: " . $applicantData['email']);
        return false;
    }

    $query = "INSERT INTO alumni (user_id, gradyear, program, school) VALUES (?, ?, ?, ?)";
    $stmt = $connection->prepare($query);

    if (!$stmt) {
        error_log("Failed to prepare addAlumni query: " . $connection->error);
        return false;
    }

    $stmt->bind_param('isss', $userID, $applicantData['gradyear'], $applicantData['program'], $applicantData['school']);

    if (!$stmt->execute()) {
        error_log("Failed to execute addAlumni query: " . $stmt->error);
        $stmt->close();
        return false;
    }

    $stmt->close();
    return true;
}

function getApplicantData($app_id, $connection) {
    $query = "SELECT * FROM applicants WHERE app_id = ? AND is_verified = '0'";
    $stmt = $connection->prepare($query);

    if (!$stmt) {
        error_log("Failed to prepare getApplicantData query: " . $connection->error);
        return null;
    }

    $stmt->bind_param('s', $app_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $applicantData = $result->fetch_assoc();
    $stmt->close();

    return $applicantData;
}

function getID($connection, $email) {
    $query = "SELECT user_id FROM user WHERE email = ?";
    $stmt = $connection->prepare($query);

    if (!$stmt) {
        error_log("Failed to prepare getID query: " . $connection->error);
        return null;
    }

    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $data = $result->fetch_assoc();
    $stmt->close();

    return $data['user_id'] ?? null;
}


?>
