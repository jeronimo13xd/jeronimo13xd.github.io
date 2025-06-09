<?php
require_once __DIR__.'/Conexion.php';
require_once __DIR__.'/cors.php';

$id     = $_POST['id']     ?? 0;
$motivo = $_POST['motivo'] ?? '';
$pdo = conectar();
$stmt = $pdo->prepare(
  "UPDATE contenidos
       SET Estado='rechazado',
           ComentarioRechazo = :motivo,
           FechaRevision = NOW()
     WHERE ID_Contenido = :id"
);
$stmt->execute(['motivo'=>$motivo,'id'=>$id]);
echo json_encode(["status"=>"ok"]);
