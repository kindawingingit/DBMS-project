<?php

function val($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$groupid = val($_POST['groupid']);
$school = val($_POST['school']);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "university";

$conn = new mysqli($servername, $username, $password, $dbname);

if($conn->connect_error)
die("Connection failed: " .$conn->connect_error);

    $sql = "SELECT studentid FROM ". $school ."_classrooms WHERE groupid = '$groupid' ";
   
    $result = $conn->query($sql);

        if($result->num_rows > 0)
            {
                $row = $result->fetch_all();
                echo json_encode($row);

            }
        else
            echo "Query: ". $sql . " Error: ". $conn->error;
        $conn->close();
?>