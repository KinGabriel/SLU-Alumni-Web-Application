<?php
class dbConnection {
    private $host;     
    private $db_name; 
    private $username;        
    private $password;          
    private $connection;

    public function __construct() {
        $this->host = getenv('DB_HOST');     
        $this->db_name = getenv('DB_NAME'); 
        $this->username = getenv('DB_USER');        
        $this->password = getenv('DB_PASSWORD');          
    }

    public function getConnection() {
        $this->connection = new mysqli($this->host, $this->username, $this->password, $this->db_name);
        if ($this->connection->connect_error) {
            die("Connection failed: " . $this->connection->connect_error);
        }
        return $this->connection;
    }
}
?>
