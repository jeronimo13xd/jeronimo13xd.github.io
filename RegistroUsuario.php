<?php
// Mostrar errores (útil para desarrollo)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS y tipo de contenido
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Conexión a la base de datos
$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "alepi2";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode([
        "status" => "error",
        "message" => "Error de conexión: " . $conn->connect_error
    ]);
    exit;
}

// Obtener y decodificar los datos enviados
$data = json_decode(file_get_contents("php://input"), true);

// Validar los campos requeridos
if (
    empty($data['correo']) ||
    empty($data['contrasena']) ||
    empty($data['nombre'])
) {
    echo json_encode([
        "status" => "error",
        "message" => "Faltan datos: correo, contraseña o nombre."
    ]);
    exit;
}

// Preparar los valores
$correo     = $data['correo'];
$contrasena = password_hash($data['contrasena'], PASSWORD_DEFAULT);
$nombre     = $data['nombre'];
$estado     = "Activo";
$fecha      = date("Y-m-d");
$tipo       = "Cliente"; // Valor por defecto

// Verificar si el correo ya está registrado
$sql_check = "SELECT * FROM Usuarios WHERE Correo = ?";
$stmt_check = $conn->prepare($sql_check);
$stmt_check->bind_param("s", $correo);
$stmt_check->execute();
$result_check = $stmt_check->get_result();
if ($result_check->num_rows > 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Este correo ya está registrado."
    ]);
    $stmt_check->close();
    exit;
}
$stmt_check->close();

// Insertar nuevo usuario
$sql = "INSERT INTO Usuarios (Correo, Nombre, Contrasena, FechaRegistro, Estado, TipoUsuario)
        VALUES (?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode([
        "status" => "error",
        "message" => "Error preparando SQL: " . $conn->error
    ]);
    exit;
}

$stmt->bind_param("ssssss", $correo, $nombre, $contrasena, $fecha, $estado, $tipo);

if ($stmt->execute()) {
    echo json_encode([
        "status" => "success",
        "message" => "Usuario registrado con éxito",
        "idUsuario" => $conn->insert_id
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "No se pudo registrar: " . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
