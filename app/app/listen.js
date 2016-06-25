import React from 'react';
import { isObject, isArray } from 'lodash';
import Debug from 'debug';
import Gab from './common/gab';
import Sockets from './lib/sockets';
import Path from 'path';
import Router from './router';

let debug = Debug('lodge:app:listen');



export default (Component) => {
	class Listeners extends React.Component {
		constructor(props){
			super(props);
			this.displayName = 'Listeners';						
			
			this.state = Object.assign({ 
				connected: false,
				currentTheme: snowUI.materialTheme,
				leftNav: false,
				newalert: {},
				newconfirm: {
					open: false
				},
				sockets: Sockets			
			}, props);
			
			debug('listener component', props)
			debug('new state:', this.state);
			
			snowUI.page = this.state.page;
			snowUI.__state = { ...this.state }
			
			this._update = false;
			this._limiters = {};
			this._mounted = false;
			
			this.updateState = this.updateState.bind(this);
		}
		
		componentWillReceiveProps(props) {
						
			debug('listener componentWillReceiveProps', props);
			this.setState(props);
			this._update = true;
			
		}
		
		componentDidUpdate() {
			if(this._update) {
				this.onUpdate();
			}
		}
		componentWillMount() {
			
		}
		componentWillUnmount() {
			//debug('remove all socket listeners', Sockets);
			if(Sockets.connected.io) {
				Sockets.io.removeAllListeners();
			}
			Gab.removeAllListeners();
			this._mounted = false;
			snowUI.unstickyMenu();
			snowUI.code.__unmountUI();
		}
		
		componentDidMount() {
			//this.onMount();
			this.initiate();
			this._mounted = true;
			this.onUpdate();
			snowUI.stickyMenu();
			// run user code
			snowUI.code.__mountedUI();
			debug('##  RUN __mountedUI js  ############');
		}

		initiate() {
			debug('INITIATE SOCKET LISTENERS')
			let thisComponent = this;
			
			// listen for error
			Gab.on('error',(data) => {
				this.setState({
					newalert: {
						style: 'danger',
						html: data.error,
						show: true
					}
				});
			});
			
			// receive page from request
			Gab.on('request',(data) => {
				debug('gab got page request data', data);
				thisComponent.pageResults(data);
			});
			
			// update desktop
			Gab.on('resize', (e) => { 
				var desktop = false;
				// if(e.width < snowUI.breaks.sm.width) {
				// 		desktop = false;
				// }
				debug('RESIZE #####', e, desktop);
				this.setState({ desktop, window: e });
			});
			
			if(snowUI.usesockets) {
				Sockets.init(() => {
					debug('set heartbeat');
					// setup a 15 sec heartbeat for socket connection loss
					this.heartbeat = setInterval(() => {
						//debug('heartbeat', Sockets.io.connected);
						if(!Sockets.io.connected && this.state.connected) {
							debug('io connect-error');
							this.setState({
								connected: false,
								newalert: {},
							});
						}
						if(Sockets.io.connected && !this.state.connected) {
							debug('io connect');
							this.setState({
								connected: true,
								newalert: {},
							});
						}
					},2500);
					
					// receive page from server
					Sockets.io.on('json', (data) => {
						debug('got page socket data', data);
						thisComponent.pageResults(data);
					});
					
					// listen for a server error event
					Sockets.io.on('error', (data) => {
						debug('received socket error event', data);
						this.setState({
							newalert: {
								show: true,
								style: 'danger',
								html: data.error
							}
						});
					});
					
				});
			} // end socket init
			
			// window resize emitter
			function _resizing() {
				var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
				
				Gab.emit('resize', { width: x, height: y });
			}
			window.addEventListener('resize', _resizing, true);
			_resizing();
			
		} // end initiate
		
		updateState(stateUpdate, callback) {
			this.setState(stateUpdate, () => {
				snowUI.__state = this.state;
				if(callback) {
					callback();
				}
			});		
		}
		
		onUpdate() {
			let thisComponent = this;
			this._update = false;
			
			debug('update listeners');	
		} 
		
		pageResults(data) {
			snowUI.watingForPage = false;
			if(!data.success) {
				this.updateState({
					page: '404',
					contents: {
						title: 'Page not found',
						slug: '404'
					},
					newalert: {
						style: 'danger',
						html: data.message,
						show: true,
						duration: 1500
					},
				});
			} else {
				this.updateState({ 
						slug: data.slug,
						contents: data.results,
					}, 
					function() {
						/* run page js for new content */
						debug('##  RUN __mountedPage() js  ############');
						snowUI.code.__mountedPage();				
					}
				);
			}
		}
		
		render() {
			debug('render listeners state', this.state);
			return  <Component { ...this.state } appState={this.updateState} />;
		}
		
	}

	Listeners.propTypes = {};

	return Router(Listeners)
}
