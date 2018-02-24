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
          call_user_func_array(array($stmt, "bind_param"), array_merge(array($type), $params)); // bind params
        }
        $stmt->execute();
        return $this->get_result_set_as_associative_array($stmt->get_result());
      }
      return null;
    }

    private function get_result_set_as_associative_array($result) {
      $rows = array();
      while ($row = $result->fetch_array()) {
        $rows[] = $row;
      }
      try {
        return $rows;
      } catch (Exception $e) {
        return null;
      }
    }
}
