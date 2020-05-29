<?php

function val($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$sid = val($_POST['sid']);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "university";

$conn = new mysqli($servername, $username, $password, $dbname);

if($conn->connect_error)
die("Connection failed: " .$conn->connect_error);

    $sql = "SELECT studentname, phone FROM students where studentid='$sid'"; 
    $result = $conn->query($sql);

        if($result->num_rows > 0)
            {
                $row = $result->fetch_all();
                echo json_encode($row);

            }
        else
            echo "Failed";
        $conn->close();
?>