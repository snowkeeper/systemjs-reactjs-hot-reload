var	_ = require('lodash');
var	debug = require('debug')('lodge:lib:socket');
var async = require("async");
var Listeners = require('./listeners');
var spawn = require('child_process').spawn;

function sockets() { 
	
	var exports = {};
	/**
	 * All exports are added to the snowstreams.prototype
	 */
	
	exports.listeners = Listeners;
	
	exports.Sockets = function(io) {
		var lodge = this;
		debug('fire socket server');
		// create a new connection for open requests
		lodge.io =  io.of('/lodge');
		lodge.io.on("disconnect", function(s) {
			debug('lodge socket disconnected');
		});
		lodge.io.on("connection", function(socket) {
			
			var listen = new lodge.listeners(lodge, socket);
			
			socket.on('ready', function() {
				debug('socket ready');
			});
			
			socket.on('status', function(data) {
				debug('socket status');
				listen.status(data);
				
			});			
			
			socket.on('json', function(data) {
				debug('socket json request');
				listen.json(data);
				
			});
			
		});
		
		
		
	}
	
		/**
	 * Emitter events for server
	 * 
	 * */
	exports.talk = function(emit, data) {
		if(!_.isArray(emit)) {
			emit = [emit];
		}

		emit.forEach((v, k) => {
			//debug('event emit', emit, data);
			this.emit(v, data);
		});
			
	}
	exports.talking = function(listenFor, run) {
		this.on(listenFor, run);
	}
	exports.onTalks = exports.talking;
	
	exports.onTalk = function(listenFor, run) {
		this.once(listenFor, run);
	}
	exports.removeTalk = function(event, remove) {
		
		this.removeListener(event, remove);
	}
	exports.listenerRemove = function(event, remove) {
		if(this.io) {
			this.io.removeListener(event, remove);
		}
		this.removeListener(event, remove);
	}
	
	/**
	 * Emitter events for  socket
	 * 
	 * */
	exports.squawk = function(emit, data) {
		if(!_.isArray(emit)) {
			emit = [emit];
		}

		emit.forEach((v, k) => {
			if(this.io) {
				debug('socket emit', v);
				this.io.emit(v, data);
			}
			
		});
		return this;
	}
	exports.onSquawking = function(listenFor, run) {
		if(this.io) {
			this.io.on(listenFor, run);
		}
		return this;
	}
	exports.onSquawk = function(listenFor, run) {
		if(this.io) {
			this.io.once(listenFor, run);
		}
		return this;
	}
	exports.RemoveSquawk = function(event, remove) {
		if(this.io) {
			this.io.removeListener(event, remove);
		}
		return this;
	}
	
	return exports;
}

module.exports = sockets;


