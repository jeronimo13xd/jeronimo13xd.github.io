<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "alepi";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"));
$username = $data->username;
$password = $data->password;

$sql = "SELECT * FROM usuarios WHERE Correo = $username";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['Contrasena'])) {
        echo json_encode(array("status" => "success", "message" => "Login successful"));
    } else {
        echo json_encode(array("status" => "error", "message" => "Invalid credentials"));
    }
} else {
    echo json_encode(array("status" => "error", "message" => "Invalid credentials"));
}

$stmt->close();
$conn->close();
