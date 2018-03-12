<!DOCTYPE html>
<html>
<head>
  <title>BFB Admin</title>
  <meta charset="utf-8">

  <!-- bootstrap CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

  <!-- Jquery -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

  <!-- bootstrap JS -->
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

  <link rel="stylesheet" href="style/admin.css"/>

  <?php
  include 'db/database.php';
  include 'db/functions.php';

  $db = new Database();
  $functions = new Functions($db);

  $sites = $functions->get_sites();
  $markers = $functions->get_all_markers();
  $layers = $functions->get_layers();

  ?>

</head>

<body>
  <div class="container-fluid">
  	<div class="row text-center" id="logo">
  			<a href="http://borderfreebees.com/" title="Border Free Bees" rel="home"><img src="http://borderfreebees.com/wp-content/uploads/2015/05/BFB-logo-41.png" alt="Border Free Bees"></a>
    </div><!-- site-logo -->

    <div class="row">

      <div class="col-md-6">
        <h2>Add a Site</h2>
        <form action="db/handle_insert.php" method="POST" id="site-form">
          <label>Latitude </label><input type="text" name="latitude">
          <label>Longitude </label><input type="text" name="longitude">
          <label>Name </label><input type="text" name="name">
          <label>Description </label><textarea rows="5" cols="50" name="description" form="site-form"></textarea>
          <label>Marker Image </label><input type="text" name="marker_image">
          <label>Background Image </label><input type="text" name="background_image">
          <input type="hidden" name="type" value="site">
          <input type="submit">
        </form>
      </div>

      <div class="col-md-6">
        <h2>Add a Marker</h2>
        <form action="db/handle_insert.php" method="POST" id="marker-form">
          <label>Latitude </label><input type="text" name="latitude"><br>
          <label>Longitude </label><input type="text" name="longitude"><br>
          <label>Name </label><input type="text" name="name"><br>
          <label>Content Image </label><input type="text" name="content_image"><br>
          <label>Content Video </label><input type="text" name="content_video"><br>
          <label>Content Text </label><textarea rows="5" cols="50" name="content_text" form="marker-form"></textarea><br>
          <label>Marker Image </label><input type="text" name="marker_image"><br>
          <label>Date </label><input type="date" name="date"><br>
          <label>Site </label><select name="site" form="marker-form">
            <?php foreach ($sites as $site): ?>
              <option value="<?=$site['id']?>"><?=$site['name']?></option>
            <?php endforeach ?>
          </select><br>
          <label>Layer </label><select name="layer" form="marker-form">
            <?php foreach ($layers as $layer): ?>
              <option value="<?=$layer['id']?>"><?=$layer['name']?></option>
            <?php endforeach ?>
          </select><br>
          <input type="hidden" name="type" value="marker">
          <input type="submit">
        </form>
      </div>

    </div>

    <div class="row text-center">
      <div class="col-md-12">
        <h2>Sites</h2>
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th>Latitude</th>
              <th>Longitude</td>
              <th>Name</th>
              <th>Description</th>
              <th>Marker Image</th>
              <th>Background Image</th>
            </tr>
            <?php foreach ($sites as $site): ?>
              <tr>
                <td><?=$site['id']?></td>
                <td><?=$site['latitude']?></td>
                <td><?=$site['longitude']?></td>
                <td><?=$site['name']?></td>
                <td><?=$site['description']?></td>
                <td><?=$site['marker_image']?></td>
                <td><?=$site['background_image']?></td>
              </tr>
            <?php endforeach ?>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row text-center">
      <div class="col-md-12">
        <h2>Markers</h2>
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th>Latitude</th>
              <th>Longitude</td>
              <th>Name</th>
              <th>Marker Image</th>
              <th>Content Image</th>
              <th>Content Video</th>
              <th>Content Text</th>
              <th>Date Added</th>
              <th>Layer</th>
              <th>Site</th>
            </tr>
            <?php foreach ($markers as $marker): ?>
              <tr>
                <td><?=$marker['id']?></td>
                <td><?=$marker['latitude']?></td>
                <td><?=$marker['longitude']?></td>
                <td><?=$marker['name']?></td>
                <td><?=$marker['marker_image']?></td>
                <td><?=$marker['content_image']?></td>
                <td><?=$marker['content_video']?></td>
                <td><?=$marker['content_text']?></td>
                <td><?=$marker['date_added']?></td>
                <td><?=$marker['layer']?></td>
                <td><?=$marker['site']?></td>
              </tr>
            <?php endforeach ?>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- map code -->
  <script src="map.js"></script>
  <script>initMap()</script>
</body>
</html>
