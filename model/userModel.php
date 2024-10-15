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
}
?>
