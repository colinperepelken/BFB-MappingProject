<?php

class Functions {
  private $db;

  public function __construct(Database $db) {
    $this->db = $db;
  }

  public function get_sites() {
      $query = "SELECT * FROM site";
      return $this->db->data_query($query);
  }

}
