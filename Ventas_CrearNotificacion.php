<?php
require 'cors.php';
require 'Conexion.php';

$in = json_decode(file_get_contents("php://input"), true);

$stmt = conectar()->prepare("
  INSERT INTO notificaciones (ID_Usuario,Titulo,Mensaje)
  VALUES (?,?,?)
");
$stmt->execute([
  $in['idUsuario'],          // puede ser null
  $in['titulo'],
  $in['mensaje']
]);

echo json_encode(['ok'=>true]);
