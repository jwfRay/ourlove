import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import{
	Row,
	Col,
	Menu, 
	Dropdown, 
	Icon,
	Button
}from 'antd'
import MaterialIcon from 'react-google-material-icons'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
@CSSModules(styles)
export default class Header extends React.Component {
	constructor() {
		super();
		this.state={
		}
	}
	render() {
		return(
			<div styleName="wrapper">
				<Row>
					<Col span={22} offset={1}>
						<div styleName="action">
							header
						</div>
					</Col>
				</Row>
			</div>
       );
	};
}