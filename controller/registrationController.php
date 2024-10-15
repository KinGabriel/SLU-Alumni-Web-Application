<?
require_once '../model/userModel.php';
require_once '../database/configuration.php';
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];
    $retypePassword = $_POST["retypePassword"];
    $firstName = $_POST["firstName"];
    $lastName = $_POST["lastName"];
    $schoolID = $_POST["sluSchoolId"];
    $idImage = $_POST["schoolIdFile"];
 
    
    $connection = $db->getConnection(); 
    $userModel = new UserModel($connection); 
    $register = $userModel->register($email, $password,$firstName,$lastName,$schoolID,$idImage);
}
?>