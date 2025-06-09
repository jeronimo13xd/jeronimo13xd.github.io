<?php
require_once "cors.php";
require_once "Conexion.php";

try {
    $sql = "SELECT SUM(Monto) AS total FROM pagos WHERE MONTH(FechaPago) = MONTH(CURRENT_DATE()) AND YEAR(FechaPago) = YEAR(CURRENT_DATE())";
    $stmt = $pdo->query($sql);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode(["status" => "ok", "total" => $result['total'] ?? 0]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
