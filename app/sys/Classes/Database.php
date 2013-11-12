<?php

namespace va\sys\database;
include_once "../config/db-cred.inc.php";

class Database {

    /**
     * User: schreyerj
     *
     * Handles database functions such as connecting and basic queries
     *
     * @author  Jan Schreyer
     * @since   version 0.1
     * @version 0.3
     * @license wtfpl.net
     *
     */

    /**
     * @var object the main database object to work with
     */

    public $db;
    public $options;

    /**
     * @var     bool connection state indicator
     * @return  true if connection is established
     *          false if not
     */
    public $isConnected;

    /**
     * Checks for an existing database object and creates one if none is found
     *
     * @since 0.1
     */
    public function __construct($options = array(\PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\'',
                                                 \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION)){

        // if no options are given, set charset to UTF8 and make PDO throw exceptions
        $this->options = $options;

        // Try to establish a connection to given database

        try{

            $this->db = new \PDO('mysql:host='.DB_SERVER.';dbname='.DB_DB,  DB_USER,    DB_PASSWORD,    $options);

            $this->isConnected = true;
            return true;
        }

        catch(\PDOException $ex){
            $this->isConnected = false;
            return $ex->getMessage();
        }

    }

    public function insert(){

    }

    public function disconnect(){
        $this->db = null;
        $this->isConnected = false;
    }

}

?>