<?php

function val($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$schoolid = val($_POST['schoolid']);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "university";

$conn = new mysqli($servername, $username, $password, $dbname);

if($conn->connect_error)
die("Connection failed: " .$conn->connect_error);

    if($schoolid == "all")
    $sql = "SELECT * FROM courses";
    else
    $sql = "SELECT * FROM courses where courseid like  '{$schoolid}%' "; 
    $result = $conn->query($sql);

        if($result->num_rows > 0)
            {
                $row = $result->fetch_all();
                echo json_encode($row);

            }
        else
            echo "Query: ". $sql ."Error: ". $conn->error;
        $conn->close();
?>