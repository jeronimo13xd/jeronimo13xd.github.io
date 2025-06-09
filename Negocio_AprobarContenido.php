<?php
require_once __DIR__.'/Conexion.php';
require_once __DIR__.'/cors.php';

$id = $_POST['id'] ?? 0;
$pdo = conectar();
$stmt = $pdo->prepare(
  "UPDATE contenidos
     SET Estado='publicado', FechaRevision = NOW()
   WHERE ID_Contenido = :id"
);
$stmt->execute(['id'=>$id]);
echo json_encode(["status"=>"ok"]);
