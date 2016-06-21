require('dotenv').config();
var util = require('util');
var _ = require('lodash');
var EventEmitter = require("events").EventEmitter;
var debug = require('debug')('lodge');

/**
 * Lodge Class
 *
 * @api public
 */

var Lodge = function() {
	this._options = {};
	this.version = require('../package.json').version;
	EventEmitter.call(this);
}

/**
 * attach the event system to RepoManager 
 * */
util.inherits(Lodge, EventEmitter);


/**
 * include the prototype funtions
 *
 * @api public
 */
_.extend(Lodge.prototype, require('./lib/socket')());


/**
 * 
 * Simple web server
 * 
 * */
Lodge.prototype.serve = require('lib/server');
 
 
/**
 * The exports object is an instance of EPG.
 *
 * @api public
 */
var lodge = module.exports = exports = new Lodge();


