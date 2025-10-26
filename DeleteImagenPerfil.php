<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Método no permitido. Solo POST."]);
    exit;
}

// Obtener datos del POST
$input = json_decode(file_get_contents('php://input'), true);
$idUsuario = $input['idUsuario'] ?? null;

if (!$idUsuario) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "No se recibió el ID del usuario."]);
    exit;
}

// CONEXIÓN A LA BASE DE DATOS
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "alepi2";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Primero obtener la ruta de la imagen actual
    $stmt = $conn->prepare("SELECT imagenPerfil FROM usuarios WHERE ID_Usuario = :id");
    $stmt->bindParam(':id', $idUsuario);
    $stmt->execute();
    
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$user) {
        echo json_encode(["status" => "error", "message" => "Usuario no encontrado."]);
        exit;
    }
    
    $imagenActual = $user['imagenPerfil'];
    
    // Eliminar el archivo físico si existe
    if ($imagenActual && file_exists(__DIR__ . '/' . $imagenActual)) {
        unlink(__DIR__ . '/' . $imagenActual);
    }
    
    // Actualizar la base de datos estableciendo imagenPerfil a NULL
    $stmt = $conn->prepare("UPDATE usuarios SET imagenPerfil = NULL WHERE ID_Usuario = :id");
    $stmt->bindParam(':id', $idUsuario);
    
    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success", 
            "message" => "Imagen de perfil eliminada correctamente."
        ]);
    } else {
        echo json_encode([
            "status" => "error", 
            "message" => "Error al actualizar la base de datos."
        ]);
    }
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error", 
        "message" => "Error de base de datos: " . $e->getMessage()
    ]);
}
?>