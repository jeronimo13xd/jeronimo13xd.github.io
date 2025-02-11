<?php
// Mostrar errores para depuración
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Permitir solicitudes desde cualquier origen (CORS)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// Información de conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "alepi";

// Crear la conexión a la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar si la conexión tiene algún error
if ($conn->connect_error) {
    echo json_encode(array("status" => "error", "message" => "Database connection failed: " . $conn->connect_error));
    exit();
}

// Consultar la base de datos para obtener los datos del usuario
$sql = "SELECT * FROM usuarios WHERE id = 1"; // Puedes cambiar la lógica para elegir qué usuario traer
$result = $conn->query($sql);

// Verificar si se encontró el usuario y devolver los datos
if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    echo json_encode($user);
} else {
    echo json_encode(array("status" => "error", "message" => "User not found"));
}

// Cerrar la conexión
$conn->close();
