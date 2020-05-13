<?php
class Database{
	public static function ExecNonQuery($sql){
		$conn = new mysqli('localhost', 'spinner', 'spinner', 'spinner');
		if ($conn->connect_error) {
	  		die("Connection failed: " . $conn->connect_error);
		}
		return $conn->query($sql);
	}
	public static function ExecQuery($query){
		$conn = new mysqli('localhost', 'spinner', 'spinner', 'spinner');
		if ($conn->connect_error) {
	  		die("Connection failed: " . $conn->connect_error);
		}
		return $conn->query($query);
	}
}