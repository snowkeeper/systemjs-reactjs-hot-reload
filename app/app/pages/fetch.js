import React from 'react';
import Debug from 'debug'
import Gab from '../common/gab'
import { DropDownMenu, MenuItem, ToolbarGroup, Toolbar, ToolbarSeparator, Divider, CardText, CardMedia, CardHeader, CardActions, Card, CardTitle, List, IconButton, ListItem, FlatButton, FontIcon } from 'material-ui';
import { Styles } from '../common/styles';
import FetchComponent from './fetch/component'; // function > component

/* *
 * Fetch use
 * 
 * component: Fetch('https://developer.mozilla.org/en-US/docs/Web/API/Body', ['body','noscript','clean'], { mode: 'no-cors' }) 
 * component: Fetch('https://developer.mozilla.org/en-US/docs/Web/API/Body', ['body','noscript']) 
 * component: Fetch('https://developer.mozilla.org/en-US/docs/Web/API/Body', ['noscript']) 
 * component: Fetch('https://www.reddit.com/search.json?q=keystonejs', ['json','code']) 
 * component: Fetch('https://www.npmjs.com/package/keystone', ['body','noscript']) 
 * 
 * 
 * */


let debug = Debug('lodge:app:pages:fetch');
		
export default class Fetch extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = 'Page Component';	
		this.state = {
			ready: true,
		};
		debug('page start props', props);
	}
	componentWillReceiveProps(props) {
		this.setState(props);
	}
	
	componentDidUpdate() {
		snowUI.fadeIn();
		debug('didUpdate');
	}
	componentDidMount() {
		debug('did mount');
		snowUI.fadeIn();
	}
	render() {
		
		let Contents = false;
		if(this.state.fetch) {
			Contents = FetchComponent(this.state.fetch, this.state.filters, { mode: this.state.mode });
		}
		debug('page render', this.state.fetch, this.state.filters, this.state.mode);
		
		return (<div className="col-xs-12" >
			<Card style={{minHeight: snowUI.contentHeight}} >
				<CardText>
					{Contents ? <Contents /> : <span />}
				</CardText>
			</Card>
		</div>);
	}
}

