<?php
require_once __DIR__.'/Permisos.php';
checkPermiso('usuarios','update');

$data   = json_decode(file_get_contents("php://input"), true);
$userID = $data['user'] ?? null;
$roles  = $data['roles']?? [];  // array de ID_Rol

if (!$userID){ http_response_code(400); echo json_encode(['error'=>'user requerido']); exit;}

try {
    $pdo->beginTransaction();
    $pdo->prepare("DELETE FROM usuario_rol WHERE ID_Usuario=?")->execute([$userID]);

    $ins = $pdo->prepare("INSERT INTO usuario_rol (ID_Usuario, ID_Rol) VALUES (?,?)");
    foreach ($roles as $rid){ $ins->execute([$userID,$rid]); }

    $pdo->commit();
    echo json_encode(['status'=>'ok']);
} catch (Exception $e){
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(['error'=>$e->getMessage()]);
}
