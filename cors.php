<?php
// ────────────────────────────────────────────────────────────────────────────
// cors.php
// Debe ir estrictamente antes de cualquier salida por pantalla
// ────────────────────────────────────────────────────────────────────────────

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Permitir solo desde React DevServer:
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Si es preflight, respondemos 200 y salimos
    http_response_code(200);
    exit;
}
