<?php

function val($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$school = val($_POST['school']);
$name  = val($_POST['name']);
$id     = val($_POST['id']);
$pass   = val($_POST['password']);
$phone  = val($_POST['phone']);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "university";

$conn = new mysqli($servername, $username, $password, $dbname);

if($conn->connect_error)
die("Connection failed: " .$conn->connect_error);

    $sql = "INSERT INTO students (schoolid, studentid, studentname,  password, phone) 
        VALUES ('$school', '$id', '$name',  '$pass', $phone)";

    if($conn->query($sql) === TRUE)
    {
       echo "Succesfull";
    }
    else
    echo "Student ID already exists.";
$conn->close();
?>