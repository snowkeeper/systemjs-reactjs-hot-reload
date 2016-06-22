import React from 'react';
import Debug from 'debug'
import Gab from '../common/gab'
import { Divider, FontIcon, CardText, Card, CardActions, CardHeader, CardMedia, CardTitle } from 'material-ui';
import { Styles } from '../common/styles';

let debug = Debug('lodge:app:pages:disconnect');
		
export default class Disconnect extends React.Component {
	constructor(props) {
		super(props)
		this.displayName = 'Disconnect Component'	
		this.state = {
			
		}
		this._update = false
	}
	
	componentWillReceiveProps(props) {
		debug('receiveProps');
		this._update = true;
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
		debug('disconnect render', this.props);
		let message = (<p>The page you requested is not valid.</p>);
		if(this.props.errorMessage) {
			message = (<p><h2 style={{color:'red'}}>{this.props.errorMessage}</h2></p>);
		}
		return (<div className="col-xs-12" >
			<Card>
				<CardTitle 
					title={"404"}
					subtitle={"The requested page could not be found"}
					titleColor={Styles.Colors.red600}
					subtitleColor={Styles.Colors.grey500}
				/>
				<CardText style={{padding:0, height:300, textAlign:'center', paddingTop:20}} >
					<div className="" style={{color:Styles.Colors.grey600, fontSize:'76px', padding:0, height:100, paddingTop:0, paddingBottom:30}}>
						<FontIcon style={{fontSize:'128px'}} className="material-icons" color={Styles.Colors.red600} hoverColor={Styles.Colors.amber500} >error</FontIcon>
					</div>
					<div style={{marginBottom:30}} />
					{message}
					<br />
					<p><a href="#" onClick={(e)=>{e.preventDefault();window.history.back();}}>Previous Page</a></p>
				</CardText>
			</Card>
		</div>);
	}
}

