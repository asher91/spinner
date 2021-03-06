<?php
session_start();
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

/*header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);*/
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

//if(!isset($_GET["debug"])){
//	error_reporting(0);
//}


require '../vendor/autoload.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$app = new \Slim\App(['settings' => $config]);

$container = $app->getContainer();
$container['view'] = new \Slim\Views\PhpRenderer('../templates/');

$app->get('/', function (Request $request, Response $response) {
	if(file_exists('../app/InitDatabase.php')){
		require_once('../app/InitDatabase.php');
		rename('../app/InitDatabase.php', '../app/InitDatabase-bck.php');
	}
    $response = $this->view->render($response, 'home.phtml', ['router' => $this->router]);
    return $response;
});

$app->get('/unit/{a}/{b}/{c}', function (Request $request, Response $response, array $args) {
    require_once '../app/UserRepository.php';
    $a = $args['a'];
    $b = $args['b'];
    $c = $args['c'];
    return $response;
});

$app->post('/game/{name}', function (Request $request, Response $response, array $args) {
    require_once '../app/GameRepository.php'; 
    require_once '../app/Encryption.php';

    if(isset($_SESSION["token"]) && isset($_SESSION["data"])){
        $user = json_decode(Encryption::Decrypt($_SESSION["data"], $_SESSION["token"]));
        $user->auth = true;
    }else{
        $user["username"] = "";
        $user["password"] = "";
        $user["balance"] = 1000;
        $user["auth"] = false;
    }

    $name = $args['name'];

    $settings = (object) array();
    $settings->game = GameRepository::GetGame($name);
    $settings->user = $user;

    $response->getBody()->write(json_encode($settings));
    return $response;
});

$app->post('/login', function (Request $request, Response $response, array $args) {
    require_once '../app/UserRepository.php';
    require_once '../app/Encryption.php';

    $user = UserRepository::GetUser($_POST["username"]);

    if(isset($user["password"]) && md5($_POST["password"])==$user["password"]){
        $user["auth"] = true;
        $user["token"] = md5(time().$user["password"]);
        $user["data"] = Encryption::Encrypt(json_encode($user), $user["token"]);
        
        $_SESSION["data"] = $user["data"];
        $_SESSION["token"] = $user["token"];

    }else{
        $user["username"] = $_POST["username"];
        $user["password"] = "";
        $user["auth"] = false;
    }

    $response->getBody()->write(json_encode($user));
    return $response;
});

$app->post('/logout', function (Request $request, Response $response, array $args) {
    return session_destroy();
});

$app->post('/register', function (Request $request, Response $response, array $args) {
    require_once '../app/UserRepository.php';
    require_once '../app/Encryption.php';

    $user = UserRepository::GetUser($_POST["username"]);
    if(isset($user["password"])){
        $user["username"] = $_POST["username"];
        $user["password"] = "";
        $user["auth"] = false;
    }else{
        $user["username"] = $_POST["username"];
        $user["email"] = $_POST["email"];
        $user["balance"] = 1000;
        $user["password"] = md5($_POST["password"]);

        UserRepository::CreateUser($user["username"], $user["email"], $user["password"], $user["balance"]);

        $user["auth"] = true;
        $user["token"] = md5(time().$user["password"]);
        $user["data"] = Encryption::Encrypt(json_encode($user), $user["token"]);
        $_SESSION["data"] = $user["data"];
        $_SESSION["token"] = $user["token"];
    }

    $response->getBody()->write(json_encode($user));
    return $response;
});


$app->get('/spin/{name}/{odd}/{stake}', function (Request $request, Response $response, array $args) {
    require_once '../app/GameRepository.php'; 
    require_once '../app/UserRepository.php';
    require_once '../app/Encryption.php';

    $name = $args['name'];
    $game = GameRepository::GetGame($name);

    $result = (object) array();
    $result->odd = $args['odd'];
    $result->stake = $args['stake'];
    $result->spin = rand(1, count($game->sections));
    $result->outcome = $game->sections[count($game->sections) - $result->spin];

    if(isset($_SESSION["data"]) && isset($_SESSION["token"])){
        $userdata = json_decode(Encryption::Decrypt($_SESSION["data"], $_SESSION["token"]));
        $user = UserRepository::GetUser($userdata->username);
        if($user["balance"]<$result->stake){
            $result->spin = 0;
            $result->outcome = $game->sections[0];
        }else{
            $user["balance"]-=$result->stake;
            if($result->outcome->value==$result->odd){
                $user["balance"]+= $result->stake * $result->odd;
            }else if($result->outcome->value=="Spin"){
                $user["balance"]+= $result->stake;
            }
            $_SESSION["data"] = Encryption::Encrypt(json_encode($user), $_SESSION["token"]);
            UserRepository::SetUserBalance($user["username"], $user["balance"]);

            $username = $user["username"];
            $balance = $user["balance"];
        }
    }
    return json_encode($result);
});

$app->run();