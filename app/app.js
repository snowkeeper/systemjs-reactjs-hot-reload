System
.import('/js/gblconfig.js')
	.then(function() {
			System
			.import('/app/config.js')
			.then(function() {
				System.trace = true;
				System.import('systemjs-hot-reloader').then(function(HotReloader){
					new HotReloader.default('http://localhost:8888')  // chokidar-socket-emitter port
				});
				System.import('dependencies').catch(console.error.bind(console));
				System.import('app/app').catch(console.error.bind(console));	

			}).catch(console.error.bind(console));

	}).catch(console.error.bind(console));


	
	

