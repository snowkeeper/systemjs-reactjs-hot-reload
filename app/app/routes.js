import Home from './pages/home';
import Status from './pages/status';
import Page from './pages/page';
import Fetch from './pages/fetch';
import { isObject, forEach } from 'lodash';
import Debug from 'debug';
import fourofour from './pages/404.js';
import RouteParser from 'route-parser';
import React from 'react';

let debug = Debug('lodge:app:routes');

let Route = [];

// add each page
Route.push({ path: '/status', component: Status });
Route.push({ path: '/page', component: Page });
Route.push({ path: '/fetch', component: Fetch });
Route.push({ path: '/json', component: Fetch });
Route.push({ path: '/markdown', component: Fetch });
Route.push({ path: '/status', component: Fetch });
Route.push({ path: '/home', component: Home });
Route.push({ path: '/404', component: fourofour });

// export
export const Routes = {
	path: snowUI.basepath,
	indexRoute: { component: Home },
	notFound: { component: fourofour },
	redirect: [
		{ path: '/disconnected', sendTo: '/status' },
		{ path: '/lost', sendTo: '/404' },
	],
	routes: Route
}

export default Routes

export const RouteMatch = function(path) {
	debug('RouteMatch:', path);	
	
	var cfg = Routes;
	
	var parser = new RouteParser(path);
	
	var indexMatch = parser.match(cfg.path); 
	if(indexMatch) {
		return {
			component: React.createElement(cfg.indexRoute),
			matched: cfg.path
		}
	}
	
	if(cfg.redirect.length > 0) {
		var hasRedirect = checkRedirects(parser);
		if(hasRedirect) {
			var ret = RouteMatch(hasRedirect);
			debug('RAN redirect', ret);
			return ret;
		}
	}
	
	if(cfg.routes.length > 0) {
		var hasRoute = checkRoutes(parser);
		if(hasRoute) {
			return hasRoute;
		}
	}
	
	if(isObject(cfg.notFound) && cfg.notFound.component) {
		return {
			component: React.createElement(cfg.notFound.component),
			matched: false
		}	
	} else if(cfg.indexRoute) {
		return {
			component: React.createElement(cfg.indexRoute),
			matched: false
		}	
	}
	
	return {
		component: <span />,
		matched: false
	}	
}

function checkRedirects(parser) {
	forEach(Routes.redirect, route => {
		var match = parser.match(route.path);
		if(match) {
			debug('matched redirect', match, route);
			return route.path;
		}
	});
	return false;
}
 
function checkRoutes(parser) {
	let matched = false;
	forEach(Routes.routes, route => {
		if(matched) return false;
		
		var match = parser.match(route.path);
		if(match) {
			debug('matched route', route, match);
			if(!isObject(match)) {
				match = {
					match
				}
			}
			matched = Object.assign({
				component: React.createElement(route.component),
				matched: route.path,
			}, match);
		}
	});
	if(matched) {
		return matched;
	} else {
		return false;
	}
	
}
