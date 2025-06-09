<?php
// Login.php — Autenticación usando Usuarios.TipoUsuario

// ➊ Mostrar errores (solo en dev)
ini_set('display_errors','1');
error_reporting(E_ALL);

// ➋ CORS + sesión + conexión + permisos
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/Conexion.php';
require_once __DIR__ . '/Permisos.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

header('Content-Type: application/json; charset=utf-8');

// ➌ Solo POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status'=>'error','message'=>'Método no permitido']);
    exit;
}

// ➍ Leer JSON
$input = json_decode(file_get_contents('php://input'), true);
if (empty($input['Correo']) || empty($input['Contrasena'])) {
    http_response_code(400);
    echo json_encode(['status'=>'error','message'=>'Faltan campos']);
    exit;
}

$correo = trim($input['Correo']);
$pass   = trim($input['Contrasena']);

try {
    // ➎ Traer usuario + contraseña + rol desde la misma tabla
    $sql = "
      SELECT
        ID_Usuario,
        Nombre,
        Correo,
        Contrasena,
        TipoUsuario AS rol
      FROM Usuarios
      WHERE Correo = :correo
      LIMIT 1
    ";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['correo' => $correo]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // ➏ Validar usuario y contraseña
    if (!$user || !password_verify($pass, $user['Contrasena'])) {
        http_response_code(401);
        echo json_encode(['status'=>'error','message'=>'Credenciales inválidas']);
        exit;
    }

    // ➐ Cargar permisos en sesión (usa tu Permisos.php)
    cargarPermisos((int)$user['ID_Usuario'], $pdo);

    // ➑ Responder con datos de usuario y permisos
    echo json_encode([
      'status'  => 'success',
      'usuario' => [
        'id'       => (int)$user['ID_Usuario'],
        'nombre'   => $user['Nombre'],
        'correo'   => $user['Correo'],
        'rol'      => $user['rol'],          // ya viene de TipoUsuario
        'permisos' => $_SESSION['permisos']  // array<string>
      ]
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
      'status'  => 'error',
      'message' => 'Error en la base de datos: '.$e->getMessage()
    ]);
} catch (Throwable $e) {
    http_response_code(500); 
    echo json_encode([
      'status'  => 'error',
      'message' => 'Error interno del servidor'
    ]);
}
