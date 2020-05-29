<?php

function val($data){
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$school = val($_POST['school']);
$facultyid = val($_POST['facultyid']);
$pass = val($_POST['password']);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "university";

$conn = new mysqli($servername, $username, $password, $dbname);

if($conn->connect_error)
die("Connection failed: " .$conn->connect_error);

$mysql = "SELECT password FROM " . $school ."_faculty WHERE facultyid='$facultyid'"; 
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