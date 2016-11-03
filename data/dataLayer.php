<?php

	function connectionToDataBase(){
		$servername = "localhost";
		$username = "root";
		$password = "root";
		$dbname = "MrBurger";

		$conn = new mysqli($servername, $username, $password, $dbname);
		
		if ($conn->connect_error){
			return null;
		}
		else{
			return $conn;
		}
	}

	function attemptLogin($userEmail, $userPassword){

		$conn = connectionToDataBase();

		if ($conn != null){
			$sql = "SELECT id, username, email, passwrd
				FROM User
				WHERE email = '$userEmail'";
		
			$result = $conn->query($sql);

			if ($result->num_rows > 0)
			{
				$row = $result->fetch_assoc();
				$conn -> close();
				return array("status" => "SUCCESS", "id"=>$row["id"], "username"=>$row["username"], "email"=>$row["email"], "pass"=>$row["passwrd"]);
			}
			else{
				$conn -> close();
				return array("status" => "USERNAME NOT FOUND");
			}
		}else{
			$conn -> close();
			return array("status" => "CONNECTION WITH DB WENT WRONG");
		}
	}

	function retrieveComments() {
		$conn = connectionToDataBase();

		if ($conn != null){
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
		}
		
		else {
			$conn -> close();
			return array("status" => "CONNECTION WITH DB WENT WRONG");
		}
	}

	function tryPostComm($id, $comment)
	{
		$conn = connectionToDataBase();
		if ($conn != null){
			$sql = "INSERT INTO Comments (user_id, body) VALUES
				('$id', '$comment')";
			$result = $conn->query($sql);

			if ($result != null)
			{
				return array("status" => "SUCCESS");
			}
		}
		
		else {
			$conn -> close();
			return array("status" => "CONNECTION WITH DB WENT WRONG");
		}
	}

	function tryRegisterUser($name, $email, $password)
	{
		$conn = connectionToDataBase();
		if ($conn != null)
		{
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
		else {
			$conn -> close();
			return array("status" => "CONNECTION WITH DB WENT WRONG");
		}
	}

?>