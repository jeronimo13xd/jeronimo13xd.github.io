<?php
// _____________________________________________________________
// Conexión.php
// Ajusta host, usuario, contraseña y nombre de BD según tu entorno.
// _____________________________________________________________

$host     = '127.0.0.1';
$port     = 3306;
$db       = 'alepi2';   // <- Asegúrate de que coincida con tu base de datos
$user     = 'root';
$pass     = '';
$charset  = 'utf8mb4';

$dsn = "mysql:host=$host;port=$port;dbname=$db;charset=$charset";

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

// Prueba de conexión directa (opcional, puede omitirse si no se necesita)
try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'status'  => 'error',
        'message' => 'Error al conectar con la base de datos: ' . $e->getMessage()
    ]);
    exit;
}

// ✅ Función global para reutilizar conexión en otros scripts
function conectar() {
    global $dsn, $user, $pass, $options;

    try {
        return new PDO($dsn, $user, $pass, $options);
    } catch (PDOException $e) {
        http_response_code(500);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode([
            'status'  => 'error',
            'message' => 'Error al conectar con la base de datos: ' . $e->getMessage()
        ]);
        exit;
    }
}
