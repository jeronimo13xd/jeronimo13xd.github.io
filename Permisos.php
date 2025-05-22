<?php
/**
 * Permisos.php  – Middleware central de control de acceso
 * ------------------------------------------------------
 * 1. Inicia sesión (solo si no está iniciada).
 * 2. Carga la conexión PDO desde  conexion.php   (en la MISMA carpeta).
 * 3. Expone dos funciones:
 *      • cargarPermisos($idUsuario, PDO $pdo)
 *      • checkPermiso($modulo, $accion)
 *
 *  Uso típico en Login.php
 *  -----------------------
 *      require_once __DIR__ . '/Permisos.php';
 *      ...
 *      cargarPermisos($row['ID_Usuario'], $pdo);
 */

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

/* ─────────────────────────────────────────────────────────
   Conexión PDO
   ───────────────────────────────────────────────────────── */
require_once __DIR__ . '/conexion.php';   // <-- Asegúrate de que este archivo exista
//   • Debe devolver una instancia PDO en $pdo, por ejemplo:
//
//   $dsn  = "mysql:host=localhost;dbname=alepi2;charset=utf8mb4";
//   $user = "root";
//   $pass = "";
//   $pdo  = new PDO($dsn, $user, $pass, [
//       PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
//       PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
//   ]);

/* ─────────────────────────────────────────────────────────
   Funciones utilitarias
   ───────────────────────────────────────────────────────── */

/**
 * Carga TODOS los permisos del usuario autenticado
 * y los deja en $_SESSION['permisos'] como array plano
 *    ej: ["usuarios:read","articulos:create", ...]
 *
 * @param int   $idUsuario  ID_Usuario autenticado
 * @param PDO   $pdo        Conexión PDO viva
 */
function cargarPermisos(int $idUsuario, PDO $pdo): void
{
    $sql = "
        SELECT CONCAT(p.Modulo, ':', p.Accion) AS permiso
        FROM   permisos      p
        JOIN   rol_permiso   rp ON rp.ID_Permiso = p.ID_Permiso
        JOIN   usuario_rol   ur ON ur.ID_Rol     = rp.ID_Rol
        WHERE  ur.ID_Usuario = :uid
    ";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['uid' => $idUsuario]);
    $_SESSION['permisos'] = $stmt->fetchAll(PDO::FETCH_COLUMN) ?: [];
}

/**
 * Revisa si el permiso existe en la sesión.
 * Si no existe → HTTP 403 + JSON de error y exit.
 *
 * @param string $modulo   nombre del módulo   ej: 'usuarios'
 * @param string $accion   acción CRUD         ej: 'create'
 */
function checkPermiso(string $modulo, string $accion): void
{
    $perm = "$modulo:$accion";

    if (!in_array($perm, $_SESSION['permisos'] ?? [], true)) {
        http_response_code(403);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode([
            'error'   => "Permiso denegado ($perm)",
            'status'  => 403
        ]);
        exit;
    }
}
