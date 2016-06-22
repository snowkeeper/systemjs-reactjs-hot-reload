import React from 'react';
import Fetch from './fetch';
import Debug from 'debug'

let debug = Debug('lodge:app:pages:fetch');

export default (page, returnType, options) => {
	class GenericFetch extends React.Component {
		constructor(props) {
			super(props)
			this.displayName = 'Generic ' + page
			this.state = { html: props.html || props.response }
			this.props = props
		}
		render() {
			debug('render fetch component', this.state, this.props, page, returnType);
			if('function' === typeof this.state.html) {
				return  (<div> <this.state.html { ...this.props } /> </div>);
			} else {
				return (<div dangerouslySetInnerHTML={{ __html: this.state.html }} />)
			}
		}
	}
	
	return Fetch(page, GenericFetch, returnType, options)
}
