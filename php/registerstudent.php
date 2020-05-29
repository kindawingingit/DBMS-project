<?php

function val($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$sid = $_POST['studentid'];
$school = $_POST['school'];
$classroom = $_POST['classroom'];

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "university";

$conn = new mysqli($servername, $username, $password, $dbname);

if($conn->connect_error)
die("Connection failed: " .$conn->connect_error);

$sql = "INSERT INTO ". $school ."_classrooms (studentid, classroom)
         VALUES ('$sid', '$classroom')";

if($conn->query($sql) === TRUE)
{
    echo "Succesfull";
}
else
      echo "Query: ". $sql. "Error: ". $conn->error;

$conn->close();
?>