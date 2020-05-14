<?php
$conn = new mysqli('localhost', 'root');
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}
$conn->query("CREATE DATABASE `spinner`;");
mysqli_select_db($conn, 'spinner');
$conn->query(
"CREATE TABLE `spinner`.`user` (
  `Username` varchar(20) COLLATE utf8_bin NOT NULL,
  `Email` varchar(50) COLLATE utf8_bin NOT NULL,
  `Password` varchar(50) COLLATE utf8_bin NOT NULL,
  `Balance` int(11) NOT NULL DEFAULT 1000
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;"
);