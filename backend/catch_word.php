<?php
/* ================================================== */
/*               CONFIGURAÇÃO BANCO                   */
/* ================================================== */

$host = 'localhost';
$dbname = 'hangman';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    /* ================================================== */
    /*                   BUSCAR PALAVRA                   */
    /* ================================================== */
    
    $sql = "SELECT w.name AS palavra, c.name AS categoria 
            FROM words w 
            JOIN categories c ON w.id_categories = c.id 
            ORDER BY RAND() 
            LIMIT 1";

    $stmt = $pdo->query($sql);
    $resultado = $stmt->fetch();

    /* ================================================== */
    /*                 RETORNO JSON                       */
    /* ================================================== */
    
    header('Content-Type: application/json');
    echo json_encode($resultado);

} catch (PDOException $e) {
    header('Content-Type: application/json');
    http_response_code(500); 
    echo json_encode(['erro' => 'Erro no servidor: ' . $e->getMessage()]);
}
?>