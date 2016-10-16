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
		$id = $_POST["id"];
		$comment = $_POST["body"];

		$sql = "INSERT INTO Comments (user_id, body) VALUES
				('$id', '$comment')";

		$result = $conn->query($sql);
	}

	$conn->close();
?>