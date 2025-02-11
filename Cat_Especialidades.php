<?php
$host = "localhost";
$user = "root";
$password = "";
$database = "alepi2";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die(json_encode(['error' => 'Error en la conexión: ' . $conn->connect_error]));
}

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$sql = "SELECT ID_Especialidad, Nombre FROM especialidades";
$result = $conn->query($sql);

if (!$result) {
    die(json_encode(['error' => 'Error en la consulta: ' . $conn->error]));
}

$especialidades = [];
while ($row = $result->fetch_assoc()) {
    $especialidades[] = $row;
}

if (empty($especialidades)) {
    echo json_encode(['error' => 'No se encontraron especialidades']);
} else {
    echo json_encode($especialidades);
}

$conn->close();
