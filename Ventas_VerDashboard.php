<?php
require 'cors.php';
$pdo = db();

$kpi = [
  'activos'       => $pdo->query("SELECT COUNT(*) FROM profesionales WHERE Estado='Activo'")->fetchColumn(),
  'suscripciones' => $pdo->query("SELECT COUNT(*) FROM suscripciones WHERE Estado='Activa'")->fetchColumn(),
  'ingresosMes'   => $pdo->query("SELECT IFNULL(SUM(Monto),0) FROM pagos WHERE MONTH(FechaPago)=MONTH(CURDATE())")->fetchColumn(),
  'morosos'       => $pdo->query("SELECT COUNT(*) FROM suscripciones WHERE Estado='Moroso'")->fetchColumn(),
];

echo json_encode($kpi);
