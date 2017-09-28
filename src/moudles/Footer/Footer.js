import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

@CSSModules(styles)
export default class Footer extends React.Component {
	constructor() {
		super();
		this.state={
			
		}
	}
	componentWillMount(){
		
	}
	componentWillUnMount(){
        
	}
	render() {
		return(
			<div styleName="wrapper">
				footer
			</div>
       );
	};
}