<?php

use va\sys\database\Database as Database;
include_once "../Classes/Database.php";

$post = json_decode(file_get_contents('php://input'));

$db = new Database();

$result = $db->db->query("SELECT id,firma,ort,vorname,nachname,teilnahme,betreuer  FROM `wba_kunden` WHERE KAKTION  = 'WBA13'");

if($result->rowCount() <= 0){
    throw new \Exception("error");
}

$data = array();

while($temprow = $result->fetch(\PDO::FETCH_ASSOC))
{
    $temp = array();

    $temp['Nachname'] = $temprow['nachname'];
    $temp['Vorname'] = $temprow['vorname'];
    $temp['Firma'] = $temprow['firma'];
    $temp['Ort'] = $temprow['ort'];
    $temp['Teilnahme'] = $temprow['teilnahme'];
    $temp['Betreuer'] = $temprow['betreuer'];

    array_push($data,$temp);
}

echo json_encode($data);
return json_encode($data);
?>