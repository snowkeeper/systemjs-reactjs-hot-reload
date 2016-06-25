import React from 'react';
import { unmountComponentAtNode } from 'react-dom';

import Debug from 'debug';
import Path from 'path';
import { Routes, RouteMatch } from './routes';
import { createHistory, useBasename  } from 'history';
import { isObject } from 'lodash';

let history = useBasename(createHistory)({
	basename: snowUI.basepath
});

let debug = Debug('lodge:app:router');

export default (Component) => {
	class Router extends React.Component {
		constructor(props){
			super(props);
			this.displayName = 'Router';
			
			// get current location
			let loc = history.getCurrentLocation();
			if(!loc.state) {
				loc.state = {
					page: loc.pathname
				}
			}
			debug('Router location', loc);
			
			let pastState = loc.state;	
			let page = pastState.page;
			
			if(page.charAt(0) == '/') {
				page = page.substring(1);
			}
			
			var route = RouteMatch(loc.basename + page);
			
			if(!isObject(route)) {
				route = {
					component: <span />,
					page: 'Error'
				};
			}
			
			this.state = Object.assign({ 
				page,
				children: route.component,
				query: loc.query,
				router: history,
				match: RouteMatch,
				Routes: Routes,
				location: loc,
				
			}, snowUI.__state);
			
			debug('router component', 'new router:', this.state, loc);
			
			snowUI.page = this.state.page;
			
			this.onTheMove = this.onTheMove.bind(this);
			this.updateState = this.updateState.bind(this);
			
			// Listen for changes to the current location
			const unlisten = history.listen(this.onTheMove)
			
		}
		
		componentWillReceiveProps(props) {
					
			debug.error('ERROR: this should not run','router component', props);
			
		}
		
		componentDidUpdate() {
			if(this._update) {
				this.onUpdate();
			}
		}
		componentWillMount() {
			this.forceUpdate();
		}
		componentWillUnmount() {
		
		}
		
		componentDidMount() {
		
		}
		
		onUpdate() {
			let thisComponent = this;
			this._update = false;
			debug('update router');	
		} 
		
		updateState(stateUpdate, callback) {
			debug('update router state', stateUpdate);	
			this.setState(stateUpdate, (state) => {
				debug('updated router state', state);	
				snowUI.__state = this.state;
				if(callback) {
					callback();
				}
			});		
		}
		
		onTheMove(newLocation) {
			
			var route = RouteMatch(newLocation.basename + newLocation.pathname);
			if(!isObject(route)) {
				route = {
					component: <span />,
					page: 'Error'
				};
			}
			
			debug('location change', newLocation, route);
			this.updateState(Object.assign({
				location: newLocation,
				page: newLocation.state.page,
				children: route.component
			}, route));
		}
		
		render() {
			debug('render router ', 'state', this.state, 'props', this.props);
			return  <Component { ...this.state }  />;
		}
		
	}

	Router.propTypes = {};

	return Router
}


export function __unload() {
  // force unload React components
  debug('__UNLOAD App', snowUI.__state);
  unmountComponentAtNode(document.getElementById('react-hot-reload')); // your container node
}

export function __reload(m) {
	debug('__RELOAD App', m, snowUI.__state);
	if (snowUI.__state) {
		myComponent.setState(snowUI.__state);
	}
}
