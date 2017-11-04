import React from 'react';
import $ from 'jquery';
import { Icon,Radio,Row,Col,Button,Input,Modal,message,Tabs} from 'antd';import {
  Link
} from 'react-router';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
import axios from 'axios';
@CSSModules(styles)
export default class HOME extends React.Component {
	static contextTypes = {
	    router: React.PropTypes.object
	};
	constructor(props,context){
		super(props,context);
		this.state={
			visible1:false,
			password:'',
			username:'',
			visible2:false,
			zhuceuser:'',
			zhucepasword:'',
			quanxian:''
		};
	};
	componentDidMount(){

	}
	handleOk1(){
		const obj={
			username:this.state.username,
			password:this.state.password
		};
		axios.post('http://localhost:3000/login',obj)
			.then(res=>{
				console.log(res);
				if(res.data.code=='success'){
					localStorage.userName=res.data.username;
					localStorage.quanxian=res.data.quanxian;
					if(res.data.quanxian==0){
						this.context.router.push(`/lovehome`);
					}else if(res.data.quanxian==1){
						this.context.router.push(`/home`);
					}else if(res.data.quanxian==2){
						this.context.router.push(`/list`);
						message.warning('您的权限只能访问Blog！！');
					}
					
					this.setState({
						visible1:false
					});
				}else if(res.data.code=='nousername'){
					message.warning('用户名不能为空！！！');
				}else if(res.data.code=='nopassword'){
					message.warning('密码不能为空！！！');
				}else if(res.data.code=='allno'){
					message.warning('请输入用户名和密码！！！');
				}else if(res.data.code=='mistack'){
					message.error('用户名或密码错误！！！');
					console.log('用户名或密码错误！！！');
				}
			})
			.catch((err)=>{console.log(err);});
	}
	handleCancel1(){
		this.setState({
			visible1:false
		});
	}
	passwordchange(e){
		this.setState({
			password:e.target.value
		});
	}
	usernamechange(e){
		this.setState({
			username:e.target.value
		});
	};
	zhuceuser(e){
		this.setState({
			zhuceuser:e.target.value
		});
	}
	zhucepasword(e){
		this.setState({
			zhucepasword:e.target.value
		});
	}
	quanxianchange(e){
		this.setState({
			quanxian:e.target.value
		});
	}
	Yes(){
		if(localStorage.quanxian){
			console.log(localStorage.quanxian);
			if(localStorage.quanxian==0){
				this.context.router.push(`/lovehome`);
			}else if(localStorage.quanxian==1){
				this.context.router.push(`/home`);
			}else if(localStorage.quanxian==2){
				this.context.router.push(`/list`);
				message.warning('您的权限只能访问Blog！！');
			}
		}else{
			this.setState({
				visible1:true
			});
		}
		
	}
	zhuce(){
		if(this.state.zhuceuser==''){
			message.warning('请填写用户名！！！');
		}else if(this.state.zhucepasword==''){
			message.warning('请填写密码！！！');
		}else if(this.state.quanxian==''){
			message.warning('请选择用户权限！！！');
		}else{
			if(parseInt(this.state.quanxian)<2){
				message.warning('想注册该权限用户请联系管理员！！！');
			}else{
				var obj={
					username:this.state.zhuceuser,
					password:this.state.zhucepasword,
					quanxian:this.state.quanxian
				}
				console.log(obj);
				axios.post('http://localhost:3000/zhuce',obj)
				.then(res=>{
					if(res.data.code=='success'){
						message.success('注册成功啦，去登录吧！！！');
					}else if(res.data.code=='cunzai'){
						message.error('账号已经存在！！！！');
					}else{
						message.error('注册失败，请稍后重试~~~');
					}
				})
				.catch((err)=>{
					message.error('捕捉到错误啦！！！！！');
					console.log(err);
				});
			}
			
		}
		
	}
	render(){
		return(
			<div styleName="login">
				<img src={require('../lib/home7.jpg')} alt='login_background'/>
				<div styleName="center">
					<div styleName="header">
						<p styleName="header_title">蒋味芳的个人网站</p>
						<p styleName="header_english">Ray's Personal Website</p>
					</div>
					<div styleName="contents">
						<div styleName="content" onClick={this.Yes.bind(this)}>
							<Row>
								<Col span={2}><Icon type="double-right" /></Col>
								<Col span={20}>网站首页(Home)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[仅自己观看]</Col>
							</Row>
						</div>
						<div styleName="content" onClick={this.Yes.bind(this)}>
							<Row>
								<Col span={2}><Icon type="double-right" /></Col>
								<Col span={20}>主体内容(Content)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[需要特殊账号]</Col>
							</Row>
						</div>
						<div styleName="content" onClick={this.Yes.bind(this)}>
							<Row>
								<Col span={2}><Icon type="double-right" /></Col>
								<Col span={20}><p>学习笔记(Blog)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[账号：ceshi2，密码：ceshi2]</p></Col>
							</Row>
						</div>
					</div>
					<div styleName="footer">
						<p>jwf.acuptea.com</p>
					</div>
				</div>
				 <Modal
		          title="登录哟~~~"
		          visible={this.state.visible1}
		          onCancel={this.handleCancel1.bind(this)}
		          footer={null}
		       	  >
		       	  <Tabs type="card">
				    <TabPane tab="登录" key="1">
		         		 <Row>
				    		<Col span={4}>username:</Col>
				    		<Col span={18}><Input style={{marginBottom:10}} onChange={this.usernamechange.bind(this)} placeholder="username" /></Col>
				    	</Row>
				    	<Row>
				    		<Col span={4}>password:</Col>
				    		<Col span={18}><Input style={{marginBottom:15}} type="password" onChange={this.passwordchange.bind(this)} placeholder="you guess！" /></Col>
				    	</Row>
		         		 <Row><Col span={4} offset={18}><Button type="primary" onClick={this.handleOk1.bind(this)}>确定</Button></Col></Row>
				    </TabPane>
				    <TabPane tab="注册" key="2">
				    	<Row>
				    		<Col span={4}>username:</Col>
				    		<Col span={18}><Input style={{marginBottom:10}} onChange={this.zhuceuser.bind(this)} placeholder="username" /></Col>
				    	</Row>
				    	<Row>
				    		<Col span={4}>password:</Col>
				    		<Col span={18}><Input type="password" style={{marginBottom:10}} onChange={this.zhucepasword.bind(this)} placeholder="password" /></Col>
				    	</Row>
				    	<Row>
				    		<Col span={4}>quanxian:</Col>
				    		<Col span={18}> 
				    			<RadioGroup onChange={this.quanxianchange.bind(this)} value={this.state.quanxian}>
							        <Radio value={2}>博客</Radio>
							        <Radio value={1}>首页</Radio>
							    </RadioGroup>
						    </Col>
				    	</Row>
				    	<Row><Col span={4} offset={18}><Button type="primary" onClick={this.zhuce.bind(this)}>确定</Button></Col></Row>
				    </TabPane>
				  </Tabs>
		       	 
		        </Modal>
			</div>
		);
	}
};