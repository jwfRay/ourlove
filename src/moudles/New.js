import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.scss';
import MaterialIcon from 'react-google-material-icons'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Sider from './Sider/Sider'
import Header from './Header/Header'
import Content from './Content/Content'
import Footer from './Footer/Footer'
@CSSModules(styles)
export default class Blog extends React.Component {
	constructor() {
		super();
		this.state={
		}
	}
	render() {
		return(
			<div styleName="warpper">
				<div styleName="sider">
					<Sider/>
				</div>
				<div styleName="main">
					<div styleName="header">
						<Header/>
					</div>
					<div styleName="content">
						{this.props.children}
					</div>
					<div styleName="footer">
						<Footer/>
					</div>
				</div>
			</div>
       );
	};
}
