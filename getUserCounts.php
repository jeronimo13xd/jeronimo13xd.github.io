<?php
// getUserCount.php
// ────────────────────────────────────────────────────────────────────────────
// Devuelve JSON con el número total de filas en la tabla Usuarios.
// ────────────────────────────────────────────────────────────────────────────

require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/Conexion.php';
require_once __DIR__ . '/Permisos.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Opcional: si sólo quieres que ciertos roles accedan, descomenta:
// checkPermiso('dashboard', 'read');

header('Content-Type: application/json; charset=utf-8');

try {
    // Consulta para contar cuántos usuarios hay en la tabla
    $sql = "SELECT COUNT(*) AS totalUsuarios FROM Usuarios";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $count = (int)$row['totalUsuarios'];

    echo json_encode([
      'status' => 'success',
      'count'  => $count
    ]);
    exit;
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
      'status'  => 'error',
      'message' => 'Error al contar usuarios: ' . $e->getMessage()
    ]);
    exit;
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
      'status'  => 'error',
      'message' => 'Error interno del servidor'
    ]);
    exit;
}
