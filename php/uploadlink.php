<?php

function val($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$school = val($_POST['school']);
$cid = val($_POST['courseid']);
$sid = val($_POST['studentid']);
$link = val($_POST['link']);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "university";

$conn = new mysqli($servername, $username, $password, $dbname);

if($conn->connect_error)
die("Connection failed: " .$conn->connect_error);

    $sql = "UPDATE ". $school ."_groups SET  github = '$link' WHERE groupid like '%{$cid}%' and groupid like '%{$sid}%'  ";

        if($conn->query($sql))
            {
                echo "Successfull";

            }
        else
            echo "Query : ". $sql ." Error : ". $conn->error;
        $conn->close();
?>