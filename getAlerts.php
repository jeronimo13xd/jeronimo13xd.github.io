<?php
require_once __DIR__.'/../cors.php';
require_once __DIR__.'/../Permisos.php';

try {
  $stmt = $pdo->query("SELECT Fecha, Mensaje FROM alertas ORDER BY Fecha DESC LIMIT 5");
  $alertas = $stmt->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode(['alertas' => $alertas]);
} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode(['error' => $e->getMessage()]);
}
