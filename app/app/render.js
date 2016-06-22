import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Path from 'path';
import wrapListeners from './listen';
import Debug from 'debug';
import Menu from './common/components/menu';
import Confirm from './common/components/confirm';
import routes from './routes';
import {Card, CardText, FontIcon, IconMenu, IconButton, AppBar, RaisedButton, LeftNav, MenuItem, Divider, List, ListItem} from 'material-ui';
import { Styles } from './common/styles';

let debug = Debug('lodge:app:render');

class Main extends Component {
	constructor(props) {
		// we get props from Listener
		super(props);
		
		this.state = Object.assign({}, props);
		
		this._defaults = {
			leftNav: false,
			search: '',
			slug: '',
			filters: [],
			mode: 'cors',
		}
		
		debug('fresh state', this.state);
		
		this.handleLeftNav = this.handleLeftNav.bind(this);
		this.LeftNavClose = this.LeftNavClose.bind(this);
		this.goTo = this.goTo.bind(this);
		this.setAsset = this.setAsset.bind(this);
		this.appState = this.appState.bind(this);
		this.answerConfirm = this.answerConfirm.bind(this);
		this.switchTheme = this.switchTheme.bind(this);
		this.searchToggle = this.searchToggle.bind(this);
	}
	
	componentDidMount() {
		this.switchTheme(this.props.currentTheme, false);
	}
	
	componentWillReceiveProps(props) {
		// update from listener
		var p = { ...props };
		debug('listener props', p);
		this.setState(p);	
	}
	
	componentWillUnmount() {
		
	}
	
	switchTheme(theme = 'blue', update = true) {
		let style = this.props.styles[theme];
		if(!style) {
			style = this.props.styles.blue;
		}
		if(theme == 'dark') {
			snowUI.setTheme('dark-theme');
			snowUI.shortenTitle = false;
		} else if(theme == 'graphite') {
			snowUI.setTheme('dark-theme graphite');
			snowUI.shortenTitle = true;
		} else if(theme == 'night') {
			snowUI.setTheme('dark-theme default');
			snowUI.shortenTitle = false;
		} else if(theme == 'cream') {
			snowUI.setTheme('');
			snowUI.shortenTitle = true;
		} else if(theme == 'light') {
			snowUI.setTheme('light-theme theme-light ');
			snowUI.shortenTitle = true;
		} else {
			snowUI.setTheme('light-theme blue');
			snowUI.shortenTitle = false;
		}
		if(update) {
			this.appState({
				theme: style,
				currentTheme: theme,
				forceUpdate: true
			}, function() {
			});
		}
	}
	
	getChildContext() {
		return {
			muiTheme: this.state.theme,
		};
	}
	
	handleLeftNav(e) {
		if(e && typeof e.preventDefault === 'function') {
			e.preventDefault();
		}
		debug('handleLeftNav', this.state);
		if(this.state.desktop) {
			this.appState({desktopNav: !this.state.desktopNav});
		} else {
			this.appState({leftNav: !this.state.leftNav});
		}
	} 
	
	LeftNavClose () {
		this.appState({ leftNav: false });
	}
	
	searchToggle(e) { 
		let target = $(e.target).parent().prev();
		target.toggleClass('open');
		debug('searchToggle', target);
		let $input = target.find('input');
		$input.val('');
		$input.focus();
		$input.keypress((event) => {
			// keyboard Enter event
			if ( event.which == 13 ) {
				event.preventDefault();
				let state = {
					page: 'search::' + $input.val(),
					search:  $input.val()
				}
				
				this.appState(Object.assign({ ...this._defaults }, state), () => {
					this.state.history.push({
						pathname: 'search::',
						search: $input.val(),
					})
				});
			}
			
		});
	}
	
	goTo(state) {
		debug('goTo state', state)
		
		if(typeof state === 'string') {
			// accept strings for the page
			state = {
				page: state,
			}
		}
		
		// fade the content div before its replaced
		snowUI.fadeOut('slow', () => {
			var send = Object.assign({ ...this._defaults }, state);
				
			this.appState(send, () => {
				debug('push history ', '/' , this.state.page, this.state.slug, this._defaults, state, send)
				var str = this.state.slug || this.state.fetch || '';
				this.state.history.push({
					pathname: Path.join('/' , this.state.page, str),
					search: this.state.query,
				});
			});	
		});
		
	}
	 
	setAsset(asset, callback) {
		this.appState(asset, callback);
	}
	
	appState(newState, callback) {
		this.props.appState(newState, callback);
	}
	
	dismissConfirm() {
		this.appState({ 
			newconfirm: {
				show: false
			}
		});
	}
	
	answerConfirm(success) {
		if(success) {
			if(typeof this.state.newconfirm.answer === 'function') {
				this.state.newconfirm.answer(this.state.answerConfirm);
			} else if(typeof this[this.state.answerMethod] === 'function') {
				this[this.state.answerMethod](this.state.answerConfirm);
			}
		}
		this.appState({
			newconfirm: {
				open: false,
			},
			answerConfirm: false
		});
		
	}
	
	render() {
		debug('render state', this.state);
		
		let title = this.state.page; 
		
		let isConnectedIcon = ( this.state.connected === true || !snowUI.usesockets )
			? 
				<IconButton onClick={(e)=>{e.preventDefault();this.goTo('status');}} ><FontIcon className="material-icons" hoverColor={Styles.Colors.lime500} style={{fontSize:'20px'}}  >speaker_phone</FontIcon></IconButton>
			:
				(this.props.sockets.connected.firstRun) 
				?
					<span><IconButton onClick={(e)=>{e.preventDefault();this.goTo('status');}} ><FontIcon className="material-icons" style={{fontSize:'20px'}} color={Styles.Colors.lime500}  title="Connecting to server for the first time">speaker_phone</FontIcon></IconButton></span>
				:
					<span><IconButton onClick={(e)=>{e.preventDefault();this.goTo('status');}} ><FontIcon className="material-icons" style={{fontSize:'20px', backgroundColor: Styles.Colors.red900}} color={Styles.Colors.red900}  title="Connection to server lost">cloud_offline</FontIcon></IconButton></span>
		
		let appBarRightIcons = (<span>
						
			<span style={{ cursor: 'pointer' }}>
				<IconMenu
					iconButtonElement={<FontIcon className="material-icons" hoverColor={Styles.Colors.lightBlueA700} >invert_colors</FontIcon>}
					onItemTouchTap={(e, val) => {
						debug(e, val);
						if(val.props.value === 'boot') {
							return location.href = snowUI.path.bootstrap;
						}
						this.switchTheme(val.props.value);
						
					}}
				>
				  <MenuItem primaryText="Cream" value="cream"/>
				  <MenuItem primaryText="Light" value="light" />
				  <MenuItem primaryText="Blue" value="blue"/>
				  <MenuItem primaryText="Graphite" value="graphite"/>
				  <MenuItem primaryText="Night" value="night"/>
				  <MenuItem primaryText="Dark" value="dark" />
				</IconMenu>
			</span>
			
			{isConnectedIcon}
			
			<IconButton onClick={this.handleLeftNav} ><FontIcon className="material-icons" hoverColor={Styles.Colors.lightBlueA700} >menu</FontIcon></IconButton>
			
			<div style={{width:20,height:20,display:'inline-block'}} />
		</span>);
		
		let appbar = (<div id="appbar"> 
			<div style={{zIndex:1101, width: '100%', height: '64px' ,position: 'fixed', }} >
				<AppBar
					title={<div id="appbarTitle" >{title}</div>}
					iconElementRight={appBarRightIcons}
					style={{boxShadow: 'none'}}
					iconElementLeft={<span><IconButton onClick={(e)=>{e.preventDefault();this.goTo(snowUI.homepage);}} ><FontIcon className="material-icons" hoverColor={Styles.Colors.lightBlueA700} >home</FontIcon></IconButton></span>}
				/>
			</div>
			<div style={{height:65,width:'100%'}} />
		</div>);
        
        const Page = routes(this.state.page);
        
		return (<div>
			{appbar}
			
			<Menu docked={true} secondary={true} searchToggle={this.searchToggle}  goTo={this.goTo} handleLeftNav={this.handleLeftNav} { ...this.state } />
			
			<div className="clearfix" />
			<div className="react-hot-reload-container" >
				<div style={{paddingRight:0, paddingLeft:0}} >
					<div id="content-fader">
						<Page { ...this.state } secondary={true} appState={this.appState} switchTheme={this.switchTheme} goTo={this.goTo} handleLeftNav={this.handleLeftNav}  />
					</div>
				</div>
			</div>
			<div className="clearfix" />
			<div className="simpledocs-footer" id="simpledocs-footer" >
				
			</div>
			<Confirm 
				html={this.state.newconfirm.html}
				title={this.state.newconfirm.title}
				answer={this.answerConfirm}
				open={this.state.newconfirm.open}
				yesText={this.state.newconfirm.yesText}
				noText={this.state.newconfirm.noText}
				theme={this.state.theme}
			/>
        </div>);

	}
}

Main.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export let myComponent =  wrapListeners(Main);

export default myComponent;
