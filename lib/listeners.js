var	_ = require('lodash');
var	debug = require('debug')('epg:lib:core:listeners');
var async = require("async");
var request = require('superagent');
var hat = require('hat');
var moment = require('moment');
var epg;
var util = require('util');

var Listeners = function(epg1, socket1) {
	epg = epg1;
	this.socket = socket1;
}
_.extend(Listeners.prototype, {	
	
	emit(emit, data) {
		if(!_.isArray(emit)) {
			emit = [emit];
		}

		emit.forEach((v, k) => {
			debug('socket emit', v);
			this.socket.emit(v, data);
		});
			
	},
	broadcast(emit, data) {
		if(!_.isArray(emit)) {
			emit = [emit];
		}

		emit.forEach((v, k) => {
			debug('socket broadcast', v);
			this.socket.broadcast.emit(v, data);
		});
			
	},
	status( data ) {
		debug('Agent grab status', data)
		epg.onTalk('status', (results) => {
			this.emit(['status', data.iden], results);
			if(data._broadcast) {
				this.broadcast(['status', data.iden], results);
			} 
		});
		epg.agent.status(data);
			
	},
});

module.exports = exports = Listeners;

function isFalse( val ) {
	if(val == 'false') val = false;
	//debug('',typeof val === 'boolean' , !val, typeof val === 'boolean' && !val);
	return (typeof val === 'boolean' && !val)
}
			
