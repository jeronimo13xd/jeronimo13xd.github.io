<?php
ini_set('display_errors', '1');
error_reporting(E_ALL);

require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/Conexion.php';
require_once __DIR__ . '/Permisos.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['status'=>'error','message'=>'Método no permitido']);
    exit;
}

$idParam = $_GET['id'] ?? null;
if (!$idParam) {
    http_response_code(400);
    echo json_encode(['status'=>'error','message'=>'Falta parámetro id']);
    exit;
}

try {
    $id = (int)$idParam;

    $sql = "
      SELECT
        u.ID_Usuario,
        u.TipoUsuario              AS rol,
        u.Correo,
        u.Nombre                   AS nombreCuenta,
        u.Estado,
        u.imagenPerfil,            -- ¡ESTA LÍNEA ES LA QUE FALTA!
        pr.Nombre                  AS nombreVisible,
        pr.ApellidoP               AS apellidoP,
        pr.ApellidoM               AS apellidoM,
        pr.Telefono,
        pr.CedulaProfesional,
        pr.UniversidadEgreso,
        pr.Idiomas,
        pr.Certificaciones,
        pr.ExperienciaLaboral,
        pr.Honorarios,
        pr.Ubicacion,
        p.Nombre                   AS profesion,
        e.Nombre                   AS especialidad
      FROM usuarios u
      LEFT JOIN profesionales pr ON pr.ID_Usuario = u.ID_Usuario
      LEFT JOIN profesionales_profesiones pp ON pp.ID_Profesional = pr.ID_Profesional
      LEFT JOIN profesiones p ON p.ID_Profesion = pp.ID_Profesion
      LEFT JOIN especialidades e ON e.ID_Especialidad = pp.ID_Especialidad
      WHERE u.ID_Usuario = :id
      LIMIT 1
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute(['id' => $id]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$row) {
        http_response_code(404);
        echo json_encode(['status'=>'error','message'=>'Usuario no encontrado']);
        exit;
    }

    $row['Idiomas']         = $row['Idiomas']         ? json_decode($row['Idiomas'], true) : [];
    $row['Certificaciones'] = $row['Certificaciones'] ? array_map('trim', explode(',', $row['Certificaciones'])) : [];

    echo json_encode(['status' => 'success', 'data' => $row]);
    exit;

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status'=>'error','message'=>'Error en la base de datos: '.$e->getMessage()]);
    exit;
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['status'=>'error','message'=>'Error interno del servidor']);
    exit;
}