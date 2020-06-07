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
$cid = val($_POST['courseid']);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "university";

$conn = new mysqli($servername, $username, $password, $dbname);

if($conn->connect_error)
die("Connection failed: " .$conn->connect_error);

    $sql = "DELETE FROM ". $school ."_groups_applications WHERE groupid like '%{$cid}%' AND applications = '$sid' ";

    if($conn->query($sql) === TRUE)
    {
        $sql = "UPDATE ". $school ."_classrooms SET GroupID = '$groupid' WHERE studentid = '$sid' ";

        if($conn->query($sql) === TRUE)
        {
            $newgroupid = $groupid . $sid;
            $sql = "UPDATE ". $school ."_classrooms SET GroupID = '$newgroupid' WHERE groupid = '$groupid' ";

            if($conn->query($sql) === TRUE)
            {
                $sql = "UPDATE ". $school ."_groups SET GroupID = '$newgroupid' WHERE groupid = '$groupid' ";
                
                if($conn->query($sql) === TRUE)
                    echo "Successfull";
                else
                    echo "Query: ". $sql ." Error: ". $conn->error;
            }
            else
                echo "Query: ". $sql ." Error: ". $conn->error;
        }
        else
            echo "Query: ". $sql ." Error: ". $conn->error;
    }
    else
        echo "Query: ". $sql ." Error: ". $conn->error;
    
    $conn->close();
?>