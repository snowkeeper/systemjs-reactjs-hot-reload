import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import Debug from 'debug';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './render.js';

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

//export let myComponent = render( <Router history={browserHistory} routes={rootRoute} />, document.getElementById('react-hot-reload'));

export let myComponent = render( React.createElement(App), document.getElementById('react-hot-reload'));


 
