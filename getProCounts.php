<?php
require_once __DIR__.'/../cors.php';
require_once __DIR__.'/../Permisos.php';

try {
  $sql = "SELECT Estado, COUNT(*) AS cantidad FROM profesionales GROUP BY Estado";
  $stmt = $pdo->query($sql);
  $data = ['activos' => 0, 'inactivos' => 0];
  foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $row) {
    if (strtolower($row['Estado']) === 'activo') {
      $data['activos'] = (int)$row['cantidad'];
    } else {
      $data['inactivos'] += (int)$row['cantidad'];
    }
  }
  echo json_encode($data);
} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode(['error' => $e->getMessage()]);
}
