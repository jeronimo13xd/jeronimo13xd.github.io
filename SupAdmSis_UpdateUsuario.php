<?php
/**
 *  SupAdmSis_UpdateUsuario.php
 *  Actualiza los datos básicos de un usuario y sincroniza su rol.
 *  Permite tipos: negocio, ventas, sistema, cliente
 *  Autor: ChatGPT
 */
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/Permisos.php';   // $pdo y session_start

/* ------------------------------------------------------------------
   1.  Entrada / validación
------------------------------------------------------------------ */
$data = json_decode(file_get_contents('php://input'), true) ?? [];

$id      = (int)($data['id']          ?? $data['ID_Usuario'] ?? 0);
$nombre  = trim($data['nombre']       ?? $data['Nombre']     ?? '');
$correo  = trim($data['correo']       ?? $data['Correo']     ?? '');
$tipo    = strtolower(trim($data['tipo'] ?? $data['TipoUsuario'] ?? ''));
$estado  = trim($data['estado']       ?? $data['Estado']     ?? '');

$tiposPermitidos = ['negocio', 'ventas', 'sistema', 'cliente'];
$estadosPermitidos = ['Activo', 'Inactivo'];

if (
    $id <= 0 ||
    !$nombre ||
    !filter_var($correo, FILTER_VALIDATE_EMAIL) ||
    !in_array($tipo, $tiposPermitidos) ||
    !in_array($estado, $estadosPermitidos)
) {
    http_response_code(400);
    exit(json_encode(['status' => 'error', 'message' => 'Datos incompletos o inválidos']));
}

/* rol según tipo */
$rol = match ($tipo) {
    'negocio' => 2,
    'ventas'  => 3,
    'cliente' => 4,   // nuevo rol cliente
    default   => 1    // sistema
};

/* ------------------------------------------------------------------
   2.  Actualizar usuario + tabla usuario_rol
------------------------------------------------------------------ */
try {
    $pdo->beginTransaction();

    /* 2.1 usuarios */
    $upd = $pdo->prepare(
        "UPDATE usuarios
           SET Nombre       = :n,
               Correo       = :c,
               TipoUsuario  = :t,
               Estado       = :e
         WHERE ID_Usuario   = :id"
    );
    $upd->execute([
        'n'  => $nombre,
        'c'  => $correo,
        't'  => ucfirst($tipo),   // Guarda con mayúscula inicial
        'e'  => $estado,
        'id' => $id
    ]);

    /* 2.2 usuario_rol → siempre dejamos un solo rol */
    $pdo->prepare("DELETE FROM usuario_rol WHERE ID_Usuario = ?")->execute([$id]);
    $pdo->prepare("INSERT INTO usuario_rol (ID_Usuario, ID_Rol) VALUES (?, ?)")
        ->execute([$id, $rol]);

    $pdo->commit();
    echo json_encode(['status' => 'success']);
} catch (Throwable $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
