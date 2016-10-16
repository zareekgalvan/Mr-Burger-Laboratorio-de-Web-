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
		$sql = "SELECT User.id as id, User.username as username, User.email as email, Comments.body as body
				FROM Comments
				JOIN User
					ON User.id = Comments.user_id";

		$result = $conn->query($sql);

		if ($result->num_rows > 0)
		{
			$response = array();
			while ($row = $result->fetch_assoc())
			{
				$response[] = $row;
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