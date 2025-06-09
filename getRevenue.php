<?php
require_once __DIR__.'/../cors.php';
require_once __DIR__.'/../Permisos.php';

try {
  $sql = "SELECT SUM(monto) as total FROM pagos WHERE FechaPago >= CURDATE() - INTERVAL 30 DAY";
  $stmt = $pdo->query($sql);
  $total = (float)($stmt->fetchColumn() ?? 0);
  echo json_encode(['total' => $total, 'delta' => rand(-10, 25)]); // puedes mejorar delta real
} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode(['error' => $e->getMessage()]);
}
