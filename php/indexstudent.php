<?php

function val($data){
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$sid = val($_POST['sid']);
$pass = val($_POST['password']);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "university";

$conn = new mysqli($servername, $username, $password, $dbname);

if($conn->connect_error)
die("Connection failed: " .$conn->connect_error);

$mysql = "SELECT password FROM students WHERE studentid='$sid'"; 
$result = $conn->query($mysql);

if($result->num_rows > 0)
{
    while($row = $result->fetch_assoc()){
        if($pass == $row['password'])
        echo "Succesfull";
    }
}
else
echo "Failed";