<?php
require_once __DIR__.'/Conexion.php';
require_once __DIR__.'/cors.php';

header('Content-Type: application/json; charset=utf-8');
$id     = $_POST['id']     ?? 0;
$estado = $_POST['estado'] ?? '';

if(!$id || !in_array($estado,['pendiente','pagado'])){
    http_response_code(400);
    exit(json_encode(["status"=>"error","message"=>"Datos inválidos"]));
}

try{
    $pdo = conectar();
    $stmt = $pdo->prepare("UPDATE pagos SET Estado=? WHERE ID_Pago=?");
    $stmt->execute([$estado,$id]);

    echo json_encode(["status"=>"ok"]);
}catch(Throwable $e){
    http_response_code(500);
    echo json_encode(["status"=>"error","message"=>$e->getMessage()]);
}
