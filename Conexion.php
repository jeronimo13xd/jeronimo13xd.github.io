<?php
/**
 *  conexion.php
 *  -------------
 *  Devuelve una instancia PDO en la variable $pdo
 *  que utilizan todos los scripts (Login.php, Permisos.php, etc.).
 *
 *  Ajusta los valores de $host, $db, $user y $pass a los de tu entorno.
 */

$host = 'localhost';   // o 127.0.0.1
$db   = 'alepi2';      // nombre de tu base de datos
$user = 'root';        // usuario MySQL
$pass = '';            // contraseña MySQL
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,  // lanza excepciones
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    // Si falla la conexión, detén la app con un mensaje claro
    http_response_code(500);
    echo "Error de conexión a la base de datos: " . $e->getMessage();
    exit;
}
