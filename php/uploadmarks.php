<?php

function val($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$school = val($_POST['school']);
$groupid = val($_POST['groupid']);
$review1 = val($_POST['review1']);
$review2 = val($_POST['review2']);
$review3 = val($_POST['review3']);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "university";

$conn = new mysqli($servername, $username, $password, $dbname);

if($conn->connect_error)
die("Connection failed: " .$conn->connect_error);

    $sql = "UPDATE ". $school ."_groups SET  review1 = '$review1' , review2 = '$review2' ,review3 = '$review3' WHERE groupid = '$groupid' ";

        if($conn->query($sql))
            {
                echo "Successfull";

            }
        else
            echo "Query : ". $sql ." Error : ". $conn->error;
        $conn->close();
?>