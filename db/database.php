<?php

class Database {
    private $mysqli = null;

    public function __construct() {
      include 'config.php';
      $this->mysqli = mysqli_connect($DBHOST, $DBUSER, $DBPASSWORD, $DBNAME);

      $error = mysqli_connect_error();
      if ($error != null) {
        $output = "<p>Unable to connect to database!</p>";
        exit($output);
      }
    }

    public function data_query($query, $type = null, $params = array()) {
      if ($stmt = $this->mysqli->prepare($query)) {
        if (!is_null($type)) {
          $stmt->bind_param($type, ...$params);
        }
        $stmt->execute();

        if (strpos($query, 'INSERT') !== false) {
          return null;
        } else {
          return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        }

      }
      return null;
    }
}
