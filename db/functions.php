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

  public function get_layers() {
    $query = "SELECT * FROM layer";
    return $this->db->data_query($query);
  }

  public function get_locations() {
    $query = "SELECT * FROM location";
    return $this->db->data_query($query);
  }

  public function get_markers($site_id) {
      $query = "SELECT * FROM marker WHERE site = ?";
      return $this->db->data_query($query, "i", array((int)$site_id));
  }

  public function get_all_markers() {
    $query = "SELECT * FROM marker";
    return $this->db->data_query($query);
  }

  public function add_site($latitude, $longitude, $name, $description, $marker_image, $background_image) {
    $sql = "INSERT INTO site VALUES (null, ?, ?, ?, ?, ?, ?)";
    $this->db->data_query($sql, "iissss", array($latitude, $longitude, $name, $description, $marker_image, $background_image));
  }

  public function add_marker($latitude, $longitude, $name, $marker_image, $content_image, $content_video, $content_text, $date_added, $layer, $site) {
    $sql = "INSERT INTO marker VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $this->db->data_query($sql, "iissssssii", array($latitude, $longitude, $name, $marker_image, $content_image, $content_video, $content_text, $date_added, $layer, $site));
  }

}
