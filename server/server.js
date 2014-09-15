var express     = require('express'),
    creds       = require('./credentials/creds.js'),
    mysql       = require('mysql'),
    bodyParser  = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 3025);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.all('*',function(req,res,next){
    //Todo: Authenticate
    next();

});

/**
 * Gibt eine Liste sämtlicher Kundeneinträge des angegebenen Jahres im JSON Format aus
 *
 * @urlparam year - Das gewünschte Jahr {YY}
 */

app.get('/data/:year', function(req,res){

    var connection = mysql.createConnection(creds.data);

    var query = 'SELECT id,firma,ort,vorname,nachname,teilnahme,betreuer,partner,kinder FROM `wba_kunden` WHERE KAKTION  = ?';

    connection.connect();

    var formatedSQL = mysql.format(query, 'wba' + req.params.year);

    connection.query(formatedSQL, function(err, rows, fields) {
        if (err) throw err;

        res.json(rows);
    });

    connection.end();

});

/**
 * Überschreibt den angegebenen Datensatz mit neuem Inhalt
 *
 * @urlaparam id - Die ID des Datensatzes
 */

app.post('/:id',function(req,res){

    var connection = mysql.createConnection(creds.data);

    var haspartner;

    var query = 'UPDATE `wba_kunden` SET ' +
        'firma = ? ,' +
        'vorname = ? ,' +
        'nachname = ? ,' +
        'teilnahme = ? ,' +
        'partner = ? ,' +
        'kinder = ? ' +
        'WHERE id  = ?';

    connection.connect();

    switch(req.body.data.teilnahme[0]){
        case 50:
            req.body.data.teilnahme = '2';
            break;
        case 49:
            req.body.data.teilnahme = '1';
            break;
        case 48:
            req.body.data.teilnahme = '0';
            break;
    }

    haspartner = req.body.data.partner ? 1 : 0;
    req.body.data.partner = req.body.data.partner ? req.body.data.partner : ' ';

    var inserts = [
        req.body.data.firma,
        req.body.data.vorname,
        req.body.data.nachname,
        req.body.data.teilnahme,
        req.body.data.partner,
        req.body.data.kinder,
        parseInt(req.params.id)
    ];

    var formatedSQL = mysql.format(query, inserts);

    console.dir(formatedSQL);

    connection.query(formatedSQL, function(err, rows, fields) {
        if (err) throw err;

        res.send(200).end();
    });

    connection.end();

});

app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});