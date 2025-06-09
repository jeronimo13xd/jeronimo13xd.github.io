<?php
require_once __DIR__.'/../cors.php';
require_once __DIR__.'/../Permisos.php';

try {
  $articulos = $pdo->query("SELECT COUNT(*) FROM articulos WHERE FechaPublicacion >= CURDATE() - INTERVAL 30 DAY")->fetchColumn();
  $videos    = $pdo->query("SELECT COUNT(*) FROM videos WHERE FechaPublicacion >= CURDATE() - INTERVAL 30 DAY")->fetchColumn();
  echo json_encode(['articulos' => (int)$articulos, 'videos' => (int)$videos]);
} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode(['error' => $e->getMessage()]);
}
