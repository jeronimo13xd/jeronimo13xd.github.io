<?php
require_once __DIR__.'/../cors.php';
require_once __DIR__.'/../Permisos.php';

try {
  $stmt = $pdo->query("SELECT COUNT(*) FROM suscripciones WHERE FechaInicio >= CURDATE() - INTERVAL 7 DAY");
  $nuevas = (int)$stmt->fetchColumn();
  echo json_encode(['nuevas' => $nuevas]);
} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode(['error' => $e->getMessage()]);
}
