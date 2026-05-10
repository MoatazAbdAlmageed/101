<?php
/**
 * Phase 6: Persistence & Mastery
 * Database Connection Template (PDO)
 */

$host = 'localhost';
$db   = 'test_db'; // Change to your database name
$user = 'root';     // Default XAMPP user
$pass = '';         // Default XAMPP password
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
     $pdo = new PDO($dsn, $user, $pass, $options);
     echo "Database connection successful!";
} catch (\PDOException $e) {
     echo "Connection failed. (Note: Make sure to create the '$db' database in phpMyAdmin first)";
     // throw new \PDOException($e->getMessage(), (int)$e->getCode());
}

echo "<hr>";

// Example of a Prepared Statement (Read)
/*
$stmt = $pdo->query('SELECT name FROM users');
while ($row = $stmt->fetch())
{
    echo $row['name'] . "\n";
}
*/
?>
