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

    $sql = "SELECT applications  FROM ". $school ."_groups_applications WHERE groupid = '$groupid' " ;
    
   
    $result = $conn->query($sql);

        if($result->num_rows > 0)
            {
                echo "Found";

            }
        else
            echo "Not found";
        $conn->close();
?>