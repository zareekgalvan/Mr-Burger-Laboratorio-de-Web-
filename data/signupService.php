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
	$name = $_POST["username"];
	$email = $_POST["email"];
	$password = $_POST["password"];

	$sql = "SELECT email
	FROM User
	WHERE email = '$email'";

	$result = $conn->query($sql);

	if($result->num_rows != 0)
	{
		echo json_encode(array("status" => "FAILED"));
	}
	else {
		if ($password != "" && $name != "" && $email != "")
		{
			$sql = "INSERT INTO User (username, email, passwrd) VALUES
					('$name', '$email', '$password')";

			$result = $conn->query($sql);

			if($result != null)
			{
				echo json_encode(array("status" => "SUCCESS"));
			}
		}
		else {
			echo json_encode(array("status" => "MISSING"));
		}

	}
}

$conn->close();
?>