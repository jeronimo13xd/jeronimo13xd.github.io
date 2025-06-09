<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/Permisos.php';

$input = json_decode(file_get_contents("php://input"), true);
$action = $input['action'] ?? null;
$id     = $input['id'] ?? null;

if (!$action || !$id) {
    echo json_encode(['status' => 'error', 'message' => 'Faltan parámetros']);
    exit;
}

try {
    switch ($action) {
        case 'toggleEstado':
            $sql = "UPDATE usuarios SET Estado = IF(Estado='Activo','Inactivo','Activo') WHERE ID_Usuario = :id";
            $stmt = $pdo->prepare($sql);
            $stmt->execute(['id' => $id]);
            break;

        case 'delete':
            $sql = "DELETE FROM usuarios WHERE ID_Usuario = :id";
            $stmt = $pdo->prepare($sql);
            $stmt->execute(['id' => $id]);
            break;

        case 'updateRol':
            $nuevoRol = $input['nuevoRol'] ?? null;
            if (!$nuevoRol) {
                echo json_encode(['status' => 'error', 'message' => 'Falta nuevoRol']);
                exit;
            }
            $sql = "UPDATE usuarios SET TipoUsuario = :nuevoRol WHERE ID_Usuario = :id";
            $stmt = $pdo->prepare($sql);
            $stmt->execute(['id' => $id, 'nuevoRol' => $nuevoRol]);
            break;

        default:
            echo json_encode(['status' => 'error', 'message' => 'Acción no reconocida']);
            exit;
    }

    echo json_encode(['status' => 'success']);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
