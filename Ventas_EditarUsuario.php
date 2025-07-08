<?php
require 'cors.php';
$in = json_decode(file_get_contents("php://input"), true);
$stmt = db()->prepare("UPDATE profesionales
                       SET Nombre=?, Correo=?, Especialidad=?
                       WHERE ID_Usuario=?");
$stmt->execute([$in['nombre'], $in['correo'], $in['especialidad'], $in['id']]);
echo json_encode(['ok'=>true]);
