<?php
require 'cors.php';
$in = json_decode(file_get_contents("php://input"), true);
$stmt = db()->prepare("INSERT INTO profesionales
      (Nombre, Correo, Especialidad, Password, Estado, FechaAlta)
      VALUES (?,?,?,?, 'Activo', NOW())");
$stmt->execute([
  $in['nombre'], $in['correo'], $in['especialidad'],
  password_hash($in['password'], PASSWORD_DEFAULT)
]);
echo json_encode(['ok'=>true]);
