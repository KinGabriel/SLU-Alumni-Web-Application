<?php
 class userModel {
    private $connection;
    public function __construct($db) {
        $this->connection = $db;
    }

    public function login($email, $password) {
        $query = "SELECT * FROM user WHERE email = ?";
        $stmt = $this->connection->prepare($query);
        $stmt->bind_param("s", $email); 
        $stmt->execute();
       $result = $stmt->get_result();
       if ($result->num_rows === 0) {
           return false; 
       }
       $user = $result->fetch_assoc();
       if ($password == $user['password']) {
        return $user; 
    } else {
        return false; 
    }
 }

 public function register($email, $password, $firstName, $lastName, $schoolID, $program, $gradYear, $imageID) {
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $query = "INSERT INTO applicants (school_id, email, first_name, last_name, password, program, gradyear, id_proof) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $this->connection->prepare($query);
    $stmt->bind_param("ssssssss", $schoolID, $email, $firstName, $lastName, $hashedPassword, $program, $gradYear, $imageID);
    if ($stmt->execute()) {
        return true; 
    } else {
        return false; 
    }
}
 }

