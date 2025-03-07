<?php
// Mostrar errores para depuración (desactiva en producción si gustas)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Permitir solicitudes desde cualquier origen (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "alepi2";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode([
        "status" => "error",
        "message" => "Error de conexión: " . $conn->connect_error
    ]));
}

// Obtener el ID del usuario desde el body JSON (POST)
$data = json_decode(file_get_contents("php://input"), true);
$idUsuario = $data['idUsuario'] ?? null;

if (!$idUsuario) {
    echo json_encode([
        "status" => "error",
        "message" => "ID de usuario no proporcionado."
    ]);
    exit;
}

try {
    // Consulta SQL (MODIFICADA PARA INCLUIR TELÉFONO)
    $sql = "SELECT 
                u.Nombre AS nombre, 
                u.Correo AS correo, 
                p.ApellidoP AS apellidoPaterno, 
                p.ApellidoM AS apellidoMaterno,
                p.Telefono AS telefono,  
                p.CedulaProfesional AS cedulaProfesional, 
                p.UniversidadEgreso AS universidad, 
                p.Idiomas AS idiomas, 
                p.Certificaciones AS certificaciones, 
                p.ExperienciaLaboral AS experienciaLaboral, 
                p.Honorarios AS honorarios, 
                p.Ubicacion AS ubicacion, 
                p.Calificacion AS calificacion,
                e.Nombre AS especialidad
            FROM Usuarios u
            LEFT JOIN Profesionales p ON u.ID_Usuario = p.ID_Usuario
            LEFT JOIN Especialidades e ON p.ID_Especialidad = e.ID_Especialidad
            WHERE u.ID_Usuario = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $idUsuario);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $usuario = $result->fetch_assoc();

        // Decodificar JSON si es necesario
        $usuario['idiomas'] = json_decode($usuario['idiomas'] ?? '[]');
        $usuario['certificaciones'] = json_decode($usuario['certificaciones'] ?? '[]');

        echo json_encode([
            "status" => "success",
            "data" => $usuario
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Usuario no encontrado."
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
} finally {
    $conn->close();
}
