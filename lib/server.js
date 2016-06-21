var logger = require('morgan');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var less = require('express-less');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var compress = require('compression');

module.exports = function(port) {

	// add express middleware
	app.use(logger('dev'));
	app.enable('trust proxy');	
	app.use(compress());
	app.use(methodOverride());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));	

	//serve
	app.use('/', express.static(path.join(__dirname, '../', 'static')));
	app.use('/app', express.static(path.join(__dirname, '../', 'app')));
	app.use(
		'/css',
		less(
			path.join(__dirname, '../', 'app', 'styles'),
			{ 
				compress: app.get('env') == 'production',
				debug: app.get('env') == 'development'
			}
		)
	);
	  
	// start server
	server.listen(port || 11000);

}
