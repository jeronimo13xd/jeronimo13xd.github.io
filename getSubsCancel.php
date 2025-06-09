<?php
require_once __DIR__.'/../cors.php';
require_once __DIR__.'/../Permisos.php';

try {
  $stmtTotal = $pdo->query("SELECT COUNT(*) FROM suscripciones");
  $stmtCancel = $pdo->query("SELECT COUNT(*) FROM suscripciones WHERE Estado = 'cancelado'");
  $total = (int)$stmtTotal->fetchColumn();
  $cancel = (int)$stmtCancel->fetchColumn();
  $porcentaje = $total > 0 ? round(($cancel / $total) * 100, 1) : 0;
  echo json_encode(['porcentaje' => $porcentaje]);
} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode(['error' => $e->getMessage()]);
}
