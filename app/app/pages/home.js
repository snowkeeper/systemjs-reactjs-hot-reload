import React from 'react';
import Debug from 'debug'
import Gab from '../common/gab'
import { Divider, CardText, CardMedia, CardHeader, CardActions, Card, CardTitle, List, IconButton, ListItem, FlatButton, FontIcon } from 'material-ui';

import { Styles } from '../common/styles';

let debug = Debug('lodge:app:pages:home');
		
export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = 'Home Component';	
		this.state = {
			ready: true,
			page: props.page,
			contents: props.contents
		};
		
		debug('home start props', props);
		this._update = false;
		this._updating = true;
	}
	
	componentWillReceiveProps(props) {
	 
	}
	
	componentDidUpdate() {
		snowUI.fadeIn();
		debug('didUpdate');
	}
	componentDidMount() {
		debug('did mount');
		snowUI.fadeIn();
	}
	
	componentWillUnmount() {
		snowUI.code.__unmountUI();
	}
	
	render() {
		debug('home render', this.state, this.props);
		
		
		return (<div className="col-xs-12" >
			<Card style={{minHeight: snowUI.contentHeight}} >
				<CardText> 
					
					<h2> Welcome home Fred! </h2>
					
				</CardText>
			</Card>
		</div>);
	}
}
