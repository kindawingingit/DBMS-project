<?php

function val($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$cid = $_POST['id'];
$slot = $_POST['slot'];
$fid = $_POST['facultyid'];
$school = $_POST['school'];
$classroom = $_POST['classroom'];

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "university";

$conn = new mysqli($servername, $username, $password, $dbname);

if($conn->connect_error)
die("Connection failed: " .$conn->connect_error);

$sql = "INSERT INTO ". $school ." (facultyid, courseid, slot, classroom)
         VALUES ('$fid', '$cid' , '$slot', '$classroom')";

if($conn->query($sql) === TRUE)
{
    echo "Succesfull";
}
else
      echo "Query: ". $sql. "Error: ". $conn->error;

$conn->close();
?>