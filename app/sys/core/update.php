<?php

use va\sys\database\Database as Database;
include_once "../Classes/Database.php";

$post = json_decode(file_get_contents('php://input'));

$id             = $post->id;
$firstname      = $post->firstname;
$lastname       = $post->lastname;
$caretaker      = $post->lastname;
$company        = $post->company;
$participation  = $post->participation;
$partner        = $post->partner;
$children       = $post->children;

$db = new Database();

$stmnt = $db->db->prepare("UPDATE `wba_kunden` SET firma = :firma, vorname = :vorname, nachname = :nachname, teilnahme = :teilnahme,partner = :partner,partner_dabei = :pd, Kinder = :kinder where id = :id and KAKTION = 'WBA13'");

$stmnt->bindValue(':firma',$company,\PDO::PARAM_STR);
$stmnt->bindValue(':vorname',$firstname,\PDO::PARAM_STR);
$stmnt->bindValue(':nachname',$lastname,\PDO::PARAM_STR);
$stmnt->bindValue(':teilnahme',$participation,\PDO::PARAM_STR);
$stmnt->bindValue(':partner',$partner,\PDO::PARAM_STR);
$stmnt->bindValue(':kinder',$children,\PDO::PARAM_STR);
$stmnt->bindValue(':id',$id,\PDO::PARAM_STR);

if($partner == ""){
    $stmnt->bindValue(':pd',0,\PDO::PARAM_STR);
}
else{
    $stmnt->bindValue(':pd',1,\PDO::PARAM_STR);
}

$stmnt->execute();

echo json_encode($data);
return json_encode($data);
?>