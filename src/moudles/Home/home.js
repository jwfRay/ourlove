import React from 'react';
import { Switch,message } from 'antd';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';
import styles from './styles.scss';
@CSSModules(styles)
export default class Home extends React.Component {
	constructor(props){
		super(props);
	};
	static contextTypes = {
	    router: React.PropTypes.object
	};
	componentWillMount(){
		console.log(localStorage.quanxian);
		if(localStorage.quanxian>1){
			this.context.router.goBack();
			message.warning('你没有权限放问该页面');
		}
	};
	render(){
		return(
			<div>
				home <Switch defaultChecked={false}  />
			</div>
		);
	};
}