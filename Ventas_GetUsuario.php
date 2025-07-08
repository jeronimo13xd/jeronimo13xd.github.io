<?php
require 'cors.php';
$id = (int)$_GET['id'];
$stmt = db()->prepare("SELECT ID_Usuario, Nombre, Correo, Especialidad
                       FROM profesionales WHERE ID_Usuario=?");
$stmt->execute([$id]);
echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
