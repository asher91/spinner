<?php
require_once "../app/Database.php";

class UserRepository{
    public static function CreateUser($username, $email, $password, $balance){
    	$result = Database::ExecNonQuery("INSERT INTO `user` (`username`, `email`, `password`, `balance`) VALUES ('$username', '$email', '$password', $balance)");
    }

    public static function GetUser($username){
		$user = [];
    	$result = Database::ExecQuery("SELECT `username`, `email`, `password`, `balance` FROM `user` WHERE `username` = '$username';");
        if ($result) {
    		while($row = $result->fetch_assoc()) {
    			$user = $row;
    		}
        }
        return $user;
    }

    public static function SetUserBalance($username, $balance){
    	Database::ExecNonQuery("UPDATE `user` SET `balance` = $balance WHERE `username` = '$username';");
    }
}