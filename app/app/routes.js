import Home from './pages/home';
import Status from './pages/status';
import Page from './pages/page';
import Fetch from './pages/fetch';
import { isObject } from 'lodash';
import Debug from 'debug';
import fourofour from './pages/404.js';
import App from './render.js';

let debug = Debug('lodge:app:routes');

let Routes = [];

// add each page
Routes.push({ path: '/status', component: Status });
Routes.push({ path: '/page', component: Page });
Routes.push({ path: '/fetch', component: Fetch });
Routes.push({ path: '/json', component: Fetch });
Routes.push({ path: '/markdown', component: Fetch });
Routes.push({ path: '/status', component: Fetch });
Routes.push({ path: '/home', component: Home });
Routes.push({ path: '/404', component: fourofour });

// redirects
function sendTo404(nextState, replaceState) {
	replaceState({ nextPathname: nextState.location.pathname }, '/404')
}
Routes.push({ path: '/lost', onEnter: sendTo404 });

function sendToStatus(nextState, replaceState) {
	replaceState({ nextPathname: nextState.location.pathname }, '/status')
}
Routes.push({ path: '/disconnected', onEnter: sendToStatus })

Routes.push({ path: '*', component: fourofour })

// export
const routeConfig = [
  { path: '/',
    component: App,
    indexRoute: { component: Home },
    catchAll: { component: fourofour },
    childRoutes: Routes
  }
]

export default routeConfig

/*
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



Routes.push({ 
	path: '/fetch', 
	component: Example,
	indexRoute: { component: Jade('en/pages/docs/learn/fetch') },
    catchAll: { component: Jade('en/pages/docs/learn/fetch') },
    childRoutes: [
		{ path: 'text', component: Fetch('https://developer.mozilla.org/en-US/docs/Web/API/Body', ['body','noscript','clean']) },
		{ path: 'body', component: Fetch('https://developer.mozilla.org/en-US/docs/Web/API/Body', ['body','noscript']) },
		{ path: 'noscript', component: Fetch('https://developer.mozilla.org/en-US/docs/Web/API/Body', ['noscript']) },
		{ path: 'json/code', component: Fetch('https://www.reddit.com/search.json?q=keystonejs', ['json','code']) },
		{ path: 'fail', component: Fetch('https://www.npmjs.com/package/keystone', ['body','noscript']) }
    ]
})

Routes.push({ path: '*', component: Jade('/404') })

const home = Jade('/home');

*/
