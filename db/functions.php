<?php

class Functions {
  private $db;

  public function __construct(Database $db) {
    $this->db = $db;
  }

  public function get_markers($type) {
      $query = "SELECT id, latitude, longitude, name, image, layer, parent FROM marker WHERE type=?";
      return $this->db->data_query($query, "i", array((int)$type));
  }

  public function get_layers() {
    $query = "SELECT * FROM layer";
    return $this->db->data_query($query);
  }

  public function get_child_markers($parent_id) {
    $query = "SELECT id, latitude, longitude, name, image, layer, parent FROM marker WHERE parent=?";
    return $this->db->data_query($query, "i", array((int)$parent_id));
  }

  public function get_markers_from_layer($layer) {
    $query = "SELECT id, latitude, longitude, name, image, layer, parent FROM marker WHERE type=3 AND layer=?";
    return $this->db->data_query($query, "i", array((int)$layer));
  }

  public function get_child_markers_by_layer($parent_id, $layer_id) {
    $query = "SELECT id, latitude, longitude, name, image, layer, parent FROM marker WHERE parent=? AND layer=?";
    return $this->db->data_query($query, "i", array((int)$parent_id), (int)$layer_id);
  }

  public function get_content_of_feature($feature_id) {
    $query = "SELECT * FROM content WHERE marker = ? LIMIT 1";
    return $this->db->data_query($query, "i", array((int)$feature_id), (int)$feature_id);
  }

  public function get_parent_marker($marker_id) {
    $query = "SELECT id, latitude, longitude, name, image, layer, parent FROM marker WHERE id = (SELECT parent FROM marker WHERE id = ?)";
    return $this->db->data_query($query, "i", array((int)$marker_id));
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
