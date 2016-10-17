<?php
	header('Accept: application/json');
	header('Content-type: application/json');

	$servername = "localhost";
	$username = "root";
	$password = "root";
	$dbname = "MrBurger";

	$conn = new mysqli($servername, $username, $password, $dbname);

	if ($conn->connect_error)
	{
		header('HTTP/1.1 500 Bad connection to Database');
		die("The server is down, we couldn't establish the DB connection");
	}
	else 
	{
		$userEmail = $_POST["email"];
		$userPassword = $_POST["password"];

		$sql = "SELECT id, username, email
				FROM User
				WHERE email = '$userEmail' AND passwrd = '$userPassword'";

		$result = $conn->query($sql);

		if ($result->num_rows > 0)
		{
			while ($row = $result->fetch_assoc())
			{
				$response = array("id"=>$row["id"], "username"=>$row["username"], "email"=>$row["email"]);
				setcookie("activeuser",$row["id"], time()+1728000,"/","",0);
				setcookie("activeusername", $row["username"],time()+1728000,"/","",0);
				setcookie("activeemail", $row["email"],time()+1728000,"/","",0);
			}

			echo json_encode($response);
		}
		else
		{
			header('HTTP/1.1 406 User not found');
			die("Wrong credentials provided");
		}
	}

	$conn->close();
?>