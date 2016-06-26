import React from 'react';
import Debug from 'debug'
import { Drawer, MenuItem } from 'material-ui';

let debug = Debug('lodge:app:common:components:menu'); 

		
export default class Menu extends React.Component {
	constructor(props) {
		super(props)
		this.displayName = 'Menu Component'	
		this.state = {
			page: props.page,
			leftNav: props.leftNav
		};
		this._update = true;
	}
	componentWillReceiveProps(props) {
		debug("menu2 props", props, this.state);
		if(props.leftNav !== this.state.leftNav || props.update || this.state.page !== props.page) {
			this._update = true;
			this.setState({
				page: props.page,
				leftNav: props.leftNav
			});
			return;
		}
		
	}
	shouldComponentUpdate() {
		debug('should update? ', this._update);
		if(this._update) {
			this._update = false;
			return true;
		}
		return false;
	}
	render() {
		debug('simple menu render', this.props);
		
		let page = this.props.anchor || this.props.page;
				
        let LeftDrawer = (
			<Drawer 
				docked={this.props.docked}
				open={this.props.leftNav}
				openSecondary={this.props.secondary}
				width={255}
				onRequestChange={open => {
					debug('request change', open, this.props);
					this.props.handleLeftNav({
						leftNav: open
					})
				}}
			>
				<div className="menu" style={{
					height: '100%',
					width: '100%',
					overflow: 'auto',
				}} >
					<MenuItem onTouchTap={(e) => {
						e.preventDefault(e);
						this.props.goTo({
							page: 'home',
						});
					}}>Home</MenuItem>
					<MenuItem onClick={(e) => {
						e.preventDefault(e);
						this.props.goTo({
							page: 'status',
						});
					}} href="/status">Status</MenuItem>
					<MenuItem onClick={(e) => {
						e.preventDefault(e);
						this.props.goTo({
							page: 'lost',
						});
					}}>Lost</MenuItem>
					<MenuItem onClick={(e) => {
						e.preventDefault(e);
						this.props.goTo({
							fetch: 'help',
							message: 'You can add cutom messages too.',
							error: 'Error messages are red',
							FontIcon: {
								icon: 'help'
							}
						});
					}}>Malformed</MenuItem>
					<MenuItem onClick={(e) => {
						e.preventDefault(e);
						this.props.goTo({
							page: 'page',
							slug: 'help'
						});
					}}>Local Page from JSON</MenuItem>
					<MenuItem onClick={(e) => {
						e.preventDefault(e);
						this.props.goTo({
							page: 'fetch',
							query: {
								fetch: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API',
								filters: ['body','noscript']
							}
						});
					}}>Fetch</MenuItem>
					
					<MenuItem onClick={(e) => {
						e.preventDefault(e);
						this.props.goTo({
							page: 'fetch',
							fetch: 'http://google.com',
							filters: ['body','noscript']
						});
					}}>Fail CORS</MenuItem>
					<MenuItem onClick={(e) => {
						e.preventDefault(e);
						this.props.goTo({
							page: 'json',
							fetch: 'https://www.reddit.com/search.json?q=systemjs+react',
							filters: ['json','code']
						});
					}}>Load JSON</MenuItem>
					<MenuItem onClick={(e) => {
						e.preventDefault(e);
						this.props.goTo({
							path: '/markdown',
							page: 'Markdown',
							markdownBasePath: 'https://raw.githubusercontent.com/wiki/snowkeeper/keystone',
							query: {
								fetch: 'https://raw.githubusercontent.com/wiki/facebook/react/Complementary-Tools.md',
								filters: ['markdown','wikiindexpage'],
								markdownBasePath: 'https://raw.githubusercontent.com/wiki/facebook/react'
							}
						});
					}} href="/markdown/?fetch=https://raw.githubusercontent.com/wiki/facebook/react/Complementary-Tools.md&filter1=markdown&filter2=wikiindexpage&markdownBasePath=https://raw.githubusercontent.com/wiki/facebook/react">Load Markdown</MenuItem>
					
				</div>
			</Drawer>
		);
		
		if(this.props.drawer) {
			return (LeftDrawer);
		} else {
			return (<div>{menu}</div>);
		} 	
	}
}

