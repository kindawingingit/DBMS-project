<?php

function val($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$sid = val($_POST['studentid']);
$groupid = val($_POST['groupid']);
$school = val($_POST['school']);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "university";

$conn = new mysqli($servername, $username, $password, $dbname);

if($conn->connect_error)
die("Connection failed: " .$conn->connect_error);

    $sql = "INSERT INTO ". $school ."_groups_applications(GroupID, Applications) VALUES ('$groupid', '$sid')";

    if($conn->query($sql) === TRUE)
    echo "Successfull";
    else
    echo "Query: ". $sql ." Error: ". $conn->error;
    
    $conn->close();
?>