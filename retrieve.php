<?php
include( 'dbConnection.php' );

// Retrieve Student Information
$sql = 'SELECT * FROM student';
$result = $conn->query( $sql );
if ( $result->num_rows > 0 ) {
    $data = array();
    while( $row = $result->fetch_assoc() ) {
        $data[] = $row;
    }
}

//Converts array( php ) to JSON formate //returning JSON Formate data as response to ajax call

echo json_encode( $data );

?>