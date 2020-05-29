<?php

function val($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$groupid = $_POST['groupid'];
$sids = array($_POST['studentids']);
$n = count($sids);
$members = $_POST['members'];
$title = $_POST['title'];
$description1 = $_POST['description'];
$tags = $_POST['tags'];
$school = $_POST['school'];

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "university";

$conn = new mysqli($servername, $username, $password, $dbname);

if($conn->connect_error)
die("Connection failed: " .$conn->connect_error);

$ctr = 0;
    for($i = 0; $i <= $n; $i++){
        $sid  = $sids[0][$i];
        $sql1 = "UPDATE ". $school ."_classrooms SET groupid = '$groupid' WHERE StudentID = '$sid' ";  
                if($conn->query($sql1) == TRUE)
                {
                    $ctr++;
                }
                else
                echo "Query: ". $sql1 . " Error: ". $conn->error;
    }

        if($ctr > 0)
        {
            $sql3 = "INSERT INTO ". $school ."_groups (groupid, members, title, description, tags)
                     VALUES ('$groupid', '$members', '$title', '$description1', '$tags') ";
            
            if($conn->query($sql3) === TRUE)
                echo "Successfull";
            else
                echo "Query: ". $sql3 . " Error: ". $conn->error;
        }
        
    $conn->close();
?>