<?php
/* ───────────────────── CONFIG ───────────────────── */
error_reporting(E_ALL);  ini_set('display_errors',1);
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:POST");
header("Access-Control-Allow-Headers:Content-Type");

$db = new mysqli('localhost','root','','alepi2');
if ($db->connect_errno) {
  http_response_code(500);
  echo json_encode(["status"=>"error","message"=>"Conexión fallida"]);
  exit;
}

/* ─────────── LEE Y DECODIFICA EL JSON DEL FRONT ─────────── */
$body = json_decode(file_get_contents('php://input'), true);
if (!$body) {
  echo json_encode(["status"=>"error","message"=>"JSON mal formado"]);
  exit;
}

/* ─────────── VALIDACIÓN OBLIGATORIA ─────────── */
$idUsuario = trim($body['idUsuario'] ?? '');
$profesion = trim($body['profesion'] ?? '');
$idiomas   = $body['idiomas']        ?? [];

if ($idUsuario==='' || $profesion==='' || !is_array($idiomas) || !count($idiomas)) {
  echo json_encode(["status"=>"error",
                    "message"=>"Los campos idUsuario, profesion e idiomas son obligatorios."]);
  exit;
}

/* ─────────── PREPARA LOS DEMÁS CAMPOS (opcionales) ─────────── */
$idiomasJson  = json_encode($idiomas, JSON_UNESCAPED_UNICODE);
$nombre       = $body['nombre']            ?? '';
$apellidoP    = $body['apellidoPaterno']   ?? '';
$apellidoM    = $body['apellidoMaterno']   ?? '';
$fechaNac     = sprintf('%04d-%02d-%02d',
                        $body['ano']??2000,$body['mes']??1,$body['dia']??1);
$telefono     = $body['telefono']          ?? '';
$cedula       = $body['cedulaProfesional'] ?? '';
$universidad  = $body['universidad']       ?? '';
$experiencia  = $body['experienciaLaboral']?? '';
$honorarios   = $body['montoAsesoria']     ?? '';
$ubicacion    = ($body['alcaldia']??'').', '.($body['estado']??'');
$especialidad = $body['especialidades']    ?? null;

/* ─────────── INSERCIÓN ─────────── */
$sql = "INSERT INTO Profesionales
(ID_Usuario,Nombre,ApellidoM,ApellidoP,FechaNac,Telefono,CedulaProfesional,
 UniversidadEgreso,ExperienciaLaboral,Honorarios,Ubicacion,
 ID_Especialidad,ID_Profesion,Idiomas)
VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

$st = $db->prepare($sql);
$st->bind_param(
  "issssssssssiss",
  $idUsuario,$nombre,$apellidoM,$apellidoP,$fechaNac,$telefono,$cedula,
  $universidad,$experiencia,$honorarios,$ubicacion,$especialidad,$profesion,$idiomasJson
);

if (!$st->execute()) {
  http_response_code(500);
  echo json_encode(["status"=>"error","message"=>"Error SQL: ".$st->error]);
  exit;
}

echo json_encode(["status"=>"success","message"=>"Registro guardado"]);
