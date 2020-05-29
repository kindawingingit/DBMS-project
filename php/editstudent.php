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

$sql = "UPDATE students_profiles SET Skills='$skills' WHERE studentid = '$id' AND courseid = '$cid'";

    if($conn->query($sql) === TRUE)
        {
            echo "Succesfull";
        }
    else
        echo "Query: ". $sql2. "Error: ". $conn->error;

$conn->close();
?>