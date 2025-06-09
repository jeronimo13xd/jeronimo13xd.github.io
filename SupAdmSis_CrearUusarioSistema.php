<?php
require_once __DIR__.'/cors.php';
require_once __DIR__.'/Permisos.php';   // conexión $pdo

$data = json_decode(file_get_contents("php://input"), true);
$nombre = trim($data['nombre'] ?? '');
$correo = trim($data['correo'] ?? '');
$pass   = trim($data['password'] ?? '');
$tipo   = trim($data['tipo'] ?? '');     // negocio | ventas

if(!$nombre || !$correo || !$pass || !in_array($tipo,['negocio','ventas'])){
  http_response_code(400);
  exit(json_encode(['status'=>'error','message'=>'Datos incompletos']));
}

try{
  $pdo->beginTransaction();

  // 1. insertar usuario
  $hash = password_hash($pass, PASSWORD_BCRYPT);
  $stmt = $pdo->prepare(
      "INSERT INTO usuarios
       (TipoUsuario,Correo,Nombre,Contrasena,FechaRegistro,Estado)
       VALUES (:tipo,:correo,:nombre,:pass,NOW(),'Activo')"
  );
  $stmt->execute([
      'tipo'   => ucfirst($tipo),
      'correo' => $correo,
      'nombre' => $nombre,
      'pass'   => $hash
  ]);
  $idUser = $pdo->lastInsertId();

  // 2. vincular rol (2 = negocio, 3 = ventas)
  $rol = $tipo === 'negocio' ? 2 : 3;
  $pdo->prepare("INSERT INTO usuario_rol (ID_Usuario,ID_Rol) VALUES (?,?)")
      ->execute([$idUser,$rol]);

  $pdo->commit();
  echo json_encode(['status'=>'success']);
}catch(Throwable $e){
  $pdo->rollBack();
  http_response_code(500);
  echo json_encode(['status'=>'error','message'=>$e->getMessage()]);
}
