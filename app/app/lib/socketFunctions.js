import debugging from 'debug';
let	debug = debugging('lodge:app:lib:socketFunctions');

let randomNumber = Math.random;

function options() {
	 
	var exports = {};
	
	exports.trapResponse = function(socket, callback) {
		
		var unique = randomNumber();
		
		socket.once(unique, callback);
		
		return unique;
	}
	exports.trap = exports.trapResponse;
	
	exports.json = function(slug) {
		var nowTime = new Date().getTime();
		var newTime = new Date(nowTime + 10000).getTime();
		
		if(snowUI.watingForPage && snowUI.waitTimeout > nowTime ) {
			console.warn('SOCKET not sent', snowUI.waitTimeout, nowTime);
			return false;
		}
		
		snowUI.watingForPage = true;
		snowUI.waitTimeout = newTime;
		debug('send socket json request', slug);
		this.io.emit('json', { slug });
	};
	
	exports.status = function(callback) {
		debug('get status');
		if(!callback) {
			callback = ()=>{}
		}
		this.io.emit('status',{ 
			iden: this.trap(this.io, callback)
		});
	};
	
	
	
	return exports;
	
}

export default options;
