import { EventEmitter } from 'events';
import { isFunction } from 'lodash';
import Debug from 'debug';
import fetchPolyfill from 'fetch'
if(typeof window.fetch == 'undefined' ) {
	// polyfill fetch
	window.fetch = fetchPolyfill
}

let debug = Debug('lodge:app:common:gab');

class Gab extends EventEmitter {
	constructor(props) {
		super(props)
	}
		
	request(route, moon, callback) {
		var _this = this;
		if(!isFunction(callback)) {
			callback = function(){};
		}
		if(!route) {
			var res = {
				success: false,
				message: 'No route defined.',
			}
			this.emit('request', res);
			return callback(res);
		}
		var	url = '/json/' + route;
		
		debug('request', url);
		
		var result = {
			success: false,
			slug: route
		}
		
		fetch(url, { mode: 'cors' })
			.then(r => {
				return r.json();
			})
			.then(data => {
				debug('request result', data);
				result.success = true;
				result.json = data.results;
				_this.emit('request', result);
				return callback(null, result);
			})
		.catch(e => {
			console.error('error fetching', e)
			debug('request error', e, res);
			result.message = e.message;
			_this.emit('request', result);
			return callback(result);			
		})
		
	}
	
	rawRequest(url, callback) {
		var _this = this;
		if(!isFunction(callback)) {
			callback = function(){};
		}
		
		debug('raw request', url);
		
		request
			.get(url)
			.set({
				'Accept': 'application/json'
			})
			.end(function(err, res) {
				debug('request result', err, res);
				var result = {
					success: false,
					page: res.body.page,
					slug: url
				}
				if(err) {
					result.message = err.status;
					_this.emit('request', result);
					return callback(result);
				} else {
					result.success = true;
					_this.emit('request', result);
					return callback(null, result);
				}
			});
		// end request
	}
}

export default new Gab()
