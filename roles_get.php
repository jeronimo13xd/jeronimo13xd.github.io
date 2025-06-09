<?php
// C:\xampp\htdocs\alepirea\roles_get.php

require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/Conexion.php';
require_once __DIR__ . '/Permisos.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

checkPermiso('roles', 'read');
header('Content-Type: application/json; charset=utf-8');

try {
    // Si se solicita sólo catálogo de permisos:
    if (isset($_GET['cat']) && $_GET['cat'] === 'perms') {
        $stmt = $pdo->query("SELECT ID_Permiso, Modulo, Accion FROM permisos");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        exit;
    }

    // Roles + permisos concatenados
    $sql = "
        SELECT
            r.ID_Rol,
            r.NombreRol,
            GROUP_CONCAT(CONCAT(p.Modulo, ':', p.Accion) SEPARATOR ', ') AS permisos
        FROM roles r
        LEFT JOIN rol_permiso rp ON rp.ID_Rol = r.ID_Rol
        LEFT JOIN permisos p    ON p.ID_Permiso = rp.ID_Permiso
        GROUP BY r.ID_Rol
    ";
    $stmt = $pdo->query($sql);
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status'  => 'error',
        'message' => 'Error al obtener roles: ' . $e->getMessage()
    ]);
}
