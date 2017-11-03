import React from 'react';
import { Table,Button,Input,message} from 'antd';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';
import styles from './styles.scss';
import axios from 'axios';
import {Link}from 'react-router';
var E = require('wangeditor');
const { TextArea } = Input;
@CSSModules(styles)
export default class Study extends React.Component {
	static contextTypes = {
	    router: React.PropTypes.object
	};
	constructor(props){
		super(props);
		this.state={
			title:'',
			content:'',
			time:'',
		};
		this.loginguoqi=this.loginguoqi.bind(this);
	};
	loginguoqi(){
		localStorage.removeItem('userName');
		message.warning('登录过期咯！！！！');
		this.context.router.push(`/`);
	}
	componentDidMount(){
		this.editor = new E('#header','#content');
		this.editor.customConfig.menus = [
		    'head',  // 标题
		    'bold',  // 粗体
		    'italic',  // 斜体
		    'underline',  // 下划线
		    'strikeThrough',  // 删除线
		    'foreColor',  // 文字颜色
		    'backColor',  // 背景颜色
		    'list',  // 列表
		    'justify',  // 对齐方式
		    'quote',  // 引用
		    'table',  // 表格
		    'code',  // 插入代码
		    'undo',  // 撤销
		    'redo'  // 重复
        ];
        this.editor.create();
        this.editor.txt.html(`<pre>添加笔记吧，啦啦啦啦！！！</pre>`);
		
	}
	titlechange(e){
		this.setState({
			title:e.target.value
		});
	}
	AddNote(){
		let myDate = new Date();
	    let month=myDate.getMonth()+1;
	    let day=myDate.getDate();
	    if(month>=0 && month<=9){month='0'+month}
	    if(day>=0 && day<=9){day='0'+day}
	    let date = myDate.getFullYear()+'-'+month+'-'+day;
		const obj={
			title:this.state.title,
			content:this.editor.txt.text(),
			time:date
		};
		axios.post('http://localhost:3000/add',obj)
			.then(res=>{
				if(!localStorage.userName){
					this.loginguoqi();
					return;
				}
				console.log(obj);
				message.success('笔记添加完毕，棒棒哒！！！');
				this.context.router.goBack();
			})
			.catch((err)=>{
				console.log(err)
			});
	}
	render(){
		return(
			<div>
				<div styleName="note">
					<Input styleName="title" onChange={this.titlechange.bind(this)} placeholder="请添加标题~" value={this.state.title}/>
					<div style={{width:'100%',height:'auto',background:'#EDEDED'}} id="header"></div>
					<div styleName="content" id="content"></div>
				</div>
				<Button type="primary" styleName="update" onClick={this.AddNote.bind(this)} icon="upload" >Add</Button>
			</div>
			
		);
	};
}