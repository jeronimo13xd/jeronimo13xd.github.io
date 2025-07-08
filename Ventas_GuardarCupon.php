<?php
require 'cors.php';  require 'Conexion.php';
$cupon = json_decode(file_get_contents("php://input"), true);

if (!preg_match('/^[A-Z0-9]{4,20}$/', $cupon['Codigo'])) {
  http_response_code(422);
  echo json_encode(["error"=>"Código inválido"]);
  exit;
}

$sql = $cupon['ID_Cupon']      // editar
  ? "UPDATE cupones SET Codigo=?,Descuento=?,Vigencia=?,Activo=? WHERE ID_Cupon=?"
  : "INSERT INTO cupones (Codigo,Descuento,Vigencia,Activo) VALUES (?,?,?,?)";

$params = $cupon['ID_Cupon']
  ? [$cupon['Codigo'],$cupon['Descuento'],$cupon['Vigencia'],$cupon['Activo'],$cupon['ID_Cupon']]
  : [$cupon['Codigo'],$cupon['Descuento'],$cupon['Vigencia'],$cupon['Activo']];

try{
  conectar()->prepare($sql)->execute($params);
  echo json_encode(["ok"=>true]);
}catch(Throwable $e){
  http_response_code(500);
  echo json_encode(["error"=>$e->getMessage()]);
}
