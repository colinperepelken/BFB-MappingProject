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

  <link rel="stylesheet" href="style/all.css"/>

  <?php
  include 'db/database.php';
  include 'db/functions.php';

  $db = new Database();
  $functions = new Functions($db);

  $sites = $functions->get_sites();
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
        <form action="db/handle_insert.php" method="POST" id="site-form">
          Latitude <input type="text" name="latitude"><br>
          Longitude <input type="text" name="longitude"><br>
          Name <input type="text" name="name"><br>
          Description <textarea rows="5" cols="50" name="description" form="site-form"></textarea><br>
          Marker Image <input type="text" name="marker_image"><br>
          Background Image <input type="text" name="background_image"><br>
          <input type="hidden" name="type" value="site">
          <input type="submit">
        </form>
      </div>

      <div class="col-md-6">
        <form action="db/handle_insert.php" method="POST" id="marker-form">
          Latitude <input type="text" name="latitude"><br>
          Longitude <input type="text" name="longitude"><br>
          Name <input type="text" name="name"><br>
          Content Image <input type="text" name="image"><br>
          Content Video <input type="text" name="video"><br>
          Content Text <textarea rows="5" cols="50" name="description" form="site-form"></textarea><br>
          Marker Image <input type="text" name="marker_image"><br>
          Date <input type="date" name="date"><br>
          Site <select name="site" form="marker-form">
            <?php foreach ($sites as $site): ?>
              <option value="<?=$site['id']?>"><?=$site['name']?></option>
            <?php endforeach ?>
          </select><br>
          Layer <select name="layer" form="marker-form">
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
      <?php


      ?>
    </div>
  </div>

  <!-- map code -->
  <script src="map.js"></script>
  <script>initMap()</script>
</body>
</html>
