<?php header('Access-Control-Allow-Origin: *');
include_once("connect.php");

$id = $_GET['id'];

$sql = "SELECT parentId
FROM parent  WHERE ApplicationID = '$id'";
$result = $conn->query($sql);
$myArr = array();

if($result->num_rows > 0){

while( $row = $result->fetch_assoc()) {
	$myArr[] = $row;
}
} else {
	echo "0 results";

}

$myJSON = json_encode($myArr);
echo $myJSON;
?>