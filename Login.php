<?php
// Mostrar errores (desactivar en prod si gustas)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configurar CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Manejo preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    exit(0);
}

// Conexión a la base de datos
$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "alepi2";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode([
        "status" => "error",
        "message" => "Fallo de conexión: " . $conn->connect_error
    ]);
    exit;
}

// Leer body JSON
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->Correo) || !isset($data->Contrasena)) {
    echo json_encode([
        "status" => "error",
        "message" => "Faltan datos para login (Correo, Contrasena)."
    ]);
    exit;
}

$correo     = $data->Correo;
$contrasena = $data->Contrasena;

// Consulta al usuario
$sql = "SELECT * FROM Usuarios WHERE Correo = ?";
$stmt = $conn->prepare($sql);
if ($stmt === false) {
    echo json_encode([
        "status" => "error",
        "message" => "Error en la preparación de la consulta: " . $conn->error
    ]);
    exit;
}

$stmt->bind_param("s", $correo);
$stmt->execute();
$result = $stmt->get_result();

// Si existe
if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    // Verificar la contraseña
    if (password_verify($contrasena, $user['Contrasena'])) {
        echo json_encode([
            "status"  => "success",
            "message" => "Login exitoso",
            "userID"  => $user['ID_Usuario'],
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Credenciales inválidas (contraseña incorrecta)"
        ]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "No se encontró usuario con ese correo"
    ]);
}

$stmt->close();
$conn->close();
