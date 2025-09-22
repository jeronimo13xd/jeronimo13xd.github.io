<?php
// Mostrar errores
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Conexión
$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "alepi2";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Error de conexión: " . $conn->connect_error
    ]);
    exit;
}

// Obtener datos
$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "JSON inválido"
    ]);
    exit;
}

// Validar campos
if (empty($data['correo']) || empty($data['contrasena']) || empty($data['nombre'])) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Faltan datos requeridos: correo, contraseña o nombre"
    ]);
    exit;
}

$correo = trim($data['correo']);
$contrasena = password_hash($data['contrasena'], PASSWORD_DEFAULT);
$nombre = trim($data['nombre']);
$estado = "Activo";
$fecha = date("Y-m-d H:i:s");
$tipo = "Cliente";

// Validar email
if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Formato de correo electrónico inválido."
    ]);
    exit;
}

// Verificar si el correo ya está registrado - ¡CORREGIDO!
$sql_check = "SELECT ID_Usuario FROM Usuarios WHERE Correo = ?"; // ✅ ID_Usuario
$stmt_check = $conn->prepare($sql_check);
if (!$stmt_check) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Error preparando verificación: " . $conn->error
    ]);
    exit;
}

$stmt_check->bind_param("s", $correo);
$stmt_check->execute();
$result_check = $stmt_check->get_result();

if ($result_check->num_rows > 0) {
    http_response_code(409);
    echo json_encode([
        "status" => "error",
        "message" => "Este correo ya está registrado."
    ]);
    $stmt_check->close();
    $conn->close();
    exit;
}
$stmt_check->close();

// Insertar nuevo usuario
$sql = "INSERT INTO Usuarios (Correo, Nombre, Contrasena, FechaRegistro, Estado, TipoUsuario)
        VALUES (?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Error preparando la consulta: " . $conn->error
    ]);
    $conn->close();
    exit;
}

$stmt->bind_param("ssssss", $correo, $nombre, $contrasena, $fecha, $estado, $tipo);

if ($stmt->execute()) {
    $idUsuario = $stmt->insert_id; // ✅ Esto funciona con AUTO_INCREMENT
    
    echo json_encode([
        "status" => "success",
        "message" => "Usuario registrado con éxito",
        "idUsuario" => $idUsuario,
        "usuario" => [
            "id" => $idUsuario,
            "correo" => $correo,
            "nombre" => $nombre
        ]
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Error al registrar usuario: " . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>