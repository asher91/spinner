<?php
class Database{
	public static function ExecNonQuery($sql){
		$conn = new mysqli('localhost', 'root');
		mysqli_select_db($conn, 'spinner');
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
		}
		/*echo($sql);*/
		$conn->query($sql);
	}
	public static function ExecQuery($query){
		$conn = new mysqli('localhost', 'root');
		mysqli_select_db($conn, 'spinner');
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
		}
		/*echo($sql);*/
		return $conn->query($query);
	}
}