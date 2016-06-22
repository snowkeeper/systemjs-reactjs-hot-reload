import Home from './pages/home';
import Status from './pages/status';
import Page from './pages/page';
import Fetch from './pages/fetch';
import { isObject } from 'lodash';
import Debug from 'debug';
import fourofour from './pages/404.js';

let debug = Debug('lodge:app:routes');

let routes = {
	status: Status,
	page: Page,
	fetch: Fetch,
	json: Fetch,
	code: Fetch,
	markdown: Fetch,
	redirect: {
		lost: '404',
		disconnected: 'status'
	},
	home: Home
};
routes['404'] = fourofour;

const routeConfig = function(route) {
	if(!route) {
		route = 'home';
	}
	debug(route, isObject(routes[route]));
	if(routes[route]) {
		// find the correct route to return
		if(isObject(routes[route]) && 'function' !== typeof routes[route]) {
			// 404 for bad page
			return fourofour;
		} else {
			// return the requested page
			return routes[route];
		}
		
	} else if(routes.redirect[route]) {
		// return a redirect
		return routes[routes.redirect[route]]	
	
	} else {
		// return 404
		return fourofour;
		
	}	
}

export default routeConfig
