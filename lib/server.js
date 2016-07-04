var keystone = require('keystone');
var Live = require('keystone-live');
var less = require('express-less');
var path = require('path');
var debug = require('debug')('lodge:lib:server');
var ENVIRONMENT;

module.exports = function(port, watch) {
	
	var Lodge = this;
	
	keystone.init({
		'name': 'romboxes.com',
		'admin path': 'lodge',
		'brand': 'inquisive',
	
		'less': '../static',
		'static': '../static',
		'favicon': '../static/favicon.ico',
		//'views': 'templates/views',
		//'view engine': 'jade',
		'auto update': true,
		'auth': true,
		'user model': 'User',
		'port': port || 11000,
		'cookie secret': 'hitresurechestnamesintherestyesterday'
	})
	
	// add models
	keystone.import('./models');

	Live.init(keystone);

	keystone.set('routes', function(app) {
		ENVIRONMENT = app.get('env');
		
		var opts = {
		  exclude: '_id,__v',
		  route: 'galleries',
		  paths: {
			get: 'find',
			create: 'new'
		  }
		}
		Live.
		  apiRoutes('Post').
		  apiRoutes('Gallery',opts);
		  
				//serve
		//app.use('/', keystone.express.static(path.join(__dirname, '../', 'static')));
		app.use('/app', keystone.express.static(path.join(__dirname, '../', 'app')));
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
		app.all('/json/:page', keystone.middleware.api, function(req, res) {
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

	});
	
	keystone.set('nav', {
		'Site': ['users', 'posts', 'enquiries', 'galleries', 'post-categories'],
		'Entities': ['brands', 'manus', 'chips'],
		'Specs': [ 'specs', 'spec-types'],
		'Rom Boxes': ['rom-boxes', 'rom-box-categories'],
		'Meta': ['tools', 'how-tos', 'forum-posts', 'roms'],
		
	});
	
	keystone.start({
		onStart: function() {
			Live.
				apiSockets();//.
				//listEvents();
				
			// start the watch emitter if hot reloading
			if(ENVIRONMENT == 'development') {
				var Watcher = require('chokidar-socket-emitter')({ io: Live.io });
			}
			
			// add sockets
			Lodge.Sockets(Live.io);
		}
	});	

}

