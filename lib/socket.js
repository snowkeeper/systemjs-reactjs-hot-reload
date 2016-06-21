var	_ = require('lodash');
var	debug = require('debug')('epg:lib:socket');
var async = require("async");
var Listeners = require('./listeners');
var spawn = require('child_process').spawn;

function sockets() { 
	
	var exports = {};
	/**
	 * All exports are added to the snowstreams.prototype
	 */
	
	exports.listeners = Listeners;
	
	exports.socketRoutes = function(io) {
		var epg = this;

		// create a new connection for open requests
		epg.io =  io.of('/epg');
		epg.io.on("disconnect", function(s) {
			debug('epg socket disconnected');
		});
		epg.io.on("connection", function(socket) {
			
			var listen = new epg.listeners(epg, socket);
			
			socket.on('ready', function() {
				debug('socket ready');
			});
			
			socket.on('status', function(data) {
				debug('socket status');
				listen.status(data);
				
			});			
			
			
		});
		
		
		
	}
	
	return exports;
}

module.exports = sockets;


