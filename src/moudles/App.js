import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import { Layout, Menu, Breadcrumb, Icon,message} from 'antd';
const { Header,Content,Footer,Sider } = Layout;
const SubMenu = Menu.SubMenu;
import CSSModules from 'react-css-modules';
import classNames from 'classnames';
import styles from './index.scss';
import DatePicker from 'antd/lib/date-picker';
import '../index.less';
import customStyles from '../custom.css';
@CSSModules(styles)
export default class App extends React.Component {
	static contextTypes = {
	    router: React.PropTypes.object
	};
	constructor(props,context){
		super(props,context);
		this.state={
			collapsed:false
		};
	};
	componentWillMount() {
		if(!localStorage.userName){
			message.warning('请先登录！！！！');
			this.context.router.push(`/`);
		}
	}
	onSelect(item) {
	    let str=item.key;
	    if(str[0]==='.'){
	      str=str.substring(2, str.length);
	    }
	    this.context.router.push(`/${str}`);
   };
	onCollapse () {
	    this.setState({
	      collapsed: !this.state.collapsed,
	    });
    } ;
    goback(){
    	this.context.router.goBack();
    }
    loginout(){
    	axios('http://localhost:3000/loginout')
    		.then(res=>{
    			if(res.data.code=='success'){
    				message.success('注销成功！！！');
    				localStorage.removeItem('userName');
    				localStorage.removeItem('quanxian');
    				this.context.router.push(`/`);
    			}
    		})
    		.catch((err)=>{
    			console.log(err);
    		});
    }
    render() {
    	const isActive = this.context.router.isActive;
    	console.log(localStorage.quanxian);
	    let myDate = new Date();
	    let month=myDate.getMonth()+1;
	    let day=myDate.getDate();
	    if(month>=0 && month<=9){month='0'+month}
	    if(day>=0 && day<=9){day='0'+day}
	    let date = myDate.getFullYear()+'-'+month+'-'+day;
		let init=()=>{
			
		    
			if(localStorage.quanxian==0 || localStorage.quanxian==1){
				let curSelect = classNames({
			      home: isActive('/home'),
			      image:isActive('/image'),
			      collection:isActive('/collection'),
			      memorial:isActive('/memorial'),
			      list:isActive('/list')||(!!this.props.params.noteid),
			      addnote:isActive('/addnote')
			    });
			    curSelect='.$'+curSelect;
				return(
					<Menu theme="light" 
		        	  mode="inline"
		          	defaultSelectedKeys={[curSelect]} 
		              onClick={this.onSelect.bind(this)} 
		              selectedKeys={[curSelect]}>
						<Menu.Item key="home">
			              <Icon type="home" />
			              <span>&nbsp;home</span>
			            </Menu.Item>
			            <Menu.Item key="collection">
			              <Icon type="star-o" />
			              <span>&nbsp;collection</span>
			            </Menu.Item>
			            <Menu.Item key="image">
			              <Icon type="desktop" />
			              <span>&nbsp;image</span>
			            </Menu.Item>
			            <Menu.Item key="memorial">
			              <Icon type="key" />
			              <span>&nbsp;memorial</span>
			            </Menu.Item>
			            <Menu.Item key="list">
			              <Icon type="key" />
			              <span>&nbsp;study</span>
			            </Menu.Item>
			            <Menu.Item key="addnote">
			              <Icon type="key" />
			              <span>&nbsp;addnote</span>
			            </Menu.Item>
		            </Menu>

				);
			}else if(localStorage.quanxian==2){
				let curSelect = classNames({
			      list:isActive('/list')||(!!this.props.params.noteid),
			      addnote:isActive('/addnote')
			    });
		   		 curSelect='.$'+curSelect;
				return(
					<Menu theme="light" 
		        	  mode="inline"
		          	defaultSelectedKeys={[curSelect]} 
		              onClick={this.onSelect.bind(this)} 
		              selectedKeys={[curSelect]}>
			            <Menu.Item key="list">
			              <Icon type="key" />
			              <span>&nbsp;List</span>
			            </Menu.Item>
			            <Menu.Item key="addnote">
			              <Icon type="key" />
			              <span>&nbsp;addnote</span>
			            </Menu.Item>
					</Menu>
				);
			}
		}
        return (
			<Layout style={{ minHeight: '100vh' }}>
		        <Sider
		          collapsible
		          collapsed={this.state.collapsed}
		          onCollapse={this.onCollapse.bind(this)}
		         >
		          <Link to="/"><div styleName="logo">{this.state.collapsed ? "L & J" : "LJ & JWF" }</div></Link>
		          
		            {init()}
		     
		        </Sider>
		        <Layout style={{background:'#EDEDED',}}>
		          <Header style={{borderRadius:5, overflow:'hidden',margin: '0px 16px',marginBottom:10,height:50,color:'#000',background: '#fff', padding:'0 10px' }}>
	            	<p>
	            		<Icon onClick={this.goback.bind(this)} styleName="headericon" className="theme3" type="menu-fold" /><span styleName="time">{date}</span>
	            	    <div style={{float:'right'}}>
	            	    	<Icon onClick={this.loginout.bind(this)} styleName="headericon" className="theme1" type="bars" />
	            	    	<Icon styleName="headericon" className="theme2" type="home" />
	            	    	<Icon styleName="headericon" className="theme4" type="cloud-o" />
	            	    	<Icon styleName="headericon" className="theme5" type="star-o" />
	            	    </div>	
            		</p>
			      </Header>
		          <Content style={{borderRadius:5,margin: '0px 16px', padding: 10, background: '#fff',overflow: 'initial' }}>
		            {this.props.children}
		          </Content>
		          <Footer style={{fontFamily:"Gabriola",borderRadius:5,fontWeight:700,fontSize:20, overflow:'hidden',paddingBottom:5,paddingTop:5,color:'#00',background: '#fff',textAlign: 'center',margin: '0px 16px',marginTop:10}}>
		          	<Icon className="theme6" type="heart-o" />&nbsp;I love you forever
		          </Footer>
		        </Layout>
	        </Layout>
        );
    }
}