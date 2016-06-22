import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import App from './render.js';
import Debug from 'debug';
import injectTapEventPlugin from 'react-tap-event-plugin';
let debug = Debug('lodge:app');

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
if(!snowUI.__injected) {
	injectTapEventPlugin();
	snowUI.__injected = true;
}

window.myDebug = Debug;

export let myComponent = render( React.createElement(App), document.getElementById('react-hot-reload'));

export function __unload() {
  // force unload React components
  //unmountComponentAtNode(document.getElementById('react-hot-reload')); // your container node
}

export function __reload(m) {
	debug('__RELOAD App', m, snowUI.__state);
	if (snowUI.__state) {
		//myComponent.setState(snowUI.__state);
	}
}
