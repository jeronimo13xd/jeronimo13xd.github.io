<?php
require_once __DIR__.'/cors.php';
if (session_status()===PHP_SESSION_NONE) session_start();
session_destroy();
echo json_encode(['status'=>'success']);
