<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/Permisos.php';   // incluye $pdo y session_start

/* -----------------------------------------------------------
   1.  Leer y validar entrada
----------------------------------------------------------- */
$data   = json_decode(file_get_contents('php://input'), true) ?? [];

$nombre = trim($data['nombre']   ?? '');
$correo = trim($data['correo']   ?? '');
$pass   = trim($data['password'] ?? '');
$tipo   = strtolower(trim($data['tipo'] ?? ''));  // negocio | ventas | staff

if (
    !$nombre ||
    !filter_var($correo, FILTER_VALIDATE_EMAIL) ||
    !$pass ||
    !in_array($tipo, ['negocio', 'ventas', 'staff'])
) {
    http_response_code(400);
    exit(json_encode(['status' => 'error', 'message' => 'Datos incompletos']));
}

/* -----------------------------------------------------------
   2.  Insertar usuario y vincular rol
----------------------------------------------------------- */
try {
    $pdo->beginTransaction();

    /* 2.1 usuario */
    $hash = password_hash($pass, PASSWORD_BCRYPT);
    $stmt = $pdo->prepare(
        "INSERT INTO usuarios
         (TipoUsuario, Correo, Nombre, Contrasena, FechaRegistro, Estado)
         VALUES (:tipo, :correo, :nombre, :pass, NOW(), 'Activo')"
    );
    $stmt->execute([
        'tipo'   => ucfirst($tipo),   // almacenas Cliente, Negocio, Ventas, Staff…
        'correo' => $correo,
        'nombre' => $nombre,
        'pass'   => $hash
    ]);
    $idUser = $pdo->lastInsertId();

    /* 2.2 rol */
    // 1 = super-admin (staff), 2 = negocio, 3 = ventas
    $rol = ($tipo === 'negocio')
        ? 2
        : (($tipo === 'ventas') ? 3 : 1);

    $pdo->prepare(
        "INSERT INTO usuario_rol (ID_Usuario, ID_Rol) VALUES (?, ?)"
    )->execute([$idUser, $rol]);

    $pdo->commit();
    echo json_encode(['status' => 'success', 'id' => $idUser]);
} catch (Throwable $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode([
        'status'  => 'error',
        'message' => $e->getMessage()
    ]);
}
