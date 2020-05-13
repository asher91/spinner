<?php
require_once "../app/Database.php";

class UserRepository{

    public static function CreateUser($username, $email, $password, $balance){
    	$result = Database::ExecNonQuery("INSERT INTO USER (username, email, password, balance) VALUES ('$username', '$email', '$password', $balance)");
    }

    public static function GetUser($username){
		$user = [];

    	$result = Database::ExecQuery("SELECT username, email, password, balance FROM USER WHERE Username = '$username';");
		if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				$user = $row;
			}
		}

        return $user;
    }

    public static function SetUserBalance($username, $balance){
    	$result = Database::ExecNonQuery("UPDATE USER SET balance = $balance WHERE Username = '$username';");
    }
}