<?php   // Negocio_GetPendientes.php
require_once __DIR__.'/Conexion.php';
require_once __DIR__.'/cors.php';

header('Content-Type: application/json; charset=utf-8');

try {
    $pdo = conectar();
    $rows = $pdo->query(
        "SELECT ID_Contenido, Titulo, Descripcion, Estado
         FROM contenidos
         WHERE Estado='pendiente'
         ORDER BY ID_Contenido"
    )->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["status"=>"ok","data"=>$rows]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(["status"=>"error","message"=>$e->getMessage()]);
}
