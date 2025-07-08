<?php
require 'cors.php';
require 'Conexion.php';

$q = '%'.($_GET['q'] ?? '').'%';
$stmt = conectar()->prepare("
  SELECT ID_Usuario, Nombre
  FROM   usuarios
  WHERE  Nombre LIKE ?
  LIMIT  20
");
$stmt->execute([$q]);

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
