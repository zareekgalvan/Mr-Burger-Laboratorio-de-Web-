<?php
	header('Content-type: application/json');
	require_once __DIR__ . '/dataLayer.php';

	$action = $_POST["action"];

	switch ($action) {
		case 'LOGIN':
			loginFunc();
			break;
		
		case 'COMMENTS':
			getComments();
			break;

		case 'POSTCOMM':
			postComm();
			break;

		case 'REGISTER':
			registerUser();
			break;
	}

	function loginFunc() 
	{
		$userEmail = $_POST["email"];
		$userPassword = $_POST["password"];

		$result = attemptLogin($userEmail, $userPassword);
		if ($result["status"]  == "SUCCESS") {
			setcookie("activeuser",$result["id"], time()+1728000,"/","",0);
			setcookie("activeusername", $result["username"],time()+1728000,"/","",0);
			setcookie("activeemail", $result["email"],time()+1728000,"/","",0);
			session_start();
			echo json_encode($result);
		}
		else
		{
			header('HTTP/1.1 500' . $result["status"]);
			die($result["status"]);
		}
	}

	function getComments()
	{
		$result = retrieveComments();
		if ($result) {
			echo json_encode($result);
		}
		else
		{
			header('HTTP/1.1 500' . $result["status"]);
			die($result["status"]);
		}
	}

	function postComm() 
	{
		$id = $_POST["id"];
		$comment = $_POST["body"];

		$result = tryPostComm($id, $comment);
		if ($result) {
			echo json_encode($result);
		}
		else
		{
			header('HTTP/1.1 500' . $result["status"]);
			die($result["status"]);
		}
	}

	function registerUser()
	{
		$name = $_POST["username"];
		$email = $_POST["email"];
		$password = $_POST["password"];

		$result = tryRegisterUser($name, $email, $password);
		if($result) {
			echo json_encode($result);
		}
		else
		{
			header('HTTP/1.1 500' . $result["status"]);
			die($result["status"]);
		}
	}



?>