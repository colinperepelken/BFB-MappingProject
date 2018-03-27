/* BFB Mapping Project
 * Database DDL
 */

/* Tables */


CREATE TABLE layer (
  id BIGINT AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  is_default TINYINT DEFAULT 0,
  PRIMARY KEY (id)
);

CREATE TABLE type (
  id BIGINT AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE marker (
  id BIGINT AUTO_INCREMENT,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  name VARCHAR(50),
  image VARCHAR(250),
  type BIGINT NOT NULL,
  layer BIGINT DEFAULT NULL,
  parent BIGINT DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY(layer) REFERENCES layer(id),
  FOREIGN KEY(parent) REFERENCES marker(id),
  FOREIGN KEY (type) REFERENCES type(id)
);

CREATE TABLE content (
  id BIGINT AUTO_INCREMENT,
  description VARCHAR(1000),
  image VARCHAR(250),
  video VARCHAR(250),
  date_added DATE,
  marker BIGINT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (marker) REFERENCES marker(id)
);

CREATE TABLE contributor (
  id BIGINT AUTO_INCREMENT,
  name VARCHAR(250) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE content_contributors (
  content BIGINT,
  contributor BIGINT,
  PRIMARY KEY (content, contributor),
  FOREIGN KEY (content) REFERENCES content
);


/* Test Data */
INSERT INTO layer VALUES (NULL, "Ecology", 0);
INSERT INTO layer VALUES (NULL, "Historical", 0);
INSERT INTO layer VALUES (NULL, "Project", 1); /* Project is default layer */
