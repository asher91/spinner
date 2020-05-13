<?php
class Encryption{	
    public static function Encrypt($text, $key){
		return openssl_encrypt($text, "AES-128-CTR", $key, 0, '1234567891011121'); 
    }
	public static function Decrypt($text, $key){
		return openssl_decrypt($text, "AES-128-CTR", $key, 0, '1234567891011121'); 
    }
}