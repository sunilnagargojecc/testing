'use strict';
// Module Dependencies
// -------------------
var express     = require('express');
var bodyParser  = require('body-parser');
var errorhandler = require('errorhandler');
var http        = require('http');
var path        = require('path');
var request     = require('request');
var routes      = require('./routes');
var activity    = require('./routes/activity');

let Client = require('ssh2-sftp-client');
let sftp = new Client();

var app = express();

// Configure Express
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.raw({type: 'application/jwt'}));
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.methodOverride());
//app.use(express.favicon());

app.use(express.static(path.join(__dirname, 'public')));

// Express in Development Mode
if ('development' == app.get('env')) {
  app.use(errorhandler());
}

// HubExchange Routes
app.get('/', routes.index );
app.post('/login', routes.login );
app.post('/logout', routes.logout );

app.post('/example', (req, res) => {
 //res.send(req.body.filename + req.body.sourcename + req.body.sendername + req.body.msg);
 
	/*sftp.connect({
  host: '199.241.140.134',
  port: '4522',
  username: 'ccengage',
  password: 'CcEng#19Urls'
}).then(() => {
	// Push SMS file to ICS SFTP /upload/IN Folder
	 return sftp.rename('/ccengage/After30/Sunil.txt','/ccengage/After30/Sunil.csv')
	 	
  //return sftp.list('/ccengage/After30');
}).then(() => {
  console.log('Closing SFTP');
   //return sftp.rename('/ccengage/After30/Sunil.txt','/ccengage/After30/Sunil.csv')
   return sftp.end();
   
}).catch(err => {
  console.log(err, 'catch error');
});*/
 console.log('POST FORM BODY', req.body);
});

// Custom Hello World Activity Routes
app.post('/journeybuilder/save/', activity.save );
app.post('/journeybuilder/validate/', activity.validate );
app.post('/journeybuilder/publish/', activity.publish );
app.post('/journeybuilder/execute/', activity.execute );

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});