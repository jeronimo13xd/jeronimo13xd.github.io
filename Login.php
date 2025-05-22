<?php
/**
 * Login.php — Endpoint de autenticación
 * -------------------------------------
 * 1. Recibe JSON { Correo, Contrasena }
 * 2. Valida usuario y password (hash bcrypt)
 * 3. Carga permisos y devuelve al frontend:
 *      { status:"success", usuario:{ id, nombre, correo, permisos:[] } }
 * 4. Maneja CORS y OPTIONS
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

/* ─────────────────────────────────────────────────────────
   Bootstrap de conexión y middleware
   ───────────────────────────────────────────────────────── */
require_once __DIR__ . '/Permisos.php';   // incluye conexion.php y session_start

/* ─────────────────────────────────────────────────────────
   Leer cuerpo JSON
   ───────────────────────────────────────────────────────── */
$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['Correo'], $input['Contrasena'])) {
    echo json_encode([
        'status'  => 'error',
        'message' => 'Faltan campos (Correo, Contrasena)'
    ]);
    exit;
}

$correo = trim($input['Correo']);
$pass   = trim($input['Contrasena']);

/* ─────────────────────────────────────────────────────────
   Buscar usuario
   ───────────────────────────────────────────────────────── */
try {
    $stmt = $pdo->prepare(
        "SELECT ID_Usuario, Nombre, Correo, Contrasena
         FROM   Usuarios
         WHERE  Correo = :correo
         LIMIT  1"
    );
    $stmt->execute(['correo' => $correo]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode([
            'status'  => 'error',
            'message' => 'No existe usuario con ese correo'
        ]);
        exit;
    }

    /* ───── Verificar contraseña ───── */
    if (!password_verify($pass, $user['Contrasena'])) {
        echo json_encode([
            'status'  => 'error',
            'message' => 'Credenciales inválidas (contraseña incorrecta)'
        ]);
        exit;
    }

    /* ───── Autenticado: cargar permisos ───── */
    cargarPermisos((int)$user['ID_Usuario'], $pdo);

    /* ───── Respuesta al frontend ───── */
    echo json_encode([
        'status'  => 'success',
        'usuario' => [
            'id'       => (int)$user['ID_Usuario'],
            'nombre'   => $user['Nombre'],
            'correo'   => $user['Correo'],
            'permisos' => $_SESSION['permisos']     // array de strings
        ]
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'status'  => 'error',
        'message' => 'Error interno del servidor',
        'detail'  => $e->getMessage()   // quita este campo en producción
    ]);
}
