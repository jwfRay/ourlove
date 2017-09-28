import React from 'react';
import {
	Link,
	hashHistory,
	browserHistory
} from 'react-router';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import MaterialIcon from 'react-google-material-icons'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import FileFolder from 'material-ui/svg-icons/file/folder';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import EditorFormatAlignLeft from 'material-ui/svg-icons/editor/format-align-left';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
let SelectableList = makeSelectable(List);
@CSSModules(styles)
export default class Sider extends React.Component {
	constructor() {
		super();
		this.state={
		}
	}
	componentDidMount(){
	}
	render() {
		let list=[];
		return(
			<div styleName="wrapper">
				{/*<img src="http://bowen7.oss-cn-shanghai.aliyuncs.com/logo.png" />*/}
				<MuiThemeProvider>
					<SelectableList>
						<Subheader style={{fontSize:'18px',paddingLeft:25,borderBottom:1}}> L  &  J</Subheader>
						<Link to={`/blog/list`}>
							<ListItem 
								primaryText={'总列表'} 
								leftAvatar={<Avatar icon={<EditorFormatAlignLeft />} size={25} style={{marginTop:'7px'}}/>}
								innerDivStyle={{'paddingLeft':'45px'}}
								value={0}
							/>
						</Link>
						<Link to={`/message`}>
							<ListItem 
								primaryText={'留言列表'} 
								leftAvatar={<Avatar icon={<ActionAssignment />} size={25} style={{marginTop:'8px'}}/>}
								innerDivStyle={{'paddingLeft':'45px'}}
								value={0}
							/>
						</Link>
						{list}
					</SelectableList>
				</MuiThemeProvider>
			</div>
        );
	};
}