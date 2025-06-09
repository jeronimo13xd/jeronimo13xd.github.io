<?php
require_once "cors.php";
require_once "Conexion.php";

try {
    $sql = "SELECT COUNT(*) AS total FROM suscripciones WHERE Activa = 1";
    $stmt = $pdo->query($sql);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode(["status" => "ok", "total" => $result['total'] ?? 0]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
