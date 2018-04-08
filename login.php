<?php
function gen($length){
	$chars = 'abdefhiknrstyzABDEFGHKNQRSTYZ23456789';
	$numChars = strlen($chars);
	$string = '';
	for ($i = 0; $i < $length; $i++) {
		$string .= substr($chars, rand(1, $numChars) - 1, 1);
	}
	return $string;
}

$link = mysqli_connect('localhost', 'u801300389_root', 'XCVsdf2134123','u801300389_bmdat');
$is_login = 0;
if(isset($_POST['token'])||( isset($_POST['login'])&&isset($_POST['password']) ))
{
	if(isset($_POST['token']))
	{
		$s = file_get_contents('http://ulogin.ru/token.php?token=' . $_POST['token'] . '&host=' . $_SERVER['HTTP_HOST']);
		$user = json_decode($s, true);
        //$user['network'] - соц. сеть, через которую авторизовался пользователь
        //$user['identity'] - уникальная строка определяющая конкретного пользователя соц. сети
		$query = 'SELECT COUNT(*) FROM users WHERE network="'.$user['network'].'" AND id_network="'.$user['identity'].'"';
		echo('FIRST QUERY: '.$query.'<br>');
		$result = mysqli_query($link,$query);
		$result = mysqli_fetch_array($result);
		$is_login = $result['COUNT(*)'];
		if($is_login==0)
		{
			$query = 'INSERT INTO users(network,id_network,hash) VALUES("'.$user['network'].'","'.$user['identity'].'","'.md5(gen(16)).'")';
			$result = mysqli_query($link,$query);
		}
		$query = 'SELECT * FROM users WHERE network="'.$user['network'].'" AND id_network="'.$user['identity'].'"';
		$result = mysqli_query($link,$query);
		$result = mysqli_fetch_array($result);
		$time = time()+60*60*24*30*12*3;
		setcookie('id',$result['id_user'],$time);
		setcookie('hash',$result['hash'],$time);
		if($is_login==0)
		{
			$query = 'INSERT INTO settings(id_user) VALUES("'.$result['id_user'].'")';
			mysqli_query($link,$query);
		}
		header('Location: index.php');
		exit;		
	}
	else
	{
		$login = strtolower($_POST["login"]);
		$query = 'SELECT COUNT(*) FROM users WHERE login="'.$login.'"';
		$result = mysqli_query($link,$query);
		$result = mysqli_fetch_array($result);
		$is_login = $result['COUNT(*)'];
		if($is_login==0)
		{
			$query = 'INSERT INTO users(login,password,hash) VALUES("'.$login.'","'.md5(md5($_POST["password"])).'","'.md5(gen(16)).'")';
			$result = mysqli_query($link,$query);
		}
		$query = 'SELECT * FROM users WHERE login="'.$login.'"';
		$result = mysqli_query($link,$query);
		$result = mysqli_fetch_array($result);
		$pass = $result['password'];
		if($is_login==0)
		{
			$query = 'INSERT INTO settings(id_user) VALUES("'.$result['id_user'].'")';
			mysqli_query($link,$query);
		}
		if($pass==md5(md5($_POST["password"])))
		{
			$time = time()+60*60*24*30*12*3;
			setcookie('id',$result['id_user'],$time);
			setcookie('hash',$result['hash'],$time);
			header('Location: index.php');
			exit;
		}	
	}
}
header('Location: index.php?state=fail');
exit;
?>