<?php
class dbConnection {
    private $host = "localhost";     
    private $db_name = "slu_alumina"; 
    private $username = "root";        
    private $password = "";          
    private $connection;
    public function getConnection() {
        $this->connection = new mysqli($this->host, $this->username, $this->password, $this->db_name);
        if ($this->connection->connect_error) {
            die("Connection failed: " . $this->connection->connect_error);
        }
        return $this->connection;
    }
}
?>
