<?php
// Mostrar errores para depuración
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Permitir solicitudes desde cualquier origen (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    exit(0);
}

// Información de conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "alepi2"; // Asegúrate de que este sea el nombre correcto de tu base de datos

// Crear la conexión a la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar si la conexión tiene algún error
if ($conn->connect_error) {
    echo json_encode(array("status" => "error", "message" => "Database connection failed: " . $conn->connect_error));
    exit();
}

// Leer los datos recibidos del cuerpo de la solicitud (en JSON)
$data = json_decode(file_get_contents("php://input"));

// Verificar si los datos se recibieron correctamente
if (!isset($data->Correo) || !isset($data->Contrasena)) {
    echo json_encode(array("status" => "error", "message" => "Missing email or password"));
    exit();
}

$correo = $data->Correo;
$contrasena = $data->Contrasena;

// Consultar la base de datos para encontrar el usuario utilizando una declaración preparada
$sql = "SELECT * FROM usuarios WHERE Correo = ?";
$stmt = $conn->prepare($sql);

// Verificar si la consulta se preparó correctamente
if ($stmt === false) {
    echo json_encode(array("status" => "error", "message" => "Error en la preparación de la consulta: " . $conn->error));
    exit();
}

$stmt->bind_param("s", $correo);
$stmt->execute();
$result = $stmt->get_result();

// Verificar si se encontró el usuario
if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    // Verificar si la contraseña coincide (las contraseñas deben estar cifradas con password_hash)
    if (password_verify($contrasena, $user['Contrasena'])) {
        echo json_encode(array("status" => "success", "message" => "Login successful"));
    } else {
        echo json_encode(array("status" => "error", "message" => "Invalid credentials (password incorrect)"));
    }
} else {
    echo json_encode(array("status" => "error", "message" => "User not found"));
}

// Cerrar la declaración y la conexión
$stmt->close();
$conn->close();
