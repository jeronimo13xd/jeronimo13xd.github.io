<?php
require_once __DIR__.'/Permisos.php';
checkPermiso('roles','update');

$input = json_decode(file_get_contents('php://input'), true);
$id    = $input['id']   ?? null;      // null = nuevo
$name  = $input['name'] ?? '';
$perms = $input['perms']?? [];       // array de ID_Permiso

try {
    $pdo->beginTransaction();

    if ($id) {               // ── editar ──
        $stmt = $pdo->prepare("UPDATE roles SET NombreRol=? WHERE ID_Rol=?");
        $stmt->execute([$name,$id]);

        // borrar permisos actuales
        $pdo->prepare("DELETE FROM rol_permiso WHERE ID_Rol=?")->execute([$id]);
    } else {                 // ── nuevo ──
        $stmt = $pdo->prepare("INSERT INTO roles (NombreRol) VALUES (?)");
        $stmt->execute([$name]);
        $id = $pdo->lastInsertId();
    }

    // insertar permisos
    $ins = $pdo->prepare("INSERT INTO rol_permiso (ID_Rol, ID_Permiso) VALUES (?,?)");
    foreach ($perms as $pid){
        $ins->execute([$id, $pid]);
    }

    $pdo->commit();
    echo json_encode(['status'=>'ok','id'=>$id]);

} catch (Exception $e){
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(['error'=>$e->getMessage()]);
}
