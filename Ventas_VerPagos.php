<?php // Ventas_VerPagos.php
require 'cors.php'; require 'Conexion.php';
echo json_encode(conectar()->query("
  SELECT p.ID_Pago,u.Nombre AS Profesional,p.Monto,p.FechaPago,p.Metodo,p.Estado
  FROM pagos p JOIN usuarios u ON u.ID_Usuario=p.ID_Usuario
  ORDER BY p.FechaPago DESC
")->fetchAll(PDO::FETCH_ASSOC));
