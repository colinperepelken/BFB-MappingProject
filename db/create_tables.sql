/* BFB Mapping Project
 * Database DDL
 */

/* Tables */

CREATE TABLE site (
  id INT AUTO_INCREMENT,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  name VARCHAR(50) NOT NULL,
  marker_image VARCHAR(250),
  background_image VARCHAR(250),
  PRIMARY KEY (id)
);

CREATE TABLE layer (
  id INT AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  is_default TINYINT DEFAULT 0,
  PRIMARY KEY (id)
);

CREATE TABLE marker (
  id INT AUTO_INCREMENT,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  name VARCHAR(50), /* optional... not sure if this will be needed */
  marker_image VARCHAR(250),
  content_image VARCHAR(250),
  content_video VARCHAR(250),
  content_text VARCHAR(500),
  date_added DATE,
  layer INT NOT NULL,
  site INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY(layer) REFERENCES layer(id),
  FOREIGN KEY(site) REFERENCES site(id)
);



/* Test Data */
INSERT INTO site (latitude, longitude, name, marker_image, background_image) VALUES (49.8880, 119.4960, "Site Name", "farm_marker.png", "farm_background.png");

INSERT INTO layer VALUES (NULL, "Ecology", 0);
INSERT INTO layer VALUES (NULL, "Historical", 0);
INSERT INTO layer VALUES (NULL, "Project", 1); /* Project is default layer */

INSERT INTO marker VALUES (NULL, 49.885386, -119.399199, "Marker Name", "bee.png", "field.jpg", NULL, "This is a description of some stuff we did", 20180223, 3, 1);
