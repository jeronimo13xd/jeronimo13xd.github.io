<?php
require 'cors.php';
require 'Conexion.php';         //  asegura que la función conectar() existe

$pdo = conectar();

/* ──────────── KPI 1: profesionales activos ──────────── */
$stmt = $pdo->query("
  SELECT COUNT(*) AS total
  FROM profesionales
  WHERE Activo = 1
");
$profActivos = (int) $stmt->fetchColumn();

/* ──────────── KPI 2: aprobaciones pendientes ──────────── */
$stmt = $pdo->query("
  SELECT COUNT(*) AS pendientes
  FROM contenidos
  WHERE Estado = 'pendiente'
");
$aprobPend = (int) $stmt->fetchColumn();

/* ──────────── KPI 3: suscripciones activas ──────────── */
$stmt = $pdo->query("
  SELECT COUNT(*) AS subs
  FROM suscripciones
  WHERE Estado = 'activa'
");
$subsActivas = (int) $stmt->fetchColumn();

/* ──────────── KPI 4: ingresos del mes ────────────
   Suponemos tabla pagos (Estado='pagado') y FechaPago dentro del mes actual
*/
$stmt = $pdo->query("
  SELECT IFNULL(SUM(Monto),0) AS ingresos
  FROM pagos
  WHERE Estado = 'pagado'
    AND MONTH(FechaPago) = MONTH(CURDATE())
    AND YEAR(FechaPago)  = YEAR(CURDATE())
");
$ingresosMes = (float) $stmt->fetchColumn();

/* ──────────── Salida normalizada ──────────── */
header('Content-Type: application/json; charset=utf-8');
echo json_encode([
  'activos'      => $profActivos,
  'aprobPend'    => $aprobPend,
  'subsActivas'  => $subsActivas,
  'ingresosMes'  => $ingresosMes
]);
