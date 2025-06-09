<?php
require_once __DIR__.'/cors.php';
require_once __DIR__.'/Permisos.php';   // → $pdo + session_start

$id = $_GET['id'] ?? null;
if(!$id){ http_response_code(400); exit('falta id'); }

$stmt = $pdo->prepare(
  "SELECT ID_Usuario, Nombre, Correo, TipoUsuario, Estado
   FROM usuarios WHERE ID_Usuario = ? LIMIT 1"
);
$stmt->execute([$id]);
echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
