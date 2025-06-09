<?php
// C:\xampp\htdocs\alepirea\GetUsuariosLista.php

require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/Conexion.php';
require_once __DIR__ . '/Permisos.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// (Opcional) Verificar permiso, p.ej. 'usuarios:read'
checkPermiso('usuarios', 'read');

header('Content-Type: application/json; charset=utf-8');

try {
    // Selecciona las columnas que realmente necesitas
    $stmt = $pdo->query("SELECT ID_Usuario, Nombre, Correo FROM Usuarios");
    $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($usuarios);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
      'status'  => 'error',
      'message' => 'Error al obtener usuarios: ' . $e->getMessage()
    ]);
}
