// Ventas_ListarUsuarios.php
<?php
require_once __DIR__.'/cors.php';
require_once __DIR__.'/Conexion.php';
header('Content-Type: application/json; charset=utf-8');

try {
    $pdo = conectar();
    $stmt = $pdo->query("SELECT ID_Usuario, Nombre, Correo, FechaRegistro 
                         FROM usuarios 
                         WHERE TipoUsuario='cliente'");
    echo json_encode(['status'=>'ok','data'=>$stmt->fetchAll(PDO::FETCH_ASSOC)]);
} catch(Throwable $e){
    http_response_code(500);
    echo json_encode(['status'=>'error','message'=>$e->getMessage()]);
}
