<?php

function val($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$id     = $_POST['studentid'];
$cid    = $_POST['courseid'];
$skills = $_POST['skills'];

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "university";

$conn = new mysqli($servername, $username, $password, $dbname);

if($conn->connect_error)
die("Connection failed: " .$conn->connect_error);


$sql = "INSERT INTO students_profiles (studentid, courseid, skills)
         VALUES ('$id', '$cid' , '$skills')";

if($conn->query($sql) === TRUE)
{
    echo "Successfull";
}
else
      echo "Query: ". $sql. "Error: ". $conn->error;

$conn->close();
?>