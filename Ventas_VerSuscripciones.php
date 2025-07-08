<?php
// Ventas_VerSuscripciones.php
// ---------------------------
// Devuelve la lista de suscripciones en formato JSON (array)
// Siempre responde un array []; si ocurre un error, 500 + {"error": ...}

require 'cors.php';      // CORS + session_start()
require 'Conexion.php';  // define conectar()

try {
    $pdo = conectar();

    $sql = "
        SELECT
            s.ID_Suscripcion,
            p.Nombre AS Profesional,
            DATE_FORMAT(s.FechaInicio, '%Y-%m-%d') AS FechaInicio,
            DATE_FORMAT(s.FechaFin,   '%Y-%m-%d') AS FechaFin,
            s.Estado
        FROM suscripciones s
        JOIN profesionales p ON p.ID_Usuario = s.ID_Usuario
        ORDER BY s.FechaInicio DESC
    ";

    $stmt = $pdo->query($sql);
    $suscripciones = $stmt->fetchAll(PDO::FETCH_ASSOC); // [] si no hay filas
    echo json_encode($suscripciones);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
