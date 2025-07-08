<?php
require 'cors.php';  require 'Conexion.php';
echo json_encode(
  conectar()->query("SELECT * FROM cupones ORDER BY Vigencia DESC")
            ->fetchAll(PDO::FETCH_ASSOC)
);
