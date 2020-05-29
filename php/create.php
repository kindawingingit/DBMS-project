<?php

function val($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$school = val($_POST['school']);
$fname = val($_POST['name']);
$id = val($_POST['id']);
$pass = val($_POST['password']);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "university";

$conn = new mysqli($servername, $username, $password, $dbname);

if($conn->connect_error)
die("Connection failed: " .$conn->connect_error);

    $sql = "INSERT INTO " . $school ."_faculty (faculty, facultyid, password) 
        VALUES ('$fname', '$id', '$pass')";

    if($conn->query($sql) === TRUE)
    {
       echo "Succesfull";
    }
    else
    echo "Faculty ID already exists.";
$conn->close();
?>