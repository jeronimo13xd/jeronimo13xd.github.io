<?php // Ventas_ActualizarPago.php
require 'cors.php'; require 'Conexion.php';
$in = json_decode(file_get_contents("php://input"),true);
conectar()->prepare("UPDATE pagos SET Estado=? WHERE ID_Pago=?")
          ->execute([$in['estado'],$in['id']]);
echo json_encode(['ok'=>true]);
