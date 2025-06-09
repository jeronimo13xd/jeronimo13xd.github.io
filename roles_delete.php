<?php
// roles_delete.php — Elimina el rol con ID especificado (primero limpia sus permisos)

require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/Conexion.php';
require_once __DIR__ . '/Permisos.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Solo GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido']);
    exit;
}

// Solo usuarios con permiso 'roles:delete'
checkPermiso('roles', 'delete');

if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Falta ID de rol']);
    exit;
}

$id = (int)$_GET['id'];

try {
    $pdo->beginTransaction();

    // 1) Borrar asociaciones en rol_permiso
    $stmtDelPerms = $pdo->prepare("DELETE FROM rol_permiso WHERE ID_Rol = :id");
    $stmtDelPerms->execute(['id' => $id]);

    // 2) Borrar el rol
    $stmtDelRol = $pdo->prepare("DELETE FROM roles WHERE ID_Rol = :id");
    $stmtDelRol->execute(['id' => $id]);

    $pdo->commit();
    echo json_encode(['status' => 'success', 'message' => 'Rol eliminado']);
    exit;

} catch (Exception $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode([
        'status'  => 'error',
        'message' => 'Error al eliminar rol: ' . $e->getMessage()
    ]);
    exit;
}
