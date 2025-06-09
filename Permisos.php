<?php
// Permisos.php
// ────────────────────────────────────────────────────────────────────────────
// Funciones para manejar permisos del usuario (los guarda en $_SESSION).
// Incluir este archivo después de cors.php y Conexion.php, antes de session_start().
// ────────────────────────────────────────────────────────────────────────────

// Si no hay sesión iniciada, iniciamos:
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

/**
 * cargarPermisos
 * ────────────────────────────────────────────────────────────────────────────
 * Carga en $_SESSION['permisos'] un array de strings "Modulo:Accion" según
 * las tablas usuario_rol + rol_permiso + permisos para el usuario $uid.
 *
 * @param int    $uid  ID_Usuario del usuario logueado
 * @param PDO    $pdo  Instancia PDO (ya conectada a la BD)
 */
function cargarPermisos(int $uid, PDO $pdo): void {
    // Primero limpiamos cualquier permiso previo:
    unset($_SESSION['permisos']);

    $sql = "
      SELECT CONCAT(p.Modulo, ':', p.Accion) AS permiso
      FROM usuario_rol ur
      JOIN rol_permiso  rp ON rp.ID_Rol      = ur.ID_Rol
      JOIN permisos     p  ON p.ID_Permiso   = rp.ID_Permiso
      WHERE ur.ID_Usuario = :uid
    ";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['uid' => $uid]);
    $perms = $stmt->fetchAll(PDO::FETCH_COLUMN);

    // Guardamos el array (o array vacío si no hay nada):
    $_SESSION['permisos'] = $perms ?: [];
}

/**
 * checkPermiso
 * ────────────────────────────────────────────────────────────────────────────
 * Lanza HTTP 403 si el usuario no tiene el permiso "$modulo:$accion".
 *
 * @param string $modulo   Ejemplo: "roles", "usuarios", "articulos"
 * @param string $accion   Ejemplo: "read", "create", "update", "delete"
 */
function checkPermiso(string $modulo, string $accion): void {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    $permBuscada = strtolower($modulo . ':' . $accion);

    $tusPerms = $_SESSION['permisos'] ?? [];
    $found = false;
    foreach ($tusPerms as $p) {
        if (strtolower($p) === $permBuscada) {
            $found = true;
            break;
        }
    }

    if (!$found) {
        http_response_code(403);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode([
            'status'  => 'error',
            'message' => "Acceso denegado: falta permiso '$modulo:$accion'"
        ]);
        exit;
    }
}
