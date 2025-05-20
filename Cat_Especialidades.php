<?php
// Mostrar errores
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Encabezados
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Conexión
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "alepi2";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Error de conexión: " . $conn->connect_error]));
}

// Consulta
$sql = "SELECT ID_Especialidad, Nombre FROM Especialidades";
$result = $conn->query($sql);

$especialidades = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $especialidades[] = $row;
    }
}

// ✅ Aquí va la línea correcta para evitar los caracteres tipo \u00e1
echo json_encode($especialidades, JSON_UNESCAPED_UNICODE);

// Cerrar conexión
$conn->close();
