<?php
require_once __DIR__ . "/Conexion.php";
require_once __DIR__ . "/cors.php";


header('Content-Type: application/json');

try {
    $pdo = conectar();

    // ✅ CORRIGE ESTA COLUMNA SEGÚN TU BASE DE DATOS
    $stmt = $pdo->prepare("SELECT COUNT(*) AS total FROM contenidos WHERE Estado = 'pendiente'");
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "ok",
        "total" => $result['total'] ?? 0
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
