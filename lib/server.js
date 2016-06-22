var logger = require('morgan');
var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var less = require('express-less');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var compress = require('compression');
var path = require('path');
var debug = require('debug')('lodge:lib:server');
var socketIO = require('socket.io')();

module.exports = function(port, watch) {
	
	var ENVIRONMENT = app.get('env');
	
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
				compress: ENVIRONMENT == 'production',
				debug: ENVIRONMENT == 'development'
			}
		)
	);
	
	//json
	app.all('/json/:page', initAPI, function(req, res) {
		debug('json request', req.params, req.query)
		res.apiResponse({
			success: "true",
			page: '<h1>Hi there</h1>'
		});
	});
	
	// everything else
	app.all('*', function(req, res) {
		res.sendFile(path.join(__dirname, '../', 'static', 'index.html'));
	});
	
	// start the socket server if hot reloading
	var Watcher = false;
	if(ENVIRONMENT == 'development') {
		//you can also supply an http server instance, that way it will run within your server, no need for extra port
		Watcher = require('chokidar-socket-emitter')({ app: server });
	}
	
	// add sockets
	debug('add socket to server');
	if(!Watcher) {
		var io = socketIO.attach(server);
	} else {
		var io = Watcher.io
	}
	this.Sockets(io);
	
	// start server
	server.listen(port || 11000);
	
	

}

function initAPI (req, res, next) {

	res.apiResponse = function (data) {
		if (req.query.callback) {
			res.jsonp(data);
		} else {
			res.json(data);
		}
	};

	res.apiError = function (key, err, msg, code) {
		msg = msg || 'Error';
		key = key || 'unknown error';
		msg += ' (' + key + ')';
		if (keystone.get('logger')) {
			console.log(msg + (err ? ':' : ''));
			if (err) {
				console.log(err);
			}
		}
		res.status(code || 500);
		res.apiResponse({ error: key || 'error', detail: err });
	};

	res.apiNotFound = function (err, msg) {
		res.apiError('data not found', err, msg || 'not found', 404);
	};

	res.apiNotAllowed = function (err, msg) {
		res.apiError('access not allowed', err, msg || 'not allowed', 403);
	};

	next();
};
