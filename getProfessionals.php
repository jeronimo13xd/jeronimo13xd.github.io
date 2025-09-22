<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: *");

$host = "localhost";
$user = "root";
$password = "";
$db = "alepi2";

$conn = new mysqli($host, $user, $password, $db);
if ($conn->connect_error) {
    die(json_encode(["error" => "Conexión fallida: " . $conn->connect_error]));
}

$sql = "SELECT u.ID_Usuario, p.Nombre, p.ApellidoP, p.ApellidoM, p.ID_Profesion, p.ID_Especialidad, p.Ubicacion, p.Honorarios, p.Calificacion, u.ImagenURL
        FROM profesionales p
        JOIN usuarios u ON p.ID_Usuario = u.ID_Usuario
        WHERE u.TipoUsuario = 'profesional' AND u.Estado = 'activo'";

$result = $conn->query($sql);

$profesionales = [];
while ($row = $result->fetch_assoc()) {
    $profesionales[] = $row;
}

echo json_encode($profesionales);
$conn->close();
?>
