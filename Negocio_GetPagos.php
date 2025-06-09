<?php
require_once __DIR__.'/Conexion.php';
require_once __DIR__.'/cors.php';

header('Content-Type: application/json; charset=utf-8');

try {
    $pdo = conectar();
    $sql = "SELECT ID_Pago, ID_Usuario, Monto, FechaPago, Metodo
            FROM pagos
            ORDER BY FechaPago DESC";
    echo json_encode(["status"=>"ok","data"=>$pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC)]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(["status"=>"error","message"=>$e->getMessage()]);
}
