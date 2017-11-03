import React from 'react';
import { Table,Button,Input,message} from 'antd';
import $ from 'jquery';
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
			id:this.props.params.noteid,
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
		axios.get('http://localhost:3000/note')
			.then(res=>{
				if(!localStorage.userName){
					this.loginguoqi();
					return;
				}
				let data=res.data.data.list;
				if(!!data.length && data.length>0){
					data.map((item,index)=>{
						if(item.id==this.state.id){
							this.setState({
								title:item.title,
								content:item.content,
								time:item.time
							});
							this.editor.txt.html(`<pre>${item.content}</pre>`);
						}
					});
				}
				console.log(res.data);
			})
			.catch((err)=>{
				console.log(err);
			});
	}
	titlechange(e){
		this.setState({
			title:e.target.value
		});
	}
	Update(){
		const obj={
			title:this.state.title,
			content:this.editor.txt.text(),
			id:this.state.id
		};
		axios.put('http://localhost:3000/update',obj)
			.then(res=>{
				console.log(obj);
				message.success('笔记更新完毕，棒棒哒！！！');
			})
			.catch((err)=>{
				console.log(err)
			});
	}
	render(){
		return(
			<div>
				<div styleName="note">
					<Input styleName="title" onChange={this.titlechange.bind(this)} value={this.state.title}/>
					<div style={{width:'100%',height:'auto',background:'#EDEDED'}} id="header"></div>
					<div styleName="content" id="content"></div>
				</div>
				<Button type="primary" styleName="update" onClick={this.Update.bind(this)} icon="upload" >Update</Button>
			</div>
			
		);
	};
}