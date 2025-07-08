<?php
require 'cors.php';  require 'Conexion.php';
$id = (int) json_decode(file_get_contents("php://input"), true)['id'];
conectar()->prepare("DELETE FROM cupones WHERE ID_Cupon=?")->execute([$id]);
echo json_encode(["ok"=>true]);
