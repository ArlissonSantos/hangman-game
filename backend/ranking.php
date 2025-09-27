<?php
require 'conexao.php';
$sql = "SELECT u.nome, t.nome tema, r.palavra, r.acertos, r.erros, r.tempo, r.data_jogo
        FROM resultados r
        JOIN usuarios u ON u.id = r.id_usuario
        JOIN temas t ON t.id = r.id_tema
        ORDER BY r.acertos DESC, r.erros ASC, r.tempo ASC
        LIMIT 20";

$stmt = $pdo->query($sql);
$resultados = $stmt->fetchAll();
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8" />
<title>Ranking do Hangman-game</title>
<style>
table { border-collapse: collapse; width: 100%; max-width: 800px; margin: 20px auto; }
th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
th { background: #eee; }
</style>
</head>
<body>
<h1 style="text-align:center;">Ranking dos Jogadores</h1>
<table>
<thead>
    <tr><th>Nome</th><th>Tema</th><th>Palavra</th><th>Acertos</th><th>Erros</th><th>Tempo (s)</th><th>Data</th></tr>
</thead>
<tbody>
<?php if(empty($resultados)): ?>
<tr><td colspan="7">Nenhum resultado registrado.</td></tr>
<?php else: ?>
<?php foreach($resultados as $row): ?>
<tr>
    <td><?=htmlspecialchars($row['nome'])?></td>
    <td><?=htmlspecialchars($row['tema'])?></td>
    <td><?=htmlspecialchars($row['palavra'])?></td>
    <td><?= (int)$row['acertos'] ?></td>
    <td><?= (int)$row['erros'] ?></td>
    <td><?= (int)$row['tempo'] ?></td>
    <td><?=htmlspecialchars($row['data_jogo'])?></td>
</tr>
<?php endforeach; ?>
<?php endif; ?>
</tbody>
</table>
</body>
</html>
