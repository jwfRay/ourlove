import React from 'react';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';
import styles from './styles.scss';
@CSSModules(styles)
export default class Image extends React.Component {
	constructor(props){
		super(props);
	};
	render(){
		return(
			<div>
				image
			</div>
		);
	};
}