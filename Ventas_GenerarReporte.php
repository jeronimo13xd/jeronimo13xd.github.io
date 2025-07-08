<?php
require 'cors.php';  // CORS + session_start()
require 'Conexion.php';

$tipo  = $_GET['tipo']  ?? 'ingresos';
$d1    = $_GET['desde'] ?? date('Y-m-01');
$d2    = $_GET['hasta'] ?? date('Y-m-t');

$pdo = conectar();

switch ($tipo) {

  /* ───── 1 · INGRESOS ───── */
  case 'ingresos':
    $stmt = $pdo->prepare("
      SELECT u.Nombre AS Profesional,
             p.Monto,
             DATE(p.FechaPago) AS Fecha,
             p.Metodo
      FROM   pagos p
      JOIN   usuarios u ON u.ID_Usuario = p.ID_Usuario
      WHERE  p.Estado = 'confirmado'
        AND  p.FechaPago BETWEEN ? AND ?
      ORDER BY p.FechaPago DESC
    ");
    $header = ['Profesional','Monto','Fecha','Método'];
    break;

  /* ───── 2 · MOROSOS ───── */
  case 'morosos':
    $stmt = $pdo->prepare("
      SELECT u.Nombre AS Profesional,
             SUM(p.Monto) AS Deuda,
             MIN(p.FechaPago) AS PrimerPendiente
      FROM   pagos p
      JOIN   usuarios u ON u.ID_Usuario = p.ID_Usuario
      WHERE  p.Estado = 'pendiente'
        AND  p.FechaPago <= ?
      GROUP BY u.ID_Usuario
      HAVING Deuda > 0
      ORDER BY Deuda DESC
    ");
    $header = ['Profesional','Deuda','PrimerPendiente'];
    $stmt->execute([$d2]);          // solo una fecha de corte
    goto output_csv;

  /* ───── 3 · MÉTRICAS (KPI) ───── */
  case 'metricas':
    $stmt = $pdo->prepare("
      SELECT
        COUNT(DISTINCT pr.ID_Profesional)          AS ProfesionalesActivos,
        COUNT(DISTINCT s.ID_Suscripcion)           AS SuscripcionesActivas,
        SUM(CASE WHEN p.Estado='confirmado' THEN p.Monto ELSE 0 END) AS IngresosConfirmados
      FROM profesionales pr
      LEFT JOIN suscripciones s ON s.ID_Usuario = pr.ID_Usuario AND s.Estado='activa'
      LEFT JOIN pagos p ON p.ID_Usuario = pr.ID_Usuario
                          AND p.Estado='confirmado'
                          AND p.FechaPago BETWEEN ? AND ?
      WHERE pr.Activo = 1
    ");
    $header = ['ProfesionalesActivos','SuscripcionesActivas','IngresosConfirmados'];
    break;

  default:
    http_response_code(400);
    echo "tipo inválido";
    exit;
}

$stmt->execute([$d1,$d2]);

output_csv:
header('Content-Type: text/csv; charset=UTF-8');
header("Content-Disposition: attachment; filename=reporte_$tipo.csv");

echo implode(',',$header)."\n";
foreach($stmt as $row){
  // escapar comas y saltos de línea
  $line = array_map(fn($v)=>'"'.str_replace('"','""',$v).'"',$row);
  echo implode(',',$line)."\n";
}
