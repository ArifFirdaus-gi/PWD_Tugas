<?php
print "Tugas 1:<br>";
print "Menampilkan bilangan genap:<br>";
for($i = 1; $i <= 10; $i++){
    if($i % 2 == 0){
        echo $i, " ";
    }
}
print "<br><br>";

print "Tugas 2:";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Tabel Perkalian 1 - 10</h1>
    <table border = 1>
        <tr>
            <td>Bilangan</td>
            <?php for($i = 1; $i <= 10; $i++):?>
                <td class="baris"><?php echo $i;?></td>
            <?php endfor; ?>
        </tr>
        <?php for ($i = 1; $i <= 10; $i++):?>
        <tr><td class="kolom"><?php echo $i;?></td>
            <?php for($j = 1; $j <= 10; $j++):?>
                <?php if(($i % 2 == 1) && ($j % 2 == 1)):?>
                    <td class="kuning"><?php echo $i * $j;?></td>
                <?php else: ?>
                    <td class="biru"><?php echo $i * $j;?></td>
                <?php endif; ?>
            <?php endfor;?>
        <?php endfor;?>
        </tr>
    </table>
</body>
</html>