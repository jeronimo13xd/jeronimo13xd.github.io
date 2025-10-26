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

// Obtener ID del usuario - FORMA CORREGIDA
$idUsuario = null;

// Intentar obtener de $_POST primero
if (isset($_POST['idUsuario'])) {
    $idUsuario = $_POST['idUsuario'];
} 
// Si no está en $_POST, intentar del input JSON
else {
    $input = json_decode(file_get_contents('php://input'), true);
    $idUsuario = $input['idUsuario'] ?? null;
}

// Log para debugging
error_log("ID Usuario recibido: " . ($idUsuario ?: "NULL"));

if (!$idUsuario) {
    http_response_code(400);
    echo json_encode([
        "status" => "error", 
        "message" => "No se recibió el ID del usuario.",
        "debug" => [
            "post_data" => $_POST,
            "raw_input" => file_get_contents('php://input')
        ]
    ]);
    exit;
}

// Verificar que se haya subido un archivo
if (!isset($_FILES['imagen']) || $_FILES['imagen']['error'] !== UPLOAD_ERR_OK) {
    $errorMsg = "No se recibió el archivo o hubo un error al subirlo.";
    switch ($_FILES['imagen']['error']) {
        case UPLOAD_ERR_INI_SIZE:
            $errorMsg = "El archivo excede el tamaño máximo permitido por el servidor.";
            break;
        case UPLOAD_ERR_FORM_SIZE:
            $errorMsg = "El archivo excede el tamaño máximo permitido por el formulario.";
            break;
        case UPLOAD_ERR_PARTIAL:
            $errorMsg = "El archivo fue solo parcialmente subido.";
            break;
        case UPLOAD_ERR_NO_FILE:
            $errorMsg = "No se seleccionó ningún archivo.";
            break;
        case UPLOAD_ERR_NO_TMP_DIR:
            $errorMsg = "Falta la carpeta temporal.";
            break;
        case UPLOAD_ERR_CANT_WRITE:
            $errorMsg = "Error al escribir el archivo en el disco.";
            break;
        case UPLOAD_ERR_EXTENSION:
            $errorMsg = "Una extensión de PHP detuvo la subida del archivo.";
            break;
    }
    
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => $errorMsg]);
    exit;
}

// Validar tipo de archivo
$allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
$fileType = $_FILES['imagen']['type'];
if (!in_array($fileType, $allowedTypes)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Tipo de archivo no permitido. Solo se permiten imágenes JPEG, PNG, GIF y WebP."]);
    exit;
}

// Validar tamaño (máximo 5MB)
$maxSize = 5 * 1024 * 1024;
if ($_FILES['imagen']['size'] > $maxSize) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "El archivo es demasiado grande. El tamaño máximo permitido es 5MB."]);
    exit;
}

// Crear directorio de uploads si no existe
$uploadDir = __DIR__ . "/uploads/perfiles/";
if (!file_exists($uploadDir)) {
    if (!mkdir($uploadDir, 0777, true)) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "No se pudo crear el directorio de uploads."]);
        exit;
    }
}

// Verificar permisos de escritura
if (!is_writable($uploadDir)) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "El directorio de uploads no tiene permisos de escritura."]);
    exit;
}

// Generar nombre único para el archivo
$fileExtension = strtolower(pathinfo($_FILES['imagen']['name'], PATHINFO_EXTENSION));
$filename = uniqid() . '_' . $idUsuario . '.' . $fileExtension;
$targetFile = $uploadDir . $filename;

// Mover archivo subido
if (move_uploaded_file($_FILES['imagen']['tmp_name'], $targetFile)) {
    // Verificar que el archivo se movió correctamente
    if (!file_exists($targetFile)) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "El archivo no se pudo guardar correctamente."]);
        exit;
    }
    
    $relativeUrl = "uploads/perfiles/" . $filename;
    
    // CONEXIÓN A LA BASE DE DATOS
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "alepi2";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // ACTUALIZAR LA BASE DE DATOS
        $stmt = $conn->prepare("UPDATE usuarios SET imagenPerfil = :imagen WHERE ID_Usuario = :id");
        $stmt->bindParam(':imagen', $relativeUrl);
        $stmt->bindParam(':id', $idUsuario);
        
        if ($stmt->execute()) {
            // Verificar si realmente se actualizó
            if ($stmt->rowCount() > 0) {
                echo json_encode([
                    "status" => "success", 
                    "url" => $relativeUrl,
                    "message" => "Imagen actualizada correctamente en la base de datos."
                ]);
            } else {
                // Si no se actualizó, puede que el usuario no exista
                unlink($targetFile);
                echo json_encode([
                    "status" => "error", 
                    "message" => "No se pudo encontrar el usuario para actualizar. ID: " . $idUsuario
                ]);
            }
        } else {
            throw new Exception("Error al ejecutar la consulta");
        }
        
    } catch(PDOException $e) {
        // Si hay error en la BD, eliminar la imagen subida
        if (file_exists($targetFile)) {
            unlink($targetFile);
        }
        http_response_code(500);
        echo json_encode([
            "status" => "error", 
            "message" => "Error de base de datos: " . $e->getMessage()
        ]);
    }
    
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Error al mover el archivo subido. Verifica los permisos del directorio."]);
}
?>