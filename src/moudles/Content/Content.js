import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import MaterialIcon from 'react-google-material-icons'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
@CSSModules(styles)
export default class Content extends React.Component {
	constructor() {
		super();
		this.state={
		}
	}
	componentWillMount(){
	}
	render() {
		return(
			<div>
			Content
			</div>
       );
	};
}