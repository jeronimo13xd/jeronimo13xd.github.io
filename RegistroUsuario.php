<?php
// Mostrar errores para depuración (puedes desactivar en producción)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Permitir solicitudes desde cualquier origen (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Configurar la conexión a la base de datos
$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "alepi2"; // Asegúrate de usar el nombre correcto

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode([
        "status" => "error",
        "message" => "Error de conexión: " . $conn->connect_error
    ]);
    exit;
}

// Leer el body de la solicitud (JSON)
$data = json_decode(file_get_contents("php://input"), true);

// Validar campos requeridos
if (empty($data['correo']) || empty($data['contrasena']) || empty($data['nombre'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Los campos 'correo', 'nombre' y 'contrasena' son obligatorios."
    ]);
    exit;
}

$correo     = $data['correo'];
$contrasena = $data['contrasena']; // Contraseña en texto plano
$nombre     = $data['nombre'];

// Verificar si el correo ya existe
$sql_check = "SELECT * FROM Usuarios WHERE Correo = ?";
$stmt_check = $conn->prepare($sql_check);
$stmt_check->bind_param("s", $correo);
$stmt_check->execute();
$result_check = $stmt_check->get_result();

if ($result_check->num_rows > 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Este correo ya tiene una cuenta registrada en ALEPI."
    ]);
    $stmt_check->close();
    exit;
}
$stmt_check->close();

// Insertar nuevo usuario
$contrasenaHash = password_hash($contrasena, PASSWORD_DEFAULT);
$fechaRegistro  = date('Y-m-d');
$estado         = "Activo";

$sql_insert = "INSERT INTO Usuarios (Correo, Nombre, Contrasena, FechaRegistro, Estado) 
               VALUES (?, ?, ?, ?, ?)";
$stmt_insert = $conn->prepare($sql_insert);
$stmt_insert->bind_param("sssss", $correo, $nombre, $contrasenaHash, $fechaRegistro, $estado);

if ($stmt_insert->execute()) {
    echo json_encode([
        "status"   => "success",
        "idUsuario" => $conn->insert_id,
        "message"  => "Usuario registrado con éxito."
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Error al insertar: " . $stmt_insert->error
    ]);
}

$stmt_insert->close();
$conn->close();
