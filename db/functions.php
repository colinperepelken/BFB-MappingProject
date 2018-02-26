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

  public function get_markers($site_id) {
      $query = "SELECT * FROM marker WHERE site = ?";
      return $this->db->data_query($query, "i", array((int)$site_id));
  }

}
