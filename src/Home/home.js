import React from 'react';
import $ from 'jquery';
import { Icon,Row,Col,Timeline,Button,Input,Modal,notification} from 'antd';
import {
  Link
} from 'react-router';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
@CSSModules(styles)
export default class HOME extends React.Component {
	static contextTypes = {
	    router: React.PropTypes.object
	};
	constructor(props,context){
		super(props,context);
		this.state={
			div:1,
			visible1:false,
			password:'',
			text:''
		};
	};
	componentDidMount(){
		$('#btn'+this.state.div).css("background","#999");
	};
	componentWillUnmount(){	
	};
	componentDidUpdate(){
	}
	handleWheel(e){
		let y=e.deltaY;  
		let div=this.state.div;  
        if(y>0 && this.state.div<3){//下滚 
        	if(this.state.div<3){
        		div=this.state.div+1;   
				$('#'+this.state.div).slideToggle("slow");
				$('#btn'+this.state.div).css("background","#fff");
				$('#btn'+div).css("background","#999");
				$("#"+div).slideToggle("slow");
        	}     
        }else if(y<0 && this.state.div>1){//上滚    
           if(this.state.div>1){
        		div=this.state.div-1;   
				$('#'+div).slideToggle("slow");
				$('#btn'+this.state.div).css("background","#fff");
				$('#btn'+div).css("background","#999");
				$("#"+this.state.div).slideToggle("slow");
        	}    
        }          
		this.setState({
			div:div
		});  
	}
	Bottom(){
		let div=this.state.div; 
		if(this.state.div<3){
			div=this.state.div+1;   
			$('#'+this.state.div).slideToggle("slow");
			$("#"+div).slideToggle("slow");
			this.setState({
				div:div
			});
		}	
	}
	Yes(){
		this.setState({
			visible1:true
		});
	}
	error() {
	  Modal.error({
	    title: '自己看着办........',
	    content: '搓衣板已准备好........',
	  });
	}
	openNotification1(type) {
	  notification[type]({
	    message: '你居然猜不到密码！！！！！',
	    description: '桑心，本宝宝生气咯！！！！！！',
	    duration:null,
	  });
	};
	openNotification2(type) {
	  notification[type]({
	    message: '你居然不输入密码！！！！！',
	    description: '桑心，本宝宝生气咯！！！！！！',
	    duration:null,
	  });
	};
	openNotification3(type) {
	  notification[type]({
	    message: '密码猜对啦！！！！！',
	    description: '我的大阔爱就是棒棒！！！！！！',
	    duration:null,
	  });
	};
	handleOk1(){
		if(this.state.password=="0425"){
			this.openNotification3('success');
			this.context.router.push(`/home`);
			this.setState({
				visible1:false
			});
		}else if(this.state.password==''){
			this.setState({
				visible1:false
			});
			this.openNotification2('warning');
		}else{
			this.setState({
				visible1:false
			});
			this.openNotification1('warning');
		}
	}
	handleCancel1(){
		if(this.state.password==''){
			this.openNotification2('warning');
		}
		this.setState({
			visible1:false
		});
	}
	passwordchange(e){
		this.setState({
			password:e.target.value
		});
	}
	render(){
		let myDate = new Date();
	    let month=myDate.getMonth()+1;
	    let day=myDate.getDate();
	    if(month>=0 && month<=9){month='0'+month}
	    if(day>=0 && day<=9){day='0'+day}
	    let date = myDate.getFullYear()+'-'+month+'-'+day;
		let One=()=>{
			return(
				<div styleName="one-all">
					<img src={require('../lib/6.jpg')} alt='icon'></img>
					<span styleName="title"><Icon type="heart-o" />&nbsp;&nbsp;I just do not understand love you just met!</span>
					<span styleName="time">{date}</span>
					<p styleName="bigtitle">big  cute · small cute</p>
					<div styleName="icon">
						<div styleName="home"><Link to="/home"><Icon type="home" /></Link></div>
						<div styleName="star"><Link to="/collection"><Icon type="star" /></Link></div>
						<div styleName="imagebar"><Link to="/image"><Icon type="camera" /></Link></div>
					</div>
				</div>
			);
		};
		let Two=()=>{
			return(
				<div styleName="two-all">
					<img src={require('../lib/15.jpg')} alt='icon'></img>
					<div styleName="img1"><img src={require('../lib/2.jpg')} alt='icon'></img></div>
					<div styleName="img2"><img src={require('../lib/3.jpg')} alt='icon'></img></div>
					<div styleName="circle"><img src={require('../lib/22.jpg')} alt='icon'></img></div>
					<div styleName="time">
						<Timeline pending={<span>I love you forever!</span>}>
						    <Timeline.Item>2017-4-15 Meet for the first time</Timeline.Item>
						    <Timeline.Item>2017-4-25 We are together</Timeline.Item>
						    <Timeline.Item>2017-4-27 We travel for the first time</Timeline.Item>
						    <Timeline.Item>2017-8-2 We are together for a hundred days</Timeline.Item>
						 </Timeline>
					</div>
					<div styleName="center"><img src={require('../lib/44.jpg')} alt='icon'></img></div>
					<span styleName="time_">{date}</span>
					<span styleName="bigtitle">Timeline</span>
				</div>
			);
		};
		let Three=()=>{
			return(
				<div styleName="three-all">
					<img src={require('../lib/18.jpg')} alt='icon'></img>
					<div styleName="tip">
						<p styleName="title">Want to see more of it?</p>
						<p id="queding" styleName="btn"><Button onClick={this.Yes.bind(this)}>YES</Button><Button onClick={this.error.bind(this)}>NO</Button></p>
					</div>
					<span styleName="time">{date}</span>
				</div>
			);
		};

		return(
			<div id="all" onWheel={this.handleWheel.bind(this)} styleName="all" style={{width:'100%',height:'100%'}}>
			    <div id="1" styleName="one">{One()}</div>
			    <div id="2" styleName="two">{Two()}</div>
			    <div id="3" styleName="three">{Three()}</div>
			    <div styleName="btns">
			        <div id="btn1" styleName="btn"></div>
			    	<div id="btn2" styleName="btn"></div>
			    	<div id="btn3" styleName="btn"></div>
			    </div>	
			    <div styleName="bottom" onClick={this.Bottom.bind(this)}>
			    	<Icon type="double-right" />
			    </div>
			    <Modal
		          title="输入密码哟！"
		          visible={this.state.visible1}
		          onOk={this.handleOk1.bind(this)}
		          onCancel={this.handleCancel1.bind(this)}
		       	  >
		          <Input type="password" onChange={this.passwordchange.bind(this)} placeholder="密码自己猜！" />
		          <p styleName="text">{this.state.text}</p>
		        </Modal>
		    </div>
			
		);
	};
}