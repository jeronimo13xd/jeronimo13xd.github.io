<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "alepi2";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => $conn->connect_error]));
}

$sql = "SELECT ID_Profesion, Nombre FROM Profesiones";
$result = $conn->query($sql);

$profesiones = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $profesiones[] = $row;
    }
}

echo json_encode($profesiones);

$conn->close();
