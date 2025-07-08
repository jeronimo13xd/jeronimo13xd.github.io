<?php
require 'cors.php';          // CORS + session_start()
require 'Conexion.php';      // define conectar()

try {
    $pdo = conectar();       // <-- existe
    $stmt = $pdo->query("SELECT * FROM profesionales");
    $profesionales = $stmt->fetchAll();   // [] si no hay filas
    echo json_encode($profesionales);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
