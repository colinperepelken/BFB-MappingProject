<?php

if (!empty($_POST)) {

   $method = $_POST['request'];

   include 'database.php';
   include 'functions.php';

   $db = new Database();
   $functions = new Functions($db);

  if (method_exists($functions, $method)) {

    if (isset($_POST['arg1'])) {
        $arg1 = $_POST['arg1'];
        $data = $functions->$method($arg1);
    } else {
      $data = $functions->$method();
    }

    // var_dump($data);

    header('Content-Type: application/json');
    echo json_encode($data);
  }
}
