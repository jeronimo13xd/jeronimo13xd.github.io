<?php
// Mostrar errores para depuración
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Permitir solicitudes desde cualquier origen (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Información de conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "alepi2";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Error de conexión: " . $conn->connect_error]));
}

// Leer los datos recibidos
$data = json_decode(file_get_contents("php://input"), true);

// Validar los datos recibidos
if (empty($data['idUsuario']) || empty($data['profesion']) || empty($data['idiomas'])) {
    echo json_encode(["status" => "error", "message" => "Los campos idUsuario, profesion e idiomas son obligatorios."]);
    exit;
}

// Validar los idiomas
if (!isset($data['idiomas']) || !is_array($data['idiomas'])) {
    $data['idiomas'] = [];
}
$idiomas = json_encode($data['idiomas']);

// Desactivar autocommit para manejar transacciones
$conn->autocommit(FALSE);

try {
    // Insertar en la tabla Profesionales
    $sqlProfesional = "INSERT INTO Profesionales (ID_Usuario, Nombre, ApellidoM, ApellidoP, FechaNac, Telefono, CedulaProfesional, UniversidadEgreso, ExperienciaLaboral, Honorarios, Ubicacion, ID_Especialidad, ID_Profesion, Idiomas) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmtProfesional = $conn->prepare($sqlProfesional);

    if (!$stmtProfesional) {
        throw new Exception("Error al preparar la consulta: " . $conn->error);
    }

    // Asignar valores a las variables
    $idUsuario = $data['idUsuario'];
    $nombre = $data['nombre'];
    $apellidoP = $data['apellidoPaterno'];
    $apellidoM = $data['apellidoMaterno'];
    $fechaNac = "{$data['ano']}-{$data['mes']}-{$data['dia']}";
    $telefono = $data['telefono'] ?? NULL; // Asegúrate de que 'telefono' esté en los datos recibidos
    $cedulaProfesional = $data['cedulaProfesional'] ?? NULL;
    $universidadEgreso = $data['universidad'];
    $experienciaLaboral = $data['experienciaLaboral'] ?? NULL;
    $honorarios = $data['montoAsesoria'] ?? NULL;
    $ubicacion = "{$data['alcaldia']}, {$data['estado']}";
    $idEspecialidad = $data['especialidades'] ?? NULL;
    $idProfesion = $data['profesion'];

    // Vincular parámetros e insertar en la tabla
    $stmtProfesional->bind_param(
        "issssssssssiss",
        $idUsuario,
        $nombre,
        $apellidoM,
        $apellidoP,
        $fechaNac,
        $telefono, // Asegúrate de incluir el campo Telefono
        $cedulaProfesional,
        $universidadEgreso,
        $experienciaLaboral,
        $honorarios,
        $ubicacion,
        $idEspecialidad,
        $idProfesion,
        $idiomas
    );

    if (!$stmtProfesional->execute()) {
        throw new Exception("Error al ejecutar la consulta: " . $stmtProfesional->error);
    }

    // Confirmar transacción
    $conn->commit();
    echo json_encode(["status" => "success", "message" => "Registro profesional completado con éxito."]);
} catch (Exception $e) {
    $conn->rollback(); // Revertir cambios en caso de error
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
} finally {
    // Cerrar la declaración y la conexión
    if (isset($stmtProfesional)) {
        $stmtProfesional->close();
    }
    $conn->close();
}
