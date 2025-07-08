<?php
require 'cors.php';
$in = json_decode(file_get_contents("php://input"), true);
$usuario = (int)$in['usuario'];
$inicio  = date('Y-m-d');
$fin     = date('Y-m-d', strtotime('+1 month', strtotime($inicio)));
$pdo = db();
$pdo->prepare("INSERT INTO suscripciones (ID_Usuario, FechaInicio, FechaFin, Estado)
               VALUES (?,?,?, 'Activa')")->execute([$usuario,$inicio,$fin]);
echo json_encode(['ok'=>true]);
