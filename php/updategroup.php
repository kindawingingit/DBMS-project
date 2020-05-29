<?php

function val($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$groupid = val($_POST['groupid']);
$title = val($_POST['title']);
$description = val($_POST['description']);
$tags = val($_POST['tags']);
$members = val($_POST['members']);
$school = val($_POST['school']);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "university";

$conn = new mysqli($servername, $username, $password, $dbname);

if($conn->connect_error)
die("Connection failed: " .$conn->connect_error);

    $sql = "UPDATE ". $school ."_groups SET members='$members' , title='$title' ,description='$description' , tags='$tags' 
            WHERE groupid = '$groupid' ";

        if($conn->query($sql) === TRUE)
            {
                echo "Successfull";

            }
        else
            echo "Failed";
        $conn->close();
?>