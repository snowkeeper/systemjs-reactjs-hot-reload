/**
 * 
 * global object to use across your client side code
 * 
 * */
var snowUI = {
	materialStyle: {
	
	},
	materialTheme: 'light',
	namespace: '/lodge',
	usesockets: true,
	port: 8888,
	host: '@',
	homepage: 'home',
	breaks: {
		xs: {
			width: 480
		},
		sm: {
			width: 768
		},
		md: {
			width: 992
		},
		lg: {
			width: 1200
		}
	}
}

/* run code on start and end lifecycles */
snowUI.code = {
	__mountedUI: (callback) => {
		
	},
	__mountedPage: (callback) => {
		
	},
	__unmountUI: (callback) => {
		
	},
	__unmountPage: (callback) => {
		
	}
	
}

/* change the theme */
snowUI.toggleTheme = function() {
	$('body').toggleClass(snowUI.themeToToggle);
	return false;
}

snowUI.setTheme = function(setclass) {
	document.body.className = setclass;
	return false;
}

// fade the content div
snowUI.fadeOut = function(speed = 400, callback) {
	if(typeof callback !== 'function') {
		callback = function() {};
	}
	$("#content-fader").animate({opacity: 0}, speed, callback);
}
snowUI.fadeIn = function(speed = 400, callback) {
	if(typeof callback !== 'function') {
		callback = function() {};
	}
	$("#content-fader").animate({opacity: 1}, speed, callback);
}

// sticky menu
snowUI.unstickyMenu = function() {
	var simpledocs = document.getElementById('react-hot-reload');
	if(simpledocs && typeof simpledocs.removeEventListeners === 'function') {
		simpledocs.removeEventListeners();
	}
}
snowUI.stickyMenu = function() {
	
	var simpledocs = document.getElementById('react-hot-reload');
	simpledocs.addEventListener("scroll", scroller);
	
	function scroller(){ 
		
		var clientWidth = document.documentElement.clientWidth;
		
		if(clientWidth < snowUI.breaks.sm.width) {
			var $stickyMenu = $('.stickyMenu');
			if (!!$stickyMenu.offset()) { 
				if (simpledocs.offsetTop > 35){
					$stickyMenu.css({ zIndex: 1000, position: 'fixed', top: 0 });;
				} else {
					$stickyMenu.css('position', 'relative');
				}
			} 
		}
		
		var appbarTitle = document.getElementById('appbarTitle');
		var menu = document.getElementById('menu');
		
		if(snowUI.shortenTitle && simpledocs.scrollTop > 35) {
			appbarTitle.style.width = menu.clientWidth - 60 +'px';
			appbarTitle.style.overflow = 'hidden';
		} else if(snowUI.shortenTitle) {
			appbarTitle.style.width = 'initial';
			appbarTitle.style.overflow = 'initial';
		}	
	}
}
