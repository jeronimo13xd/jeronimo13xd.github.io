<?php
$uploadDir = "uploads/perfiles/";
$testFile = $uploadDir . "test.txt";

if (file_put_contents($testFile, "Prueba de escritura") !== false) {
    echo "¡Éxito! PHP puede escribir en la carpeta.";
} else {
    echo "Error: PHP no puede escribir en la carpeta.";
}
?>
